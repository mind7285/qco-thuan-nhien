// 🇻🇳 Lưu trữ các mã OTP để phục vụ quên mật khẩu hoặc xác thực
// 🇺🇸 Store OTP codes for password recovery or authentication
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../../core/models/m_db_guid_itt.dart';

part 'm_tb_auth_usr_otp.freezed.dart';
part 'm_tb_auth_usr_otp.g.dart';

@freezed
class M_Tb_Auth_Usr_Otp with _$M_Tb_Auth_Usr_Otp implements M_Db_Guid_Itm {
  const factory M_Tb_Auth_Usr_Otp({
    // 🇻🇳 Khóa chính
    // 🇺🇸 Primary key
    required String q_id,

    // 🇻🇳 ID người dùng liên quan
    // 🇺🇸 Related user ID
    required String c_usr_id,

    // 🇻🇳 Mã OTP
    // 🇺🇸 OTP code
    required String c_otp_code,

    // 🇻🇳 Thời điểm hết hạn mã
    // 🇺🇸 Code expiration timestamp
    required int c_expired_at,

    // 🇻🇳 Trạng thái đã sử dụng hay chưa
    // 🇺🇸 Whether the code has been used
    @Default(false) required bool c_is_used,

    // 🇻🇳 Metadata từ M_Db_Ett
    // 🇺🇸 Metadata from M_Db_Ett
    @Default(0) required int q_status,
    @Default(0) required int q_version,
    @Default(false) required bool q_is_deleted,
    String? q_created_via,
    @Default(0) required int q_created_at,
    String? q_created_by,
    String? q_updated_via,
    @Default(0) required int q_updated_at,
    String? q_updated_by,
    String? q_updated_note,
    String? q_deleted_via,
    int? q_deleted_at,
    String? q_deleted_by,
    String? q_deleted_note,
  }) = _M_Tb_Auth_Usr_Otp;

  factory M_Tb_Auth_Usr_Otp.fromJson(Map<String, dynamic> json) =>
      _$M_Tb_Auth_Usr_OtpFromJson(json);
}

