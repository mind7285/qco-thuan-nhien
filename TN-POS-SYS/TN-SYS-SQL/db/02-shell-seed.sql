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
    c_parent_id,
    c_route,
    c_order,
    q_status,
    q_version,
    q_is_deleted,
    q_created_via,
    q_created_at,
    q_updated_at
) VALUES
    -- 🏠 1. Trang chủ
    (
        'dashboard',
        'Tổng quan',
        'dashboard',
        NULL,
        '/dashboard',
        10,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),

    -- 🛒 2. Bán hàng (POS)
    (
        'pos',
        'Bán hàng',
        'point_of_sale',
        NULL,
        '/pos',
        20,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'pos-sale',
        'Màn hình bán lẻ',
        'shopping_cart',
        'pos',
        '/pos/sale',
        21,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'pos-orders',
        'Quản lý hóa đơn',
        'receipt_long',
        'pos',
        '/pos/orders',
        22,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'pos-returns',
        'Trả hàng / Hoàn tiền',
        'assignment_return',
        'pos',
        '/pos/returns',
        23,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),

    -- 📦 3. Kho hàng (Inventory)
    (
        'inv',
        'Kho hàng',
        'inventory_2',
        NULL,
        '/inv',
        30,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'inv-products',
        'Sản phẩm & Dịch vụ',
        'inventory',
        'inv',
        '/inv/products',
        31,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'inv-in',
        'Nhập kho',
        'input',
        'inv',
        '/inv/in',
        32,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'inv-check',
        'Kiểm kê kho',
        'fact_check',
        'inv',
        '/inv/check',
        33,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'inv-suppliers',
        'Nhà cung cấp',
        'local_shipping',
        'inv',
        '/inv/suppliers',
        34,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),

    -- 👥 4. Khách hàng (CRM)
    (
        'crm',
        'Đối tác & Khách hàng',
        'groups',
        NULL,
        '/crm',
        40,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'crm-customers',
        'Danh sách khách hàng',
        'person',
        'crm',
        '/crm/customers',
        41,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'crm-groups',
        'Nhóm khách hàng',
        'group_work',
        'crm',
        '/crm/groups',
        42,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'crm-promos',
        'Khuyến mãi & Tích điểm',
        'sell',
        'crm',
        '/crm/promos',
        43,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),

    -- 📊 5. Báo cáo (Reports)
    (
        'rpt',
        'Báo cáo & Thống kê',
        'bar_chart',
        NULL,
        '/rpt',
        50,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'rpt-sales',
        'Doanh thu & Lợi nhuận',
        'trending_up',
        'rpt',
        '/rpt/sales',
        51,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'rpt-inv',
        'Báo cáo tồn kho',
        'storage',
        'rpt',
        '/rpt/inventory',
        52,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'rpt-staff',
        'Báo cáo nhân viên',
        'badge',
        'rpt',
        '/rpt/staff',
        53,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),

    -- ⚙️ 6. Cấu hình (Settings)
    (
        'cfg',
        'Hệ thống',
        'settings',
        NULL,
        '/cfg',
        90,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'cfg-gen',
        'Thông tin cửa hàng',
        'storefront',
        'cfg',
        '/cfg/general',
        91,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'auth',
        'Tài khoản & Bảo mật',
        'admin_panel_settings',
        'cfg',
        '/auth',
        92,
        1,
        0,
        FALSE,
        'System',
        (extract(epoch from now()) * 1000)::BIGINT,
        (extract(epoch from now()) * 1000)::BIGINT
    ),
    (
        'sys-logs',
        'Nhật ký hoạt động',
        'history_edu',
        'cfg',
        '/cfg/logs',
        93,
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

