// 🇻🇳 Danh sách module (tài nguyên hệ thống)
// 🇺🇸 List of modules (system resources)
import type { M_Db_Guid_Seq_Itm } from '../../../../core/models';
import type { M_Tb_Auth_Perm } from './m_tb_auth_perm';

export interface M_Tb_Auth_Mod extends M_Db_Guid_Seq_Itm {
  // 🇻🇳 Tên module hiển thị
  // 🇺🇸 Display module name
  c_mod_name: string;

  // 🇻🇳 Mã module để check logic
  // 🇺🇸 Module code for logic checking
  c_mod_code: string;

  // 🇻🇳 Danh sách quyền thuộc module
  // 🇺🇸 List of permissions belonging to module
  perms?: M_Tb_Auth_Perm[];
}

