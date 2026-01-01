// 🇻🇳 Danh sách các vai trò trong hệ thống
// 🇺🇸 List of roles in the system
import type { M_Db_Guid_Seq_Itm } from '../../../../core/models';

export interface M_Tb_Auth_Role extends M_Db_Guid_Seq_Itm {
  // 🇻🇳 Tên vai trò hiển thị
  // 🇺🇸 Display role name
  c_role_name: string;

  // 🇻🇳 Mã vai trò để check logic
  // 🇺🇸 Role code for logic checking
  c_role_code: string;
}

