// 🇻🇳 Danh sách quyền hạn (hành động chi tiết)
// 🇺🇸 List of permissions (detailed actions)
import type { M_Db_Guid_Seq_Itm } from '../../../../core/models';

export interface M_Tb_Auth_Perm extends M_Db_Guid_Seq_Itm {
  // 🇻🇳 Tên quyền hiển thị
  // 🇺🇸 Display permission name
  c_perm_name: string;

  // 🇻🇳 Mã quyền (e.g., VIEW, ADD, EDIT, DEL)
  // 🇺🇸 Permission code (e.g., VIEW, ADD, EDIT, DEL)
  c_perm_code: string;
}

