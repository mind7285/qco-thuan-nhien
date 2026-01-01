// 🇻🇳 Bảng trung gian liên kết Role với Permission
// 🇺🇸 Junction table linking Role with Permission
import type { M_Db_Ett } from '../../../../core/models';

export interface M_Tb_Auth_Role_Perm extends M_Db_Ett {
  // 🇻🇳 ID vai trò
  // 🇺🇸 Role ID
  c_role_id: string;

  // 🇻🇳 ID module
  // 🇺🇸 Module ID
  c_mod_id: string;

  // 🇻🇳 ID quyền hạn
  // 🇺🇸 Permission ID
  c_perm_id: string;
}

