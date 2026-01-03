-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Module: org (Organization)
-- Description: Quản lý cơ cấu tổ chức và nhân sự chi nhánh.
-- ---------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS org;

-- ---------------------------------------------------------
-- 1. TABLES
-- ---------------------------------------------------------

-- Mapping: 🦋 M_Tb_Org_Cpy -> 🗄️ org.qtb_cpy
CREATE TABLE IF NOT EXISTS org.qtb_cpy (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_cpy_name VARCHAR(256) NOT NULL,
    c_tax_code VARCHAR(64),
    c_parent_id UUID REFERENCES org.qtb_cpy(q_id),
    
    -- Technical Columns (M_Db_Ett)
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_updated_note TEXT,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID,
    q_deleted_note TEXT
);

-- Mapping: 🦋 M_Tb_Org_Reg -> 🗄️ org.qtb_reg
CREATE TABLE IF NOT EXISTS org.qtb_reg (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_cpy_id UUID NOT NULL REFERENCES org.qtb_cpy(q_id),
    c_reg_name VARCHAR(128) NOT NULL,
    
    -- Technical Columns (M_Db_Ett)
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_updated_note TEXT,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID,
    q_deleted_note TEXT
);

-- Mapping: 🦋 M_Tb_Org_Brh -> 🗄️ org.qtb_brh
CREATE TABLE IF NOT EXISTS org.qtb_brh (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_reg_id UUID NOT NULL REFERENCES org.qtb_reg(q_id),
    c_brh_name VARCHAR(128) NOT NULL,
    c_address TEXT,
    c_phone VARCHAR(32),
    
    -- Technical Columns (M_Db_Ett)
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_updated_note TEXT,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID,
    q_deleted_note TEXT
);

-- Mapping: 🦋 M_Tb_Org_Dep -> 🗄️ org.qtb_dep
CREATE TABLE IF NOT EXISTS org.qtb_dep (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_brh_id UUID NOT NULL REFERENCES org.qtb_brh(q_id),
    c_dep_name VARCHAR(128) NOT NULL,
    
    -- Technical Columns (M_Db_Ett)
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_updated_note TEXT,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID,
    q_deleted_note TEXT
);

-- Mapping: 🦋 M_Tb_Org_Usr_Brh -> 🗄️ org.qtb_usr_brh
CREATE TABLE IF NOT EXISTS org.qtb_usr_brh (
    c_usr_id UUID NOT NULL REFERENCES auth.qtb_usr(q_id),
    c_brh_id UUID NOT NULL REFERENCES org.qtb_brh(q_id),
    c_is_default BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY (c_usr_id, c_brh_id),
    
    -- Technical Columns (M_Db_Ett)
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_updated_note TEXT,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID,
    q_deleted_note TEXT
);

-- Đảm bảo mỗi user chỉ có tối đa 1 chi nhánh mặc định
CREATE UNIQUE INDEX IF NOT EXISTS idx_org_usr_brh_default ON org.qtb_usr_brh (c_usr_id) WHERE (c_is_default = TRUE AND q_is_deleted = FALSE);

-- ---------------------------------------------------------
-- 2. STORED PROCEDURES / FUNCTIONS
-- ---------------------------------------------------------

-- 💾 SP_Org_Cpy_Upsert
CREATE OR REPLACE FUNCTION org.qsp_cpy_upsert(
    p_id UUID,
    p_name VARCHAR,
    p_tax_code VARCHAR,
    p_parent_id UUID,
    p_via VARCHAR,
    p_by UUID
) RETURNS UUID AS $$
DECLARE
    v_ret_id UUID;
BEGIN
    IF p_id IS NULL THEN
        INSERT INTO org.qtb_cpy (c_cpy_name, c_tax_code, c_parent_id, q_created_via, q_created_by)
        VALUES (p_name, p_tax_code, p_parent_id, p_via, p_by)
        RETURNING q_id INTO v_ret_id;
    ELSE
        UPDATE org.qtb_cpy 
        SET c_cpy_name = p_name,
            c_tax_code = p_tax_code,
            c_parent_id = p_parent_id,
            q_updated_via = p_via,
            q_updated_by = p_by,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
        WHERE q_id = p_id
        RETURNING q_id INTO v_ret_id;
    END IF;
    RETURN v_ret_id;
END;
$$ LANGUAGE plpgsql;

-- 💾 SP_Org_Reg_Upsert
CREATE OR REPLACE FUNCTION org.qsp_reg_upsert(
    p_id UUID,
    p_cpy_id UUID,
    p_name VARCHAR,
    p_via VARCHAR,
    p_by UUID
) RETURNS UUID AS $$
DECLARE
    v_ret_id UUID;
BEGIN
    IF p_id IS NULL THEN
        INSERT INTO org.qtb_reg (c_cpy_id, c_reg_name, q_created_via, q_created_by)
        VALUES (p_cpy_id, p_name, p_via, p_by)
        RETURNING q_id INTO v_ret_id;
    ELSE
        UPDATE org.qtb_reg 
        SET c_cpy_id = p_cpy_id,
            c_reg_name = p_name,
            q_updated_via = p_via,
            q_updated_by = p_by,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
        WHERE q_id = p_id
        RETURNING q_id INTO v_ret_id;
    END IF;
    RETURN v_ret_id;
END;
$$ LANGUAGE plpgsql;

-- 💾 SP_Org_Brh_Upsert
CREATE OR REPLACE FUNCTION org.qsp_brh_upsert(
    p_id UUID,
    p_reg_id UUID,
    p_name VARCHAR,
    p_address TEXT,
    p_phone VARCHAR,
    p_via VARCHAR,
    p_by UUID
) RETURNS UUID AS $$
DECLARE
    v_ret_id UUID;
BEGIN
    IF p_id IS NULL THEN
        INSERT INTO org.qtb_brh (c_reg_id, c_brh_name, c_address, c_phone, q_created_via, q_created_by)
        VALUES (p_reg_id, p_name, p_address, p_phone, p_via, p_by)
        RETURNING q_id INTO v_ret_id;
    ELSE
        UPDATE org.qtb_brh 
        SET c_reg_id = p_reg_id,
            c_brh_name = p_name,
            c_address = p_address,
            c_phone = p_phone,
            q_updated_via = p_via,
            q_updated_by = p_by,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
        WHERE q_id = p_id
        RETURNING q_id INTO v_ret_id;
    END IF;
    RETURN v_ret_id;
END;
$$ LANGUAGE plpgsql;

-- 💾 SP_Org_Dep_Upsert
CREATE OR REPLACE FUNCTION org.qsp_dep_upsert(
    p_id UUID,
    p_brh_id UUID,
    p_name VARCHAR,
    p_via VARCHAR,
    p_by UUID
) RETURNS UUID AS $$
DECLARE
    v_ret_id UUID;
BEGIN
    IF p_id IS NULL THEN
        INSERT INTO org.qtb_dep (c_brh_id, c_dep_name, q_created_via, q_created_by)
        VALUES (p_brh_id, p_name, p_via, p_by)
        RETURNING q_id INTO v_ret_id;
    ELSE
        UPDATE org.qtb_dep 
        SET c_brh_id = p_brh_id,
            c_dep_name = p_name,
            q_updated_via = p_via,
            q_updated_by = p_by,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
        WHERE q_id = p_id
        RETURNING q_id INTO v_ret_id;
    END IF;
    RETURN v_ret_id;
END;
$$ LANGUAGE plpgsql;

-- 💾 SP_Org_Entity_Delete
CREATE OR REPLACE FUNCTION org.qsp_entity_delete(
    p_table VARCHAR,
    p_id UUID,
    p_via VARCHAR,
    p_by UUID
) RETURNS BOOLEAN AS $$
BEGIN
    EXECUTE format('UPDATE org.%I SET q_is_deleted = TRUE, q_deleted_via = %L, q_deleted_by = %L, q_deleted_at = %L WHERE q_id = %L', 
        p_table, p_via, p_by, (extract(epoch from now()) * 1000)::BIGINT, p_id);
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- 💾 SP_Org_Usr_Brh_Assign
CREATE OR REPLACE FUNCTION org.qsp_usr_brh_assign(
    p_usr_id UUID,
    p_brh_id UUID,
    p_is_default BOOLEAN,
    p_via VARCHAR,
    p_by UUID
) RETURNS BOOLEAN AS $$
BEGIN
    -- 1. Nếu set là mặc định, reset các chi nhánh khác của user này
    IF p_is_default = TRUE THEN
        UPDATE org.qtb_usr_brh 
        SET c_is_default = FALSE,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT,
            q_updated_via = p_via,
            q_updated_by = p_by
        WHERE c_usr_id = p_usr_id AND c_is_default = TRUE;
    END IF;

    -- 2. Upsert vào bảng liên kết
    INSERT INTO org.qtb_usr_brh (c_usr_id, c_brh_id, c_is_default, q_created_via, q_created_by)
    VALUES (p_usr_id, p_brh_id, p_is_default, p_via, p_by)
    ON CONFLICT (c_usr_id, c_brh_id) DO UPDATE 
    SET c_is_default = EXCLUDED.c_is_default,
        q_is_deleted = FALSE,
        q_updated_at = (extract(epoch from now()) * 1000)::BIGINT,
        q_updated_via = p_via,
        q_updated_by = p_by;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- 🏝️ Fn_Org_Usr_Get_Brhs
CREATE OR REPLACE FUNCTION org.qfn_usr_get_brhs(
    p_usr_id UUID
) RETURNS TABLE (
    brh_id UUID,
    brh_name VARCHAR,
    is_default BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT b.q_id, b.c_brh_name, ub.c_is_default
    FROM org.qtb_brh b
    JOIN org.qtb_usr_brh ub ON b.q_id = ub.c_brh_id
    WHERE ub.c_usr_id = p_usr_id 
      AND ub.q_is_deleted = FALSE
      AND b.q_is_deleted = FALSE;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 3. TRIGGERS (Audit Log)
-- ---------------------------------------------------------

DROP TRIGGER IF EXISTS trg_org_cpy_audit ON org.qtb_cpy;
CREATE TRIGGER trg_org_cpy_audit AFTER INSERT OR UPDATE OR DELETE ON org.qtb_cpy FOR EACH ROW EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_org_reg_audit ON org.qtb_reg;
CREATE TRIGGER trg_org_reg_audit AFTER INSERT OR UPDATE OR DELETE ON org.qtb_reg FOR EACH ROW EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_org_brh_audit ON org.qtb_brh;
CREATE TRIGGER trg_org_brh_audit AFTER INSERT OR UPDATE OR DELETE ON org.qtb_brh FOR EACH ROW EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_org_dep_audit ON org.qtb_dep;
CREATE TRIGGER trg_org_dep_audit AFTER INSERT OR UPDATE OR DELETE ON org.qtb_dep FOR EACH ROW EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_org_usr_brh_audit ON org.qtb_usr_brh;
CREATE TRIGGER trg_org_usr_brh_audit AFTER INSERT OR UPDATE OR DELETE ON org.qtb_usr_brh FOR EACH ROW EXECUTE FUNCTION core.qfn_audit_trigger();

