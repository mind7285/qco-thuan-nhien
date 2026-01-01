// 🇻🇳 Quản lý phiên đăng nhập
// 🇺🇸 Session management
import '../../../../core/models/m_db_guid_itt.dart';

class M_Tb_Auth_Usr_Ses extends M_Db_Guid_Itm {
  // 🇻🇳 ID người dùng
  // 🇺🇸 User ID
  final String c_usr_id;

  // 🇻🇳 Token định danh phiên
  // 🇺🇸 Session token
  final String c_ses_token;

  // 🇻🇳 Thời điểm hết hạn (Unix Time MS)
  // 🇺🇸 Expiration timestamp (Unix Time MS)
  final int c_expired_at;

  // 🇻🇳 IP khi đăng nhập
  // 🇺🇸 Login IP address
  final String? c_login_ip;

  const M_Tb_Auth_Usr_Ses({
    required super.q_id,
    required this.c_usr_id,
    required this.c_ses_token,
    required this.c_expired_at,
    this.c_login_ip,
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
  factory M_Tb_Auth_Usr_Ses.fromJson(Map<String, dynamic> json) {
    return M_Tb_Auth_Usr_Ses(
      q_id: json['q_id'] as String,
      c_usr_id: json['c_usr_id'] as String,
      c_ses_token: json['c_ses_token'] as String,
      c_expired_at: json['c_expired_at'] as int,
      c_login_ip: json['c_login_ip'] as String?,
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
      'c_ses_token': c_ses_token,
      'c_expired_at': c_expired_at,
      'c_login_ip': c_login_ip,
      ...super.toJson(),
    };
  }

  // 🇻🇳 Copy with
  // 🇺🇸 Copy with
  @override
  M_Tb_Auth_Usr_Ses copyWith({
    String? q_id,
    String? c_usr_id,
    String? c_ses_token,
    int? c_expired_at,
    String? c_login_ip,
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
    return M_Tb_Auth_Usr_Ses(
      q_id: q_id ?? this.q_id,
      c_usr_id: c_usr_id ?? this.c_usr_id,
      c_ses_token: c_ses_token ?? this.c_ses_token,
      c_expired_at: c_expired_at ?? this.c_expired_at,
      c_login_ip: c_login_ip ?? this.c_login_ip,
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
