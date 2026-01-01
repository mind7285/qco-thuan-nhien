-- ---------------------------------------------------------
-- Grant Permissions for Application User (Simple Version)
-- Run this script as PostgreSQL superuser (postgres)
-- Usage: psql -U postgres -d qc_thuan_nhien_db -f 99-grant-permissions-simple.sql
-- ---------------------------------------------------------

-- Application user
DO $$
DECLARE
    app_user TEXT := 'qc_thuan_nhien_app';
BEGIN
    -- Grant schema usage
    EXECUTE format('GRANT USAGE ON SCHEMA core TO %I', app_user);
    EXECUTE format('GRANT USAGE ON SCHEMA auth TO %I', app_user);
    EXECUTE format('GRANT USAGE ON SCHEMA shell TO %I', app_user);

    -- Grant all privileges on all tables
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA core TO %I', app_user);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA auth TO %I', app_user);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA shell TO %I', app_user);

    -- Grant default privileges for future tables
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA core GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO %I', app_user);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO %I', app_user);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA shell GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO %I', app_user);

    -- Grant execute on all functions/procedures
    EXECUTE format('GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA core TO %I', app_user);
    EXECUTE format('GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA auth TO %I', app_user);
    EXECUTE format('GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA shell TO %I', app_user);

    -- Grant default privileges for future functions
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA core GRANT EXECUTE ON FUNCTIONS TO %I', app_user);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT EXECUTE ON FUNCTIONS TO %I', app_user);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA shell GRANT EXECUTE ON FUNCTIONS TO %I', app_user);

    -- Grant usage on sequences
    EXECUTE format('GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA core TO %I', app_user);
    EXECUTE format('GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA auth TO %I', app_user);
    EXECUTE format('GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA shell TO %I', app_user);

    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA core GRANT USAGE, SELECT ON SEQUENCES TO %I', app_user);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT USAGE, SELECT ON SEQUENCES TO %I', app_user);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA shell GRANT USAGE, SELECT ON SEQUENCES TO %I', app_user);

    RAISE NOTICE 'Permissions granted successfully for user: %', app_user;
END $$;

