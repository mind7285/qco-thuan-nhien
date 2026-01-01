// 🇻🇳 Danh sách quyền hạn (hành động chi tiết)
// 🇺🇸 List of permissions (detailed actions)
import '../../../../core/models/m_db_guid_seq_itt.dart';

class M_Tb_Auth_Perm extends M_Db_Guid_Seq_Itm {
  // 🇻🇳 Tên quyền hiển thị
  // 🇺🇸 Display permission name
  final String c_perm_name;

  // 🇻🇳 Mã quyền (e.g., VIEW, ADD, EDIT, DEL)
  // 🇺🇸 Permission code (e.g., VIEW, ADD, EDIT, DEL)
  final String c_perm_code;

  const M_Tb_Auth_Perm({
    required super.q_id,
    super.q_seq = 1,
    required this.c_perm_name,
    required this.c_perm_code,
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
  factory M_Tb_Auth_Perm.fromJson(Map<String, dynamic> json) {
    return M_Tb_Auth_Perm(
      q_id: json['q_id'] as String,
      q_seq: json['q_seq'] as int? ?? 1,
      c_perm_name: json['c_perm_name'] as String,
      c_perm_code: json['c_perm_code'] as String,
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
      'c_perm_name': c_perm_name,
      'c_perm_code': c_perm_code,
      ...super.toJson(),
    };
  }

  // 🇻🇳 Copy with
  // 🇺🇸 Copy with
  @override
  M_Tb_Auth_Perm copyWith({
    String? q_id,
    int? q_seq,
    String? c_perm_name,
    String? c_perm_code,
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
    return M_Tb_Auth_Perm(
      q_id: q_id ?? this.q_id,
      q_seq: q_seq ?? this.q_seq,
      c_perm_name: c_perm_name ?? this.c_perm_name,
      c_perm_code: c_perm_code ?? this.c_perm_code,
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
