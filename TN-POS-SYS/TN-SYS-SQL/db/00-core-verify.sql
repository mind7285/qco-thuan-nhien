-- ============================================================
-- Script VERIFY: Kiem tra cac objects da duoc tao trong schema core
-- ============================================================

-- 1. Kiem tra schema core
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'core') 
        THEN 'OK: Schema core da duoc tao'
        ELSE 'ERROR: Schema core chua duoc tao'
    END AS schema_status;

-- 2. Kiem tra tables trong schema core
SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN tablename IN ('qtb_audit_log', 'qtb_audit_checkpoint') 
        THEN 'OK'
        ELSE 'UNEXPECTED'
    END AS status
FROM pg_tables 
WHERE schemaname = 'core'
ORDER BY tablename;

-- 3. Kiem tra functions trong schema core
SELECT 
    n.nspname AS schema_name,
    p.proname AS function_name,
    pg_get_function_arguments(p.oid) AS arguments,
    'OK' AS status
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'core'
  AND p.proname LIKE 'qfn_%'
ORDER BY p.proname;

-- 4. Kiem tra sequence trong schema core
SELECT 
    schemaname,
    sequencename,
    'OK' AS status
FROM pg_sequences 
WHERE schemaname = 'core';

-- 5. Kiem tra partitions cua qtb_audit_log
SELECT 
    nmsp_child.nspname AS partition_schema,
    child.relname AS partition_name,
    'OK' AS status
FROM pg_inherits
JOIN pg_class parent ON pg_inherits.inhparent = parent.oid
JOIN pg_class child ON pg_inherits.inhrelid = child.oid
JOIN pg_namespace nmsp_parent ON parent.relnamespace = nmsp_parent.oid
JOIN pg_namespace nmsp_child ON child.relnamespace = nmsp_child.oid
WHERE parent.relname = 'qtb_audit_log'
  AND nmsp_parent.nspname = 'core'
ORDER BY child.relname;

-- 6. Tong ket
SELECT 
    (SELECT COUNT(*) FROM pg_namespace WHERE nspname = 'core') AS schema_count,
    (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'core') AS table_count,
    (SELECT COUNT(*) FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'core' AND p.proname LIKE 'qfn_%') AS function_count,
    (SELECT COUNT(*) FROM pg_sequences WHERE schemaname = 'core') AS sequence_count;

