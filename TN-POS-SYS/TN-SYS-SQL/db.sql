-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Generated from Q-SPEC
-- ---------------------------------------------------------

-- 1. Bảng Vai trò (Roles)
-- Mapping: 🦋 M_Tb_Role -> 🗄️ qtb_role
CREATE TABLE qtb_role (
    q_q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(128) NOT NULL,
    role_code VARCHAR(64) UNIQUE NOT NULL,
    
    -- M_Data_Entity common fields
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID
);

-- 2. Bảng Người dùng (Users)
-- Mapping: 🦋 M_Tb_Usr -> 🗄️ qtb_usr
CREATE TABLE qtb_usr (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usr_name VARCHAR(64) UNIQUE NOT NULL,
    pwd_hash VARCHAR(256) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE,
    phone VARCHAR(32),
    
    -- M_Data_Entity common fields
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID
);

-- 3. Bảng liên kết Người dùng - Vai trò (User Roles)
-- Mapping: 🦋 M_Tb_Usr_Role -> 🗄️ qtb_usr_role
CREATE TABLE qtb_usr_role (
    usr_id UUID NOT NULL REFERENCES qtb_usr(q_id),
    role_id UUID NOT NULL REFERENCES qtb_role(q_id),
    PRIMARY KEY (usr_id, role_id),
    
    -- M_Data_Entity common fields
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID
);

-- 4. Bảng Phiên làm việc (User Sessions)
-- Mapping: 🦋 M_Tb_Usr_Ses -> 🗄️ qtb_usr_ses
CREATE TABLE qtb_usr_ses (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usr_id UUID NOT NULL REFERENCES qtb_usr(q_id),
    ses_token TEXT UNIQUE NOT NULL,
    expired_at BIGINT NOT NULL,
    login_ip VARCHAR(64),
    
    -- M_Data_Entity common fields
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID
);

-- 5. Bảng Module (Modules)
-- Mapping: 🦋 M_Tb_Mod -> 🗄️ qtb_mod
CREATE TABLE qtb_mod (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mod_name VARCHAR(128) NOT NULL,
    mod_code VARCHAR(64) UNIQUE NOT NULL,
    
    -- M_Data_Entity common fields
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID
);

-- 6. Bảng Quyền hạn (Permissions)
-- Mapping: 🦋 M_Tb_Perm -> 🗄️ qtb_perm
CREATE TABLE qtb_perm (
    q_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    perm_name VARCHAR(128) NOT NULL,
    perm_code VARCHAR(64) UNIQUE NOT NULL,
    
    -- M_Data_Entity common fields
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID
);

-- 7. Bảng liên kết Vai trò - Quyền hạn (Role Permissions)
-- Mapping: 🦋 M_Tb_Role_Perm -> 🗄️ qtb_role_perm
CREATE TABLE qtb_role_perm (
    role_id UUID NOT NULL REFERENCES qtb_role(q_id),
    mod_id UUID NOT NULL REFERENCES qtb_mod(q_id),
    perm_id UUID NOT NULL REFERENCES qtb_perm(q_id),
    PRIMARY KEY (role_id, mod_id, perm_id),
    
    -- M_Data_Entity common fields
    q_status INT DEFAULT 1,
    q_version INT DEFAULT 0,
    q_is_deleted BOOLEAN DEFAULT FALSE,
    q_created_via VARCHAR(64),
    q_created_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_created_by UUID,
    q_updated_via VARCHAR(64),
    q_updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
    q_updated_by UUID,
    q_deleted_via VARCHAR(64),
    q_deleted_at BIGINT,
    q_deleted_by UUID
);

-- 8. View Tổng hợp quyền người dùng (User Rights View)
-- Mapping: 🦋 M_Vw_Usr_Right -> 🪟 qvw_usr_right
CREATE VIEW qvw_usr_right AS
SELECT 
    u.q_id AS usr_id,
    u.usr_name,
    m.mod_code,
    p.perm_code
FROM qtb_usr u
JOIN qtb_usr_role ur ON u.q_id = ur.usr_id
JOIN qtb_role_perm rp ON ur.role_id = rp.role_id
JOIN qtb_mod m ON rp.mod_id = m.q_id
JOIN qtb_perm p ON rp.perm_id = p.q_id
WHERE u.q_is_deleted = FALSE 
  AND u.q_status = 1
  AND m.q_is_deleted = FALSE 
  AND m.q_status = 1
  AND p.q_is_deleted = FALSE 
  AND p.q_status = 1;
