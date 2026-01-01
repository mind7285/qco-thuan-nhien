// 🇻🇳 Thông tin tài khoản người dùng
// 🇺🇸 User account information
import type { M_Db_Guid_Seq_Itm } from '../../../../core/models';

export interface M_Tb_Auth_Usr extends M_Db_Guid_Seq_Itm {
  // 🇻🇳 Tên đăng nhập
  // 🇺🇸 Username
  c_usr_name: string;

  // 🇻🇳 Mật khẩu đã hash
  // 🇺🇸 Hashed password
  c_pwd_hash: string;

  // 🇻🇳 Họ tên đầy đủ
  // 🇺🇸 Full name
  c_full_name: string;

  // 🇻🇳 Email liên hệ
  // 🇺🇸 Contact email
  c_email?: string;

  // 🇻🇳 Số điện thoại
  // 🇺🇸 Phone number
  c_phone?: string;
}

