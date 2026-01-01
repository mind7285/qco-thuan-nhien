// 🇻🇳 Model đại diện cho một Module được đăng ký trong hệ thống
// 🇺🇸 Model representing a registered module in the system
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../../core/models/m_db_ett.dart';

part 'm_tb_shell_mod.freezed.dart';
part 'm_tb_shell_mod.g.dart';

@freezed
class M_Tb_Shell_Mod with _$M_Tb_Shell_Mod implements M_Db_Ett {
  const factory M_Tb_Shell_Mod({
    // 🇻🇳 ID định danh module (e.g., 'pos', 'inv')
    // 🇺🇸 Module identifier (e.g., 'pos', 'inv')
    required String c_mod_id,

    // 🇻🇳 Tiêu đề hiển thị của module
    // 🇺🇸 Display title of the module
    required String c_title,

    // 🇻🇳 Tên icon (Material/Shoelace)
    // 🇺🇸 Icon name (Material/Shoelace)
    required String c_icon,

    // 🇻🇳 Đường dẫn gốc (Base Route)
    // 🇺🇸 Base route path
    required String c_route,

    // 🇻🇳 Thứ tự hiển thị trên Sidebar
    // 🇺🇸 Display order on Sidebar
    required int c_order,

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
  }) = _M_Tb_Shell_Mod;

  factory M_Tb_Shell_Mod.fromJson(Map<String, dynamic> json) =>
      _$M_Tb_Shell_ModFromJson(json);
}

