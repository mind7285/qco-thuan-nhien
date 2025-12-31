-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Generated from Q-SPEC (Module: auth)
-- ---------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS auth;

-- ---------------------------------------------------------
-- 1. TABLES
-- ---------------------------------------------------------

-- Mapping: 🦋 M_Tb_Role -> 🗄️ auth.qtb_role
CREATE TABLE auth.qtb_role (
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
CREATE TABLE auth.qtb_usr (
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
CREATE TABLE auth.qtb_usr_role (
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
CREATE TABLE auth.qtb_usr_role_his (
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
CREATE TABLE auth.qtb_usr_ses (
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
CREATE TABLE auth.qtb_mod (
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
CREATE TABLE auth.qtb_perm (
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
CREATE TABLE auth.qtb_role_perm (
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
CREATE TABLE auth.qtb_role_perm_his (
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
CREATE TABLE auth.qtb_usr_otp (
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
