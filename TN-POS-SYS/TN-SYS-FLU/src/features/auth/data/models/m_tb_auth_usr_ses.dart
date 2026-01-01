// 🇻🇳 Quản lý phiên đăng nhập
// 🇺🇸 Session management
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../../core/models/m_db_guid_itt.dart';

part 'm_tb_auth_usr_ses.freezed.dart';
part 'm_tb_auth_usr_ses.g.dart';

@freezed
class M_Tb_Auth_Usr_Ses with _$M_Tb_Auth_Usr_Ses implements M_Db_Guid_Itm {
  const factory M_Tb_Auth_Usr_Ses({
    // 🇻🇳 Khóa chính
    // 🇺🇸 Primary key
    required String q_id,

    // 🇻🇳 ID người dùng
    // 🇺🇸 User ID
    required String c_usr_id,

    // 🇻🇳 Token định danh phiên
    // 🇺🇸 Session token
    required String c_ses_token,

    // 🇻🇳 Thời điểm hết hạn (Unix Time MS)
    // 🇺🇸 Expiration timestamp (Unix Time MS)
    required int c_expired_at,

    // 🇻🇳 IP khi đăng nhập
    // 🇺🇸 Login IP address
    String? c_login_ip,

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
  }) = _M_Tb_Auth_Usr_Ses;

  factory M_Tb_Auth_Usr_Ses.fromJson(Map<String, dynamic> json) =>
      _$M_Tb_Auth_Usr_SesFromJson(json);
}

