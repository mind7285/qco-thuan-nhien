// 🇻🇳 Danh sách quyền hạn (hành động chi tiết)
// 🇺🇸 List of permissions (detailed actions)
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../../core/models/m_db_guid_seq_itt.dart';

part 'm_tb_auth_perm.freezed.dart';
part 'm_tb_auth_perm.g.dart';

@freezed
class M_Tb_Auth_Perm with _$M_Tb_Auth_Perm implements M_Db_Guid_Seq_Itm {
  const factory M_Tb_Auth_Perm({
    // 🇻🇳 Khóa chính
    // 🇺🇸 Primary key
    required String q_id,
    @Default(1) required int q_seq,

    // 🇻🇳 Tên quyền hiển thị
    // 🇺🇸 Display permission name
    required String c_perm_name,

    // 🇻🇳 Mã quyền (e.g., VIEW, ADD, EDIT, DEL)
    // 🇺🇸 Permission code (e.g., VIEW, ADD, EDIT, DEL)
    required String c_perm_code,

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
  }) = _M_Tb_Auth_Perm;

  factory M_Tb_Auth_Perm.fromJson(Map<String, dynamic> json) =>
      _$M_Tb_Auth_PermFromJson(json);
}

