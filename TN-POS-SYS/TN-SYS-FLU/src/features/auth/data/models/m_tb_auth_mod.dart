// 🇻🇳 Danh sách module (tài nguyên hệ thống)
// 🇺🇸 List of modules (system resources)
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../../core/models/m_db_guid_seq_itt.dart';
import 'm_tb_auth_perm.dart';

part 'm_tb_auth_mod.freezed.dart';
part 'm_tb_auth_mod.g.dart';

@freezed
class M_Tb_Auth_Mod with _$M_Tb_Auth_Mod implements M_Db_Guid_Seq_Itm {
  const factory M_Tb_Auth_Mod({
    // 🇻🇳 Khóa chính
    // 🇺🇸 Primary key
    required String q_id,
    @Default(1) required int q_seq,

    // 🇻🇳 Tên module hiển thị
    // 🇺🇸 Display module name
    required String c_mod_name,

    // 🇻🇳 Mã module để check logic
    // 🇺🇸 Module code for logic checking
    required String c_mod_code,

    // 🇻🇳 Danh sách quyền thuộc module
    // 🇺🇸 List of permissions belonging to module
    List<M_Tb_Auth_Perm>? perms,

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
  }) = _M_Tb_Auth_Mod;

  factory M_Tb_Auth_Mod.fromJson(Map<String, dynamic> json) =>
      _$M_Tb_Auth_ModFromJson(json);
}

