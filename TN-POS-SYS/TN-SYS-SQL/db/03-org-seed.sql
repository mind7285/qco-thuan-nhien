-- ---------------------------------------------------------
-- TN-POS Database SQL (PostgreSQL)
-- Seed Data for Organization Module
-- ---------------------------------------------------------

-- 1. Insert Company
INSERT INTO org.qtb_cpy (q_id, c_cpy_name, c_tax_code, q_created_via)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'TẬP ĐOÀN THUẬN NHIÊN', '0101010101', 'Seed')
ON CONFLICT DO NOTHING;

-- 2. Insert Region
INSERT INTO org.qtb_reg (q_id, c_cpy_id, c_reg_name, q_created_via)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'MIỀN NAM', 'Seed')
ON CONFLICT DO NOTHING;

-- 3. Insert Branch
INSERT INTO org.qtb_brh (q_id, c_reg_id, c_brh_name, c_address, c_phone, q_created_via)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'CHI NHÁNH QUẬN 1', '123 Lê Lợi, Quận 1, TP.HCM', '02838000111', 'Seed')
ON CONFLICT DO NOTHING;

-- 4. Insert Department
INSERT INTO org.qtb_dep (q_id, c_brh_id, c_dep_name, q_created_via)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'PHÒNG BÁN HÀNG', 'Seed')
ON CONFLICT DO NOTHING;

-- 5. Link Admin user to default branch (Assuming admin ID exists from auth seed)
DO $$
DECLARE
    v_admin_id UUID;
    v_brh_id UUID := '550e8400-e29b-41d4-a716-446655440002';
BEGIN
    SELECT q_id INTO v_admin_id FROM auth.qtb_usr WHERE c_usr_name = 'admin';
    
    IF v_admin_id IS NOT NULL THEN
        INSERT INTO org.qtb_usr_brh (c_usr_id, c_brh_id, c_is_default, q_created_via)
        VALUES (v_admin_id, v_brh_id, TRUE, 'Seed')
        ON CONFLICT (c_usr_id, c_brh_id) DO UPDATE SET c_is_default = TRUE;
    END IF;
END $$;

