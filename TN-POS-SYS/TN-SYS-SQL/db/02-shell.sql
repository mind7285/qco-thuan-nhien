-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Generated from Q-SPEC (Module: shell)
-- ---------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS shell;

-- ---------------------------------------------------------
-- 1. TABLES
-- ---------------------------------------------------------

-- Mapping: 🦋 M_Tb_Shell_Mod -> 🗄️ shell.qtb_shell_mod
CREATE TABLE shell.qtb_shell_mod (
    -- From M_Db_Ett (không có q_id vì c_mod_id là primary key)
    c_mod_id VARCHAR(64) PRIMARY KEY,
    
    -- Business Columns
    c_title VARCHAR(128) NOT NULL,
    c_icon VARCHAR(64),
    c_route VARCHAR(128) NOT NULL,
    c_order INT DEFAULT 0,
    
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

-- Index for ordering
CREATE INDEX idx_shell_mod_order ON shell.qtb_shell_mod(c_order) WHERE q_is_deleted = FALSE;

-- ---------------------------------------------------------
-- 2. FUNCTIONS
-- ---------------------------------------------------------

-- Mapping: 🏝️ Fn_Shell_Mod_Get_Registry() -> shell.qfn_shell_mod_get_registry
CREATE OR REPLACE FUNCTION shell.qfn_shell_mod_get_registry()
RETURNS SETOF shell.qtb_shell_mod AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM shell.qtb_shell_mod
    WHERE q_is_deleted = FALSE
      AND q_status = 1
    ORDER BY c_order ASC;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 3. TRIGGERS (Audit Log)
-- ---------------------------------------------------------

-- Enable audit trigger for shell.qtb_shell_mod
CREATE TRIGGER trg_shell_mod_audit
    AFTER INSERT OR UPDATE OR DELETE ON shell.qtb_shell_mod
    FOR EACH ROW
    EXECUTE FUNCTION core.qfn_audit_trigger();

