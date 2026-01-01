// 🇻🇳 Lưu trữ các mã OTP để phục vụ quên mật khẩu hoặc xác thực
// 🇺🇸 Store OTP codes for password recovery or authentication
import '../../../../core/models/m_db_guid_itt.dart';

class M_Tb_Auth_Usr_Otp extends M_Db_Guid_Itm {
  // 🇻🇳 ID người dùng liên quan
  // 🇺🇸 Related user ID
  final String c_usr_id;

  // 🇻🇳 Mã OTP
  // 🇺🇸 OTP code
  final String c_otp_code;

  // 🇻🇳 Thời điểm hết hạn mã
  // 🇺🇸 Code expiration timestamp
  final int c_expired_at;

  // 🇻🇳 Trạng thái đã sử dụng hay chưa
  // 🇺🇸 Whether the code has been used
  final bool c_is_used;

  const M_Tb_Auth_Usr_Otp({
    required super.q_id,
    required this.c_usr_id,
    required this.c_otp_code,
    required this.c_expired_at,
    this.c_is_used = false,
    super.q_status = 0,
    super.q_version = 0,
    super.q_is_deleted = false,
    super.q_created_via,
    super.q_created_at = 0,
    super.q_created_by,
    super.q_updated_via,
    super.q_updated_at = 0,
    super.q_updated_by,
    super.q_updated_note,
    super.q_deleted_via,
    super.q_deleted_at,
    super.q_deleted_by,
    super.q_deleted_note,
  });

  // 🇻🇳 Tạo từ JSON
  // 🇺🇸 Create from JSON
  factory M_Tb_Auth_Usr_Otp.fromJson(Map<String, dynamic> json) {
    return M_Tb_Auth_Usr_Otp(
      q_id: json['q_id'] as String,
      c_usr_id: json['c_usr_id'] as String,
      c_otp_code: json['c_otp_code'] as String,
      c_expired_at: json['c_expired_at'] as int,
      c_is_used: json['c_is_used'] as bool? ?? false,
      q_status: json['q_status'] as int? ?? 0,
      q_version: json['q_version'] as int? ?? 0,
      q_is_deleted: json['q_is_deleted'] as bool? ?? false,
      q_created_via: json['q_created_via'] as String?,
      q_created_at: json['q_created_at'] as int? ?? 0,
      q_created_by: json['q_created_by'] as String?,
      q_updated_via: json['q_updated_via'] as String?,
      q_updated_at: json['q_updated_at'] as int? ?? 0,
      q_updated_by: json['q_updated_by'] as String?,
      q_updated_note: json['q_updated_note'] as String?,
      q_deleted_via: json['q_deleted_via'] as String?,
      q_deleted_at: json['q_deleted_at'] as int?,
      q_deleted_by: json['q_deleted_by'] as String?,
      q_deleted_note: json['q_deleted_note'] as String?,
    );
  }

  // 🇻🇳 Chuyển sang JSON
  // 🇺🇸 Convert to JSON
  @override
  Map<String, dynamic> toJson() {
    return {
      'c_usr_id': c_usr_id,
      'c_otp_code': c_otp_code,
      'c_expired_at': c_expired_at,
      'c_is_used': c_is_used,
      ...super.toJson(),
    };
  }

  // 🇻🇳 Copy with
  // 🇺🇸 Copy with
  @override
  M_Tb_Auth_Usr_Otp copyWith({
    String? q_id,
    String? c_usr_id,
    String? c_otp_code,
    int? c_expired_at,
    bool? c_is_used,
    int? q_status,
    int? q_version,
    bool? q_is_deleted,
    String? q_created_via,
    int? q_created_at,
    String? q_created_by,
    String? q_updated_via,
    int? q_updated_at,
    String? q_updated_by,
    String? q_updated_note,
    String? q_deleted_via,
    int? q_deleted_at,
    String? q_deleted_by,
    String? q_deleted_note,
  }) {
    return M_Tb_Auth_Usr_Otp(
      q_id: q_id ?? this.q_id,
      c_usr_id: c_usr_id ?? this.c_usr_id,
      c_otp_code: c_otp_code ?? this.c_otp_code,
      c_expired_at: c_expired_at ?? this.c_expired_at,
      c_is_used: c_is_used ?? this.c_is_used,
      q_status: q_status ?? this.q_status,
      q_version: q_version ?? this.q_version,
      q_is_deleted: q_is_deleted ?? this.q_is_deleted,
      q_created_via: q_created_via ?? this.q_created_via,
      q_created_at: q_created_at ?? this.q_created_at,
      q_created_by: q_created_by ?? this.q_created_by,
      q_updated_via: q_updated_via ?? this.q_updated_via,
      q_updated_at: q_updated_at ?? this.q_updated_at,
      q_updated_by: q_updated_by ?? this.q_updated_by,
      q_updated_note: q_updated_note ?? this.q_updated_note,
      q_deleted_via: q_deleted_via ?? this.q_deleted_via,
      q_deleted_at: q_deleted_at ?? this.q_deleted_at,
      q_deleted_by: q_deleted_by ?? this.q_deleted_by,
      q_deleted_note: q_deleted_note ?? this.q_deleted_note,
    );
  }
}
