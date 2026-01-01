// 🇻🇳 Lưu trữ các mã OTP để phục vụ quên mật khẩu hoặc xác thực
// 🇺🇸 Store OTP codes for password recovery or authentication
import type { M_Db_Guid_Itm } from '../../../../core/models';

export interface M_Tb_Auth_Usr_Otp extends M_Db_Guid_Itm {
  // 🇻🇳 ID người dùng liên quan
  // 🇺🇸 Related user ID
  c_usr_id: string;

  // 🇻🇳 Mã OTP
  // 🇺🇸 OTP code
  c_otp_code: string;

  // 🇻🇳 Thời điểm hết hạn mã
  // 🇺🇸 Code expiration timestamp
  c_expired_at: number;

  // 🇻🇳 Trạng thái đã sử dụng hay chưa
  // 🇺🇸 Whether the code has been used
  c_is_used: boolean;
}

