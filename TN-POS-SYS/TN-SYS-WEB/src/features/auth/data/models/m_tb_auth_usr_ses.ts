// 🇻🇳 Quản lý phiên đăng nhập
// 🇺🇸 Session management
import type { M_Db_Guid_Itm } from '../../../../core/models';

export interface M_Tb_Auth_Usr_Ses extends M_Db_Guid_Itm {
  // 🇻🇳 ID người dùng
  // 🇺🇸 User ID
  c_usr_id: string;

  // 🇻🇳 Token định danh phiên
  // 🇺🇸 Session token
  c_ses_token: string;

  // 🇻🇳 Thời điểm hết hạn (Unix Time MS)
  // 🇺🇸 Expiration timestamp (Unix Time MS)
  c_expired_at: number;

  // 🇻🇳 IP khi đăng nhập
  // 🇺🇸 Login IP address
  c_login_ip?: string;
}

