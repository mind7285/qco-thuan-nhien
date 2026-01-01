// 🇻🇳 Thông tin tài khoản người dùng
// 🇺🇸 User account information
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../../core/models/m_db_guid_seq_itt.dart';

part 'm_tb_auth_usr.freezed.dart';
part 'm_tb_auth_usr.g.dart';

@freezed
class M_Tb_Auth_Usr with _$M_Tb_Auth_Usr implements M_Db_Guid_Seq_Itm {
  const factory M_Tb_Auth_Usr({
    // 🇻🇳 Khóa chính
    // 🇺🇸 Primary key
    required String q_id,
    @Default(1) required int q_seq,

    // 🇻🇳 Tên đăng nhập
    // 🇺🇸 Username
    required String c_usr_name,

    // 🇻🇳 Mật khẩu đã hash
    // 🇺🇸 Hashed password
    required String c_pwd_hash,

    // 🇻🇳 Họ tên đầy đủ
    // 🇺🇸 Full name
    required String c_full_name,

    // 🇻🇳 Email liên hệ
    // 🇺🇸 Contact email
    String? c_email,

    // 🇻🇳 Số điện thoại
    // 🇺🇸 Phone number
    String? c_phone,

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
  }) = _M_Tb_Auth_Usr;

  factory M_Tb_Auth_Usr.fromJson(Map<String, dynamic> json) =>
      _$M_Tb_Auth_UsrFromJson(json);
}

