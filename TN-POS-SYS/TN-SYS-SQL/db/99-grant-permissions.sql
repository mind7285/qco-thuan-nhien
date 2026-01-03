-- ---------------------------------------------------------
-- Grant Permissions for Application User
-- Run this script as PostgreSQL superuser (postgres)
-- ---------------------------------------------------------

-- Set the application user (change if needed)
\set app_user 'qc_thuan_nhien_app'

-- Grant schema usage
GRANT USAGE ON SCHEMA core TO :app_user;
GRANT USAGE ON SCHEMA auth TO :app_user;
GRANT USAGE ON SCHEMA shell TO :app_user;
GRANT USAGE ON SCHEMA org TO :app_user;

-- Grant all privileges on all tables in schemas
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA core TO :app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA auth TO :app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA shell TO :app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA org TO :app_user;

-- Grant privileges on future tables (default privileges)
ALTER DEFAULT PRIVILEGES IN SCHEMA core GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA shell GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA org GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO :app_user;

-- Grant execute on all functions/procedures
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA core TO :app_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA auth TO :app_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA shell TO :app_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA org TO :app_user;

-- Grant execute on future functions/procedures
ALTER DEFAULT PRIVILEGES IN SCHEMA core GRANT EXECUTE ON FUNCTIONS TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT EXECUTE ON FUNCTIONS TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA shell GRANT EXECUTE ON FUNCTIONS TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA org GRANT EXECUTE ON FUNCTIONS TO :app_user;

-- Grant usage on sequences (if any)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA core TO :app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA auth TO :app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA shell TO :app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA org TO :app_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA core GRANT USAGE, SELECT ON SEQUENCES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT USAGE, SELECT ON SEQUENCES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA shell GRANT USAGE, SELECT ON SEQUENCES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA org GRANT USAGE, SELECT ON SEQUENCES TO :app_user;

-- Grant select on views
GRANT SELECT ON ALL TABLES IN SCHEMA core TO :app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO :app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA shell TO :app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA org TO :app_user;

SELECT 'Permissions granted successfully for user: ' || :'app_user' AS result;

