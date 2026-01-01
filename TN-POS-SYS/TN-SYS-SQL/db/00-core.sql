-- 1. Tạo schema core cho các objects hệ thống
CREATE SCHEMA IF NOT EXISTS core;

-- 2. Cài đặt các extension cần thiết (Chỉ cần chạy 1 lần)
-- Lưu ý: Extensions phải ở schema public, không thể di chuyển vào schema khác
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS pgcrypto;  -- Cho gen_random_bytes() và encode()

-- 3. Hàm qfn_get_initials: Lấy các chữ cái đầu và dãy phụ âm
-- Phục vụ cho cột q_search_shorthand (Shorthand Search)
CREATE OR REPLACE FUNCTION core.qfn_get_initials(input_text text) 
RETURNS text AS $$
DECLARE
    unaccented text := lower(unaccent(input_text));
    initials text := '';
    consonants text := '';
    word text;
BEGIN
    -- Lấy các ký tự đầu (Ví dụ: chp)
    FOR word IN SELECT regexp_split_to_table(unaccented, '\s+') LOOP
        IF word <> '' THEN
            initials := initials || left(word, 1);
        END IF;
    END LOOP;
    
    -- Lấy toàn bộ phụ âm (Ví dụ: chuong hong phuong -> chnghngphng)
    consonants := regexp_replace(unaccented, '[aeiouy\s+]', '', 'g');
    
    RETURN initials || ' ' || consonants;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 4. Hàm hỗ trợ gộp nội dung để tạo cột phát sinh (Generated Column)
CREATE OR REPLACE FUNCTION core.qfn_concat_search(VARIADIC fields text[]) 
RETURNS text AS $$
BEGIN
    RETURN array_to_string(fields, ' ');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 5. Bảng lưu trữ log tập trung (Partitioned Table)
-- Xoá bảng cũ nếu có để chuyển sang cấu trúc Partitioned
DROP TABLE IF EXISTS core.qtb_audit_log CASCADE;

CREATE TABLE core.qtb_audit_log (
    q_id bigint NOT NULL,
    q_table_name varchar(128) NOT NULL,
    q_record_id varchar(128) NOT NULL,
    q_action varchar(16) NOT NULL,
    q_old_data jsonb,
    q_new_data jsonb,
    q_changed_data jsonb,
    q_changed_by varchar(128),
    q_changed_at bigint NOT NULL DEFAULT (extract(epoch from clock_timestamp()) * 1000),
    CONSTRAINT pk_qtb_audit_log PRIMARY KEY (q_id, q_changed_at)
) PARTITION BY RANGE (q_changed_at);

-- Tạo sequence riêng cho ID vì bảng partitioned không dùng bigserial trực tiếp được
CREATE SEQUENCE IF NOT EXISTS core.qtb_audit_log_id_seq;
ALTER TABLE core.qtb_audit_log ALTER COLUMN q_id SET DEFAULT nextval('core.qtb_audit_log_id_seq');

-- Tạo phân vùng mặc định (Safety Net) để tránh lỗi khi chưa kịp tạo partition tháng mới
CREATE TABLE IF NOT EXISTS core.qtb_audit_log_default PARTITION OF core.qtb_audit_log DEFAULT;

-- Bảng quản lý Checkpoint cho các Background Task tiêu thụ Audit Log
CREATE TABLE IF NOT EXISTS core.qtb_audit_checkpoint (
    q_task_name varchar(64) PRIMARY KEY, -- Ví dụ: 'SYNC_HISTORY', 'CALC_REPORTS'
    q_last_processed_id bigint NOT NULL DEFAULT 0,
    q_last_processed_at bigint NOT NULL DEFAULT 0,
    q_updated_at bigint DEFAULT (extract(epoch from now()) * 1000)
);

-- Hàm cập nhật Checkpoint sau khi task hoàn thành
CREATE OR REPLACE FUNCTION core.qfn_audit_update_checkpoint(p_task_name varchar, p_last_id bigint, p_last_at bigint) 
RETURNS void AS $$
BEGIN
    INSERT INTO core.qtb_audit_checkpoint (q_task_name, q_last_processed_id, q_last_processed_at, q_updated_at)
    VALUES (p_task_name, p_last_id, p_last_at, (extract(epoch from now()) * 1000))
    ON CONFLICT (q_task_name) DO UPDATE 
    SET q_last_processed_id = EXCLUDED.q_last_processed_id,
        q_last_processed_at = EXCLUDED.q_last_processed_at,
        q_updated_at = EXCLUDED.q_updated_at;
END;
$$ LANGUAGE plpgsql;

-- 6. Hàm tự động tạo phân vùng mới
CREATE OR REPLACE FUNCTION core.qfn_audit_create_partition(target_date date DEFAULT (now() + interval '1 month')) 
RETURNS text AS $$
DECLARE
    start_date date := date_trunc('month', target_date);
    end_date date := start_date + interval '1 month';
    start_ms bigint := (extract(epoch from start_date) * 1000)::bigint;
    end_ms bigint := (extract(epoch from end_date) * 1000)::bigint;
    partition_name text := 'qtb_audit_log_y' || to_char(start_date, 'YYYY') || 'm' || to_char(start_date, 'MM');
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON c.relnamespace = n.oid WHERE c.relname = partition_name AND n.nspname = 'core') THEN
        EXECUTE format('CREATE TABLE core.%I PARTITION OF core.qtb_audit_log FOR VALUES FROM (%L) TO (%L)', 
                       partition_name, start_ms, end_ms);
        RETURN 'Created partition: ' || partition_name;
    END IF;
    RETURN 'Partition already exists: ' || partition_name;
END;
$$ LANGUAGE plpgsql;

-- 7. Hàm hỗ trợ so sánh JSONB để lấy các trường thay đổi
CREATE OR REPLACE FUNCTION core.qfn_jsonb_diff(old_json jsonb, new_json jsonb) 
RETURNS jsonb AS $$
DECLARE
    result jsonb := '{}'::jsonb;
    v_key text;
    v_value jsonb;
BEGIN
    FOR v_key, v_value IN SELECT * FROM jsonb_each(new_json) LOOP
        IF NOT (old_json ? v_key) OR (old_json->v_key IS DISTINCT FROM v_value) THEN
            result := result || jsonb_build_object(v_key, v_value);
        END IF;
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 8.1. Hàm helper: Lấy record_id từ row (tự động detect primary key)
CREATE OR REPLACE FUNCTION core.qfn_get_record_id(p_row jsonb, p_table_oid oid) 
RETURNS text AS $$
DECLARE
    v_record_id text;
    v_pk_attname text;
BEGIN
    -- Ưu tiên 1: Thử lấy q_id (nếu có)
    IF (p_row ? 'q_id') THEN
        RETURN (p_row->>'q_id');
    END IF;
    
    -- Ưu tiên 2: Lấy primary key đầu tiên
    SELECT a.attname INTO v_pk_attname
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = p_table_oid AND i.indisprimary
    ORDER BY a.attnum
    LIMIT 1;
    
    IF v_pk_attname IS NOT NULL AND (p_row ? v_pk_attname) THEN
        RETURN (p_row->>v_pk_attname);
    END IF;
    
    -- Fallback: Dùng hash của toàn bộ row
    RETURN md5(p_row::text);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 8. Hàm Trigger dùng chung cho mọi bảng
CREATE OR REPLACE FUNCTION core.qfn_audit_trigger() 
RETURNS TRIGGER AS $$
DECLARE
    v_user_id text;
    v_diff jsonb;
    v_record_id text;
    v_row_json jsonb;
BEGIN
    -- Lấy user_id từ session (Backend nên chạy: SET app.user_id = '...')
    BEGIN
        v_user_id := current_setting('app.user_id', true);
    EXCEPTION WHEN OTHERS THEN
        v_user_id := NULL;
    END;

    IF (TG_OP = 'DELETE') THEN
        v_row_json := row_to_json(OLD)::jsonb;
        v_record_id := core.qfn_get_record_id(v_row_json, TG_RELID);
        
        INSERT INTO core.qtb_audit_log(q_table_name, q_record_id, q_action, q_old_data, q_changed_by)
        VALUES (TG_TABLE_NAME, v_record_id, 'DEL', v_row_json, v_user_id);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        v_row_json := row_to_json(NEW)::jsonb;
        v_record_id := core.qfn_get_record_id(v_row_json, TG_RELID);
        
        -- Chỉ lấy các field có sự thay đổi
        v_diff := core.qfn_jsonb_diff(row_to_json(OLD)::jsonb, v_row_json);
        
        -- Chỉ insert nếu thực sự có sự thay đổi dữ liệu (tránh log rác)
        IF (v_diff <> '{}'::jsonb) THEN
            INSERT INTO core.qtb_audit_log(q_table_name, q_record_id, q_action, q_old_data, q_new_data, q_changed_data, q_changed_by)
            VALUES (TG_TABLE_NAME, v_record_id, 'UPD', row_to_json(OLD)::jsonb, v_row_json, v_diff, v_user_id);
        END IF;
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        v_row_json := row_to_json(NEW)::jsonb;
        v_record_id := core.qfn_get_record_id(v_row_json, TG_RELID);
        
        INSERT INTO core.qtb_audit_log(q_table_name, q_record_id, q_action, q_new_data, q_changed_by)
        VALUES (TG_TABLE_NAME, v_record_id, 'INS', v_row_json, v_user_id);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 9. Housekeeping: Dọn dẹp phân vùng cũ (Thông minh - Checkpoint-aware)
CREATE OR REPLACE FUNCTION core.qfn_audit_cleanup(retention_months int DEFAULT 6) 
RETURNS text AS $$
DECLARE
    row record;
    threshold_at bigint;
    min_checkpoint_at bigint;
    final_threshold_at bigint;
    deleted_tables text := '';
BEGIN
    -- 1. Tính toán ngưỡng thời gian dựa trên retention_months
    threshold_at := (extract(epoch from (now() - (retention_months || ' months')::interval)) * 1000)::bigint;

    -- 2. Tìm điểm thấp nhất mà tất cả các task đã xử lý xong
    -- Nếu chưa có task nào đăng ký, ta coi như chưa xử lý gì để an toàn
    SELECT MIN(q_last_processed_at) INTO min_checkpoint_at FROM core.qtb_audit_checkpoint;
    
    -- 3. Ngưỡng xoá cuối cùng là giá trị NHỎ NHẤT giữa (Thời gian Retention) và (Checkpoint thấp nhất)
    -- Điều này đảm bảo: Chỉ xoá khi ĐÃ ĐỦ THỜI GIAN và TẤT CẢ TASK ĐÃ CHẠY XONG.
    final_threshold_at := LEAST(threshold_at, COALESCE(min_checkpoint_at, 0));

    IF final_threshold_at = 0 THEN
        RETURN 'Cleanup skipped: No checkpoints registered or tasks have not started processing.';
    END IF;

    FOR row IN 
        SELECT nmsp_child.nspname AS child_schema, child.relname AS child_table,
               (regexp_replace(child.relname, '.*_y([0-9]{4})m([0-9]{2})', '\1-\2-01'))::date AS p_month
        FROM pg_inherits
        JOIN pg_class parent ON pg_inherits.inhparent = parent.oid
        JOIN pg_class child ON pg_inherits.inhrelid = child.oid
        JOIN pg_namespace nmsp_parent ON parent.relnamespace = nmsp_parent.oid
        JOIN pg_namespace nmsp_child ON child.relnamespace = nmsp_child.oid
        WHERE parent.relname = 'qtb_audit_log' AND nmsp_parent.nspname = 'core'
    LOOP
        -- Chuyển tháng của partition sang ms để so sánh
        -- Một partition chỉ được xoá khi NGÀY KẾT THÚC của nó nhỏ hơn final_threshold_at
        IF (extract(epoch from (row.p_month + interval '1 month')) * 1000)::bigint < final_threshold_at THEN
            EXECUTE format('DROP TABLE IF EXISTS %I.%I', row.child_schema, row.child_table);
            deleted_tables := deleted_tables || row.child_table || ' ';
        END IF;
    END LOOP;
    
    RETURN CASE WHEN deleted_tables = '' THEN 'No partitions safe to drop.' ELSE 'Dropped: ' || deleted_tables END;
END;
$$ LANGUAGE plpgsql;
