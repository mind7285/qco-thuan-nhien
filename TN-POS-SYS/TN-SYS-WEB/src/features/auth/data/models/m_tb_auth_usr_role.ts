// 🇻🇳 Bảng trung gian liên kết User và Role
// 🇺🇸 Junction table linking User and Role
import type { M_Db_Ett } from '../../../../core/models';

export interface M_Tb_Auth_Usr_Role extends M_Db_Ett {
  // 🇻🇳 ID người dùng
  // 🇺🇸 User ID
  c_usr_id: string;

  // 🇻🇳 ID vai trò
  // 🇺🇸 Role ID
  c_role_id: string;
}

