-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Generated from Q-SPEC (Module: auth)
-- ---------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS auth;

-- ---------------------------------------------------------
-- 1. TABLES
-- ---------------------------------------------------------

-- Mapping: 🦋 M_Tb_Role -> 🗄️ auth.qtb_role
CREATE TABLE IF NOT EXISTS auth.qtb_role (
    -- From M_Db_Guid_Itm
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_role_name VARCHAR(128) NOT NULL,
    c_role_code VARCHAR(64) UNIQUE NOT NULL,
    
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

-- Mapping: 🦋 M_Tb_Usr -> 🗄️ auth.qtb_usr
CREATE TABLE IF NOT EXISTS auth.qtb_usr (
    -- From M_Db_Guid_Itm
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_usr_name VARCHAR(64) UNIQUE NOT NULL,
    c_pwd_hash VARCHAR(256) NOT NULL,
    c_full_name VARCHAR(128) NOT NULL,
    c_email VARCHAR(128) UNIQUE,
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

-- Mapping: 🦋 M_Tb_Usr_Role 🕰️ -> 🗄️ auth.qtb_usr_role
CREATE TABLE IF NOT EXISTS auth.qtb_usr_role (
    c_usr_id UUID NOT NULL REFERENCES auth.qtb_usr(q_id),
    c_role_id UUID NOT NULL REFERENCES auth.qtb_role(q_id),
    PRIMARY KEY (c_usr_id, c_role_id),
    
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

-- History Table for M_Tb_Usr_Role
CREATE TABLE IF NOT EXISTS auth.qtb_usr_role_his (
    c_usr_id UUID,
    c_role_id UUID,
    q_status INT,
    q_version INT,
    q_is_deleted BOOLEAN,
    q_created_via VARCHAR(64),
    q_created_at BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT,
    q_updated_by UUID,
    q_updated_note TEXT,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID,
    q_deleted_note TEXT,
    PRIMARY KEY (c_usr_id, c_role_id, q_version)
);

-- Mapping: 🦋 M_Tb_Usr_Ses -> 🗄️ auth.qtb_usr_ses
CREATE TABLE IF NOT EXISTS auth.qtb_usr_ses (
    -- From M_Db_Guid_Itm
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_usr_id UUID NOT NULL REFERENCES auth.qtb_usr(q_id),
    c_ses_token VARCHAR(256) UNIQUE NOT NULL,
    c_expired_at BIGINT NOT NULL,
    c_login_ip VARCHAR(64),
    
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

-- Mapping: 🦋 M_Tb_Mod -> 🗄️ auth.qtb_mod
CREATE TABLE IF NOT EXISTS auth.qtb_mod (
    -- From M_Db_Guid_Itm
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_mod_name VARCHAR(128) NOT NULL,
    c_mod_code VARCHAR(64) UNIQUE NOT NULL,
    
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

-- Mapping: 🦋 M_Tb_Perm -> 🗄️ auth.qtb_perm
CREATE TABLE IF NOT EXISTS auth.qtb_perm (
    -- From M_Db_Guid_Itm
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_perm_name VARCHAR(128) NOT NULL,
    c_perm_code VARCHAR(64) UNIQUE NOT NULL,
    
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

-- Mapping: 🦋 M_Tb_Role_Perm 🕰️ -> 🗄️ auth.qtb_role_perm
CREATE TABLE IF NOT EXISTS auth.qtb_role_perm (
    c_role_id UUID NOT NULL REFERENCES auth.qtb_role(q_id),
    c_mod_id UUID NOT NULL REFERENCES auth.qtb_mod(q_id),
    c_perm_id UUID NOT NULL REFERENCES auth.qtb_perm(q_id),
    PRIMARY KEY (c_role_id, c_mod_id, c_perm_id),
    
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

-- History Table for M_Tb_Role_Perm
CREATE TABLE IF NOT EXISTS auth.qtb_role_perm_his (
    c_role_id UUID,
    c_mod_id UUID,
    c_perm_id UUID,
    q_status INT,
    q_version INT,
    q_is_deleted BOOLEAN,
    q_created_via VARCHAR(64),
    q_created_at BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT,
    q_updated_by UUID,
    q_updated_note TEXT,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID,
    q_deleted_note TEXT,
    PRIMARY KEY (c_role_id, c_mod_id, c_perm_id, q_version)
);

-- Mapping: 🦋 M_Tb_Usr_Otp -> 🗄️ auth.qtb_usr_otp
CREATE TABLE IF NOT EXISTS auth.qtb_usr_otp (
    -- From M_Db_Guid_Itm
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Business Columns
    c_usr_id UUID NOT NULL REFERENCES auth.qtb_usr(q_id),
    c_otp_code VARCHAR(10) NOT NULL,
    c_expired_at BIGINT NOT NULL,
    c_is_used BOOLEAN DEFAULT FALSE,
    
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

-- ---------------------------------------------------------
-- 2. VIEWS
-- ---------------------------------------------------------

-- Mapping: 🦋 M_Vw_Usr_Right -> 🪟 auth.qvw_usr_right
CREATE OR REPLACE VIEW auth.qvw_usr_right AS
SELECT 
    u.q_id AS c_usr_id,
    u.c_usr_name AS c_usr_name,
    m.c_mod_code AS c_mod_code,
    p.c_perm_code AS c_perm_code
FROM auth.qtb_usr u
JOIN auth.qtb_usr_role ur ON u.q_id = ur.c_usr_id
JOIN auth.qtb_role r ON ur.c_role_id = r.q_id
JOIN auth.qtb_role_perm rp ON r.q_id = rp.c_role_id
JOIN auth.qtb_mod m ON rp.c_mod_id = m.q_id
JOIN auth.qtb_perm p ON rp.c_perm_id = p.q_id
WHERE u.q_is_deleted = FALSE AND u.q_status = 1
  AND r.q_is_deleted = FALSE AND r.q_status = 1
  AND m.q_is_deleted = FALSE AND m.q_status = 1
  AND p.q_is_deleted = FALSE AND p.q_status = 1;

-- ---------------------------------------------------------
-- 3. STORED PROCEDURES
-- ---------------------------------------------------------

-- Mapping: 💾 SP_Usr_Login() -> auth.qsp_usr_login
CREATE OR REPLACE FUNCTION auth.qsp_usr_login(
    p_usr_name VARCHAR,
    p_pwd_hash VARCHAR,
    p_login_ip VARCHAR
) RETURNS SETOF auth.qtb_usr_ses AS $$
DECLARE
    v_usr_id UUID;
    v_ses_token VARCHAR(256);
    v_expired_at BIGINT;
BEGIN
    -- 1. Tìm người dùng
    SELECT q_id INTO v_usr_id FROM auth.qtb_usr 
    WHERE c_usr_name = p_usr_name AND c_pwd_hash = p_pwd_hash AND q_is_deleted = FALSE;

    IF v_usr_id IS NULL THEN
        RAISE EXCEPTION 'Mật khẩu không chính xác';
    END IF;

    -- 2. Khởi tạo session
    v_ses_token := encode(gen_random_bytes(32), 'hex');
    v_expired_at := (extract(epoch from now()) * 1000)::BIGINT + (24 * 60 * 60 * 1000);

    RETURN QUERY
    INSERT INTO auth.qtb_usr_ses (c_usr_id, c_ses_token, c_expired_at, c_login_ip, q_created_via)
    VALUES (v_usr_id, v_ses_token, v_expired_at, p_login_ip, 'SP_Usr_Login')
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Usr_Ses_Create() -> auth.qsp_usr_ses_create
CREATE OR REPLACE FUNCTION auth.qsp_usr_ses_create(
    p_usr_id UUID,
    p_login_ip VARCHAR
) RETURNS SETOF auth.qtb_usr_ses AS $$
DECLARE
    v_ses_token VARCHAR(256);
    v_expired_at BIGINT;
    v_created_at BIGINT;
    v_usr_exists BOOLEAN;
BEGIN
    -- 1. Kiểm tra user tồn tại và chưa bị xóa
    SELECT EXISTS(
        SELECT 1 FROM auth.qtb_usr 
        WHERE q_id = p_usr_id 
          AND q_is_deleted = FALSE
    ) INTO v_usr_exists;
    
    IF NOT v_usr_exists THEN
        RAISE EXCEPTION 'User not found or deleted';
    END IF;
    
    -- 2. Generate session token (64 hex characters = 32 bytes)
    v_ses_token := encode(gen_random_bytes(32), 'hex');
    
    -- 3. Calculate expired_at (24 hours from now)
    v_expired_at := (extract(epoch from now()) * 1000)::BIGINT + (24 * 60 * 60 * 1000);
    
    -- 4. Get current timestamp
    v_created_at := (extract(epoch from now()) * 1000)::BIGINT;
    
    -- 5. Insert session
    RETURN QUERY
    INSERT INTO auth.qtb_usr_ses (
        c_usr_id, 
        c_ses_token, 
        c_expired_at, 
        c_login_ip, 
        q_created_via, 
        q_created_at, 
        q_status, 
        q_is_deleted
    )
    VALUES (
        p_usr_id, 
        v_ses_token, 
        v_expired_at, 
        NULLIF(p_login_ip, ''),  -- NULL if empty string
        'API_Login', 
        v_created_at, 
        1,  -- Active
        FALSE
    )
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Usr_Ses_Verify() -> auth.qfn_usr_ses_verify
CREATE OR REPLACE FUNCTION auth.qfn_usr_ses_verify(
    p_ses_token VARCHAR
) RETURNS SETOF auth.qtb_usr_ses AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM auth.qtb_usr_ses
    WHERE c_ses_token = p_ses_token
      AND c_expired_at > (extract(epoch from now()) * 1000)::BIGINT
      AND q_is_deleted = FALSE
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Usr_Logout() -> auth.qsp_usr_logout
CREATE OR REPLACE FUNCTION auth.qsp_usr_logout(
    p_ses_token VARCHAR
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE auth.qtb_usr_ses 
    SET c_expired_at = (extract(epoch from now()) * 1000)::BIGINT,
        q_updated_via = 'SP_Usr_Logout',
        q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
    WHERE c_ses_token = p_ses_token;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Usr_Change_Pwd() -> auth.qsp_usr_change_pwd
CREATE OR REPLACE FUNCTION auth.qsp_usr_change_pwd(
    p_usr_id UUID,
    p_old_pwd_hash VARCHAR,
    p_new_pwd_hash VARCHAR
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE auth.qtb_usr 
    SET c_pwd_hash = p_new_pwd_hash,
        q_updated_via = 'SP_Usr_Change_Pwd',
        q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
    WHERE q_id = p_usr_id AND c_pwd_hash = p_old_pwd_hash;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Mật khẩu cũ không khớp';
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Usr_Upsert() -> auth.qsp_usr_upsert
CREATE OR REPLACE FUNCTION auth.qsp_usr_upsert(
    p_usr_id UUID,
    p_usr_name VARCHAR,
    p_pwd_hash VARCHAR,
    p_full_name VARCHAR,
    p_email VARCHAR,
    p_phone VARCHAR,
    p_via VARCHAR,
    p_by UUID
) RETURNS UUID AS $$
DECLARE
    v_ret_id UUID;
BEGIN
    IF p_usr_id IS NULL THEN
        INSERT INTO auth.qtb_usr (c_usr_name, c_pwd_hash, c_full_name, c_email, c_phone, q_created_via, q_created_by)
        VALUES (p_usr_name, p_pwd_hash, p_full_name, p_email, p_phone, p_via, p_by)
        RETURNING q_id INTO v_ret_id;
    ELSE
        UPDATE auth.qtb_usr 
        SET c_full_name = p_full_name,
            c_email = p_email,
            c_phone = p_phone,
            q_updated_via = p_via,
            q_updated_by = p_by,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
        WHERE q_id = p_usr_id
        RETURNING q_id INTO v_ret_id;
    END IF;
    RETURN v_ret_id;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Usr_Otp_Create() -> auth.qsp_usr_otp_create
CREATE OR REPLACE FUNCTION auth.qsp_usr_otp_create(
    p_usr_id UUID,
    p_otp_code VARCHAR
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE auth.qtb_usr_otp 
    SET c_is_used = TRUE,
        q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
    WHERE c_usr_id = p_usr_id;
    
    INSERT INTO auth.qtb_usr_otp (c_usr_id, c_otp_code, c_expired_at, q_created_via)
    VALUES (p_usr_id, p_otp_code, (extract(epoch from now()) * 1000)::BIGINT + (15 * 60 * 1000), 'SP_Usr_Otp_Create');
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 4. FUNCTIONS
-- ---------------------------------------------------------

-- Mapping: 🏝️ Fn_Usr_Otp_Verify() -> auth.qfn_usr_otp_verify
CREATE OR REPLACE FUNCTION auth.qfn_usr_otp_verify(
    p_usr_id UUID,
    p_otp_code VARCHAR
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.qtb_usr_otp 
        WHERE c_usr_id = p_usr_id 
          AND c_otp_code = p_otp_code 
          AND c_is_used = FALSE 
          AND c_expired_at > (extract(epoch from now()) * 1000)::BIGINT
          AND q_is_deleted = FALSE
    );
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Usr_Has_Perm() -> auth.qfn_usr_has_perm
CREATE OR REPLACE FUNCTION auth.qfn_usr_has_perm(
    p_usr_id UUID,
    p_perm_code VARCHAR
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.qvw_usr_right 
        WHERE c_usr_id = p_usr_id AND c_perm_code = p_perm_code
    );
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Auth_Usr_Get_List() -> auth.qfn_usr_get_list
CREATE OR REPLACE FUNCTION auth.qfn_usr_get_list()
RETURNS SETOF auth.qtb_usr AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM auth.qtb_usr
    WHERE q_is_deleted = FALSE
    ORDER BY c_full_name ASC;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Auth_Usr_Get_By_Name() -> auth.qfn_usr_get_by_name
CREATE OR REPLACE FUNCTION auth.qfn_usr_get_by_name(
    p_usr_name VARCHAR
) RETURNS SETOF auth.qtb_usr AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM auth.qtb_usr
    WHERE c_usr_name = p_usr_name
      AND q_is_deleted = FALSE
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Auth_Usr_Get_By_Email() -> auth.qfn_usr_get_by_email
CREATE OR REPLACE FUNCTION auth.qfn_usr_get_by_email(
    p_email VARCHAR
) RETURNS SETOF auth.qtb_usr AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM auth.qtb_usr
    WHERE c_email = p_email
      AND q_is_deleted = FALSE
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Auth_Usr_Get_By_Id() -> auth.qfn_usr_get_by_id
CREATE OR REPLACE FUNCTION auth.qfn_usr_get_by_id(
    p_usr_id UUID
) RETURNS SETOF auth.qtb_usr AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM auth.qtb_usr
    WHERE q_id = p_usr_id
      AND q_is_deleted = FALSE
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Auth_Usr_Delete() -> auth.qsp_usr_delete
CREATE OR REPLACE FUNCTION auth.qsp_usr_delete(
    p_usr_id UUID,
    p_via VARCHAR,
    p_by UUID
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE auth.qtb_usr
    SET q_is_deleted = TRUE,
        q_deleted_via = p_via,
        q_deleted_by = p_by,
        q_deleted_at = (extract(epoch from now()) * 1000)::BIGINT
    WHERE q_id = p_usr_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Auth_Role_Upsert() -> auth.qsp_role_upsert
CREATE OR REPLACE FUNCTION auth.qsp_role_upsert(
    p_role_id UUID,
    p_role_name VARCHAR,
    p_role_code VARCHAR,
    p_via VARCHAR,
    p_by UUID
) RETURNS UUID AS $$
DECLARE
    v_ret_id UUID;
BEGIN
    IF p_role_id IS NULL THEN
        INSERT INTO auth.qtb_role (c_role_name, c_role_code, q_created_via, q_created_by)
        VALUES (p_role_name, p_role_code, p_via, p_by)
        RETURNING q_id INTO v_ret_id;
    ELSE
        UPDATE auth.qtb_role
        SET c_role_name = p_role_name,
            c_role_code = p_role_code,
            q_updated_via = p_via,
            q_updated_by = p_by,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT
        WHERE q_id = p_role_id
        RETURNING q_id INTO v_ret_id;
    END IF;
    RETURN v_ret_id;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Auth_Role_Delete() -> auth.qsp_role_delete
CREATE OR REPLACE FUNCTION auth.qsp_role_delete(
    p_role_id UUID,
    p_via VARCHAR,
    p_by UUID
) RETURNS BOOLEAN AS $$
BEGIN
    -- 1. Xoá mềm role
    UPDATE auth.qtb_role
    SET q_is_deleted = TRUE,
        q_deleted_via = p_via,
        q_deleted_by = p_by,
        q_deleted_at = (extract(epoch from now()) * 1000)::BIGINT
    WHERE q_id = p_role_id;
    
    -- 2. Xoá tất cả liên kết trong qtb_role_perm
    UPDATE auth.qtb_role_perm
    SET q_is_deleted = TRUE,
        q_deleted_via = p_via,
        q_deleted_by = p_by,
        q_deleted_at = (extract(epoch from now()) * 1000)::BIGINT
    WHERE c_role_id = p_role_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 💾 SP_Auth_Role_Perm_Save() -> auth.qsp_role_perm_save
-- Note: Nhận JSON array với format: [{"mod_id": "...", "perm_id": "..."}, ...]
CREATE OR REPLACE FUNCTION auth.qsp_role_perm_save(
    p_role_id UUID,
    p_perms JSONB,  -- Array of {mod_id, perm_id}
    p_via VARCHAR,
    p_by UUID
) RETURNS BOOLEAN AS $$
DECLARE
    v_perm_record JSONB;
    v_mod_id UUID;
    v_perm_id UUID;
BEGIN
    -- 1. Xoá tất cả các quyền cũ của role
    UPDATE auth.qtb_role_perm
    SET q_is_deleted = TRUE,
        q_deleted_via = p_via,
        q_deleted_by = p_by,
        q_deleted_at = (extract(epoch from now()) * 1000)::BIGINT
    WHERE c_role_id = p_role_id;
    
    -- 2. Lặp qua danh sách perms và INSERT bản ghi mới
    FOR v_perm_record IN SELECT * FROM jsonb_array_elements(p_perms) LOOP
        v_mod_id := (v_perm_record->>'mod_id')::UUID;
        v_perm_id := (v_perm_record->>'perm_id')::UUID;
        
        INSERT INTO auth.qtb_role_perm (c_role_id, c_mod_id, c_perm_id, q_created_via, q_created_by)
        VALUES (p_role_id, v_mod_id, v_perm_id, p_via, p_by)
        ON CONFLICT (c_role_id, c_mod_id, c_perm_id) DO UPDATE
        SET q_is_deleted = FALSE,
            q_updated_via = p_via,
            q_updated_by = p_by,
            q_updated_at = (extract(epoch from now()) * 1000)::BIGINT;
    END LOOP;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Auth_Role_Get_List() -> auth.qfn_role_get_list
CREATE OR REPLACE FUNCTION auth.qfn_role_get_list()
RETURNS SETOF auth.qtb_role AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM auth.qtb_role
    WHERE q_is_deleted = FALSE
    ORDER BY c_role_name ASC;
END;
$$ LANGUAGE plpgsql;

-- Mapping: 🏝️ Fn_Auth_Perm_Get_List() -> auth.qfn_perm_get_list
-- Trả về danh sách Module kèm các Quyền hạn con
-- Note: Cần có bảng mapping giữa perm và mod, hoặc lấy từ qtb_role_perm
-- Tạm thời trả về tất cả mod và perm, cần join qua qtb_role_perm để lấy quan hệ
CREATE OR REPLACE FUNCTION auth.qfn_perm_get_list()
RETURNS TABLE (
    mod_id UUID,
    mod_name VARCHAR,
    mod_code VARCHAR,
    perm_id UUID,
    perm_name VARCHAR,
    perm_code VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        m.q_id AS mod_id,
        m.c_mod_name AS mod_name,
        m.c_mod_code AS mod_code,
        p.q_id AS perm_id,
        p.c_perm_name AS perm_name,
        p.c_perm_code AS perm_code
    FROM auth.qtb_mod m
    CROSS JOIN auth.qtb_perm p
    WHERE m.q_is_deleted = FALSE
      AND p.q_is_deleted = FALSE
      -- Có thể thêm điều kiện lọc nếu có bảng mapping
    ORDER BY m.c_mod_code, p.c_perm_code;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 5. TRIGGERS (Audit Log)
-- ---------------------------------------------------------

-- Enable audit triggers for all auth tables
DROP TRIGGER IF EXISTS trg_auth_role_audit ON auth.qtb_role;
CREATE TRIGGER trg_auth_role_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_role
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_auth_usr_audit ON auth.qtb_usr;
CREATE TRIGGER trg_auth_usr_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_usr
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_auth_usr_role_audit ON auth.qtb_usr_role;
CREATE TRIGGER trg_auth_usr_role_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_usr_role
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_auth_usr_ses_audit ON auth.qtb_usr_ses;
CREATE TRIGGER trg_auth_usr_ses_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_usr_ses
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_auth_mod_audit ON auth.qtb_mod;
CREATE TRIGGER trg_auth_mod_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_mod
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_auth_perm_audit ON auth.qtb_perm;
CREATE TRIGGER trg_auth_perm_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_perm
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_auth_role_perm_audit ON auth.qtb_role_perm;
CREATE TRIGGER trg_auth_role_perm_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_role_perm
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

DROP TRIGGER IF EXISTS trg_auth_usr_otp_audit ON auth.qtb_usr_otp;
CREATE TRIGGER trg_auth_usr_otp_audit
    AFTER INSERT OR UPDATE OR DELETE ON auth.qtb_usr_otp
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();
