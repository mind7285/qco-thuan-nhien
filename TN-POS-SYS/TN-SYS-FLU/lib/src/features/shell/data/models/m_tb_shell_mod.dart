// 🇻🇳 Model đại diện cho một Module được đăng ký trong hệ thống
// 🇺🇸 Model representing a registered module in the system
import '../../../../core/models/m_db_ett.dart';

class M_Tb_Shell_Mod extends M_Db_Ett {
  // 🇻🇳 ID định danh module (e.g., 'pos', 'inv')
  // 🇺🇸 Module identifier (e.g., 'pos', 'inv')
  final String c_mod_id;

  // 🇻🇳 Tiêu đề hiển thị của module
  // 🇺🇸 Display title of the module
  final String c_title;

  // 🇻🇳 Tên icon (Material/Shoelace)
  // 🇺🇸 Icon name (Material/Shoelace)
  final String c_icon;

  // 🇻🇳 Đường dẫn gốc (Base Route)
  // 🇺🇸 Base route path
  final String c_route;

  // 🇻🇳 Thứ tự hiển thị trên Sidebar
  // 🇺🇸 Display order on Sidebar
  final int c_order;

  const M_Tb_Shell_Mod({
    required this.c_mod_id,
    required this.c_title,
    required this.c_icon,
    required this.c_route,
    required this.c_order,
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
  factory M_Tb_Shell_Mod.fromJson(Map<String, dynamic> json) {
    return M_Tb_Shell_Mod(
      c_mod_id: json['c_mod_id'] as String,
      c_title: json['c_title'] as String,
      c_icon: json['c_icon'] as String,
      c_route: json['c_route'] as String,
      c_order: json['c_order'] as int,
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
      'c_mod_id': c_mod_id,
      'c_title': c_title,
      'c_icon': c_icon,
      'c_route': c_route,
      'c_order': c_order,
      ...super.toJson(),
    };
  }

  // 🇻🇳 Copy with
  // 🇺🇸 Copy with
  @override
  M_Tb_Shell_Mod copyWith({
    String? c_mod_id,
    String? c_title,
    String? c_icon,
    String? c_route,
    int? c_order,
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
    return M_Tb_Shell_Mod(
      c_mod_id: c_mod_id ?? this.c_mod_id,
      c_title: c_title ?? this.c_title,
      c_icon: c_icon ?? this.c_icon,
      c_route: c_route ?? this.c_route,
      c_order: c_order ?? this.c_order,
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
