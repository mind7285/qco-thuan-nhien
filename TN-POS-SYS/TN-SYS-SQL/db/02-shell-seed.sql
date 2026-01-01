-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Seed Data for Shell Modules
-- ---------------------------------------------------------

-- 🇻🇳 Chèn dữ liệu mẫu cho Module Registry
-- 🇺🇸 Insert sample data for Module Registry

-- Xóa dữ liệu cũ nếu có (để chạy lại script)
DELETE FROM shell.qtb_shell_mod;

-- Insert các modules cơ bản
INSERT INTO shell.qtb_shell_mod (
    c_mod_id,
    c_title,
    c_icon,
    c_route,
    c_order,
    q_status,
    q_version,
    q_is_deleted,
    q_created_via,
    q_created_at,
    q_updated_at
) VALUES
    -- Dashboard / Trang chủ
    (
        'dashboard',
        'Trang chủ',
        'house',
        '/dashboard',
        10,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    -- Auth Admin / Quản lý tài khoản
    (
        'auth',
        'Tài khoản & Bảo mật',
        'shield-lock',
        '/auth',
        20,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    -- POS / Bán hàng (Placeholder - sẽ implement sau)
    (
        'pos',
        'Bán hàng',
        'cash-register',
        '/pos',
        30,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    -- Inventory / Kho hàng (Placeholder - sẽ implement sau)
    (
        'inv',
        'Kho hàng',
        'warehouse',
        '/inv',
        40,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    -- Reports / Báo cáo (Placeholder - sẽ implement sau)
    (
        'rpt',
        'Báo cáo',
        'chart-bar',
        '/rpt',
        50,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    -- Settings / Cài đặt (Placeholder - sẽ implement sau)
    (
        'cfg',
        'Cài đặt',
        'gear',
        '/cfg',
        90,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    );

-- Verify data
SELECT 
    c_mod_id,
    c_title,
    c_icon,
    c_route,
    c_order,
    q_status
FROM shell.qtb_shell_mod
WHERE q_is_deleted = FALSE
ORDER BY c_order;

