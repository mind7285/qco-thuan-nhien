-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Seed Data for Organization Shell Modules
-- ---------------------------------------------------------

-- 1. Insert Org Parent Module
INSERT INTO shell.qtb_shell_mod (
    c_mod_id,
    c_title,
    c_icon,
    c_parent_id,
    c_route,
    c_order,
    q_status,
    q_created_via
) VALUES (
    'org',
    'Quản lý tổ chức',
    'corporate_fare',
    NULL,
    '/org',
    80,
    1,
    'Seed'
) ON CONFLICT (c_mod_id) DO UPDATE SET 
    c_title = EXCLUDED.c_title,
    c_icon = EXCLUDED.c_icon,
    c_order = EXCLUDED.c_order;

INSERT INTO shell.qtb_shell_mod (
    c_mod_id,
    c_title,
    c_icon,
    c_parent_id,
    c_route,
    c_order,
    q_status,
    q_created_via
) VALUES (
    'org-manage',
    'Danh mục tổ chức',
    'list_alt',
    'org',
    '/org/manage',
    80,
    1,
    'Seed'
) ON CONFLICT (c_mod_id) DO UPDATE SET 
    c_title = EXCLUDED.c_title,
    c_icon = EXCLUDED.c_icon,
    c_order = EXCLUDED.c_order;

-- 2. Insert Org Hierarchy Module
INSERT INTO shell.qtb_shell_mod (
    c_mod_id,
    c_title,
    c_icon,
    c_parent_id,
    c_route,
    c_order,
    q_status,
    q_created_via
) VALUES (
    'org-hierarchy',
    'Sơ đồ phân cấp',
    'account_tree',
    'org',
    '/org/hierarchy',
    81,
    1,
    'Seed'
) ON CONFLICT (c_mod_id) DO UPDATE SET 
    c_title = EXCLUDED.c_title,
    c_icon = EXCLUDED.c_icon,
    c_order = EXCLUDED.c_order;

-- 3. Insert Org User Assignment Module
INSERT INTO shell.qtb_shell_mod (
    c_mod_id,
    c_title,
    c_icon,
    c_parent_id,
    c_route,
    c_order,
    q_status,
    q_created_via
) VALUES (
    'org-user-assignment',
    'Phân bổ nhân sự',
    'group_add',
    'org',
    '/org/user-assignment',
    82,
    1,
    'Seed'
) ON CONFLICT (c_mod_id) DO UPDATE SET 
    c_title = EXCLUDED.c_title,
    c_icon = EXCLUDED.c_icon,
    c_order = EXCLUDED.c_order;

