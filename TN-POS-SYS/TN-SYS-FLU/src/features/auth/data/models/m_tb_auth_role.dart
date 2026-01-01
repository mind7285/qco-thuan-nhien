// 🇻🇳 Danh sách các vai trò trong hệ thống
// 🇺🇸 List of roles in the system
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../../core/models/m_db_guid_seq_itt.dart';

part 'm_tb_auth_role.freezed.dart';
part 'm_tb_auth_role.g.dart';

@freezed
class M_Tb_Auth_Role with _$M_Tb_Auth_Role implements M_Db_Guid_Seq_Itm {
  const factory M_Tb_Auth_Role({
    // 🇻🇳 Khóa chính
    // 🇺🇸 Primary key
    required String q_id,
    @Default(1) required int q_seq,

    // 🇻🇳 Tên vai trò hiển thị
    // 🇺🇸 Display role name
    required String c_role_name,

    // 🇻🇳 Mã vai trò để check logic
    // 🇺🇸 Role code for logic checking
    required String c_role_code,

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
  }) = _M_Tb_Auth_Role;

  factory M_Tb_Auth_Role.fromJson(Map<String, dynamic> json) =>
      _$M_Tb_Auth_RoleFromJson(json);
}

