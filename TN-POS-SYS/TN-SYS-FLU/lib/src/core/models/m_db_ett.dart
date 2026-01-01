// 🇻🇳 Model cơ sở cho tất cả các Entity trong hệ thống
// 🇺🇸 Base model for all entities in the system

class M_Db_Ett {
  // 🇻🇳 Trạng thái dữ liệu (0: Nháp, 1: Kích hoạt, 2: Vô hiệu hoá)
  // 🇺🇸 Data status (0: Draft, 1: Active, 2: Disabled)
  final int q_status;

  // 🇻🇳 Phiên bản của dữ liệu
  // 🇺🇸 Data version
  final int q_version;

  // 🇻🇳 Cờ đánh dấu đã xoá (Soft Delete)
  // 🇺🇸 Soft delete flag
  final bool q_is_deleted;

  // 🇻🇳 Nguồn tạo dữ liệu
  // 🇺🇸 Data creation source
  final String? q_created_via;

  // 🇻🇳 Thời điểm tạo (Unix Time MS)
  // 🇺🇸 Creation timestamp (Unix Time MS)
  final int q_created_at;

  // 🇻🇳 ID người tạo
  // 🇺🇸 Creator ID
  final String? q_created_by;

  // 🇻🇳 Nguồn sửa dữ liệu
  // 🇺🇸 Data update source
  final String? q_updated_via;

  // 🇻🇳 Thời điểm cập nhật cuối (Unix Time MS)
  // 🇺🇸 Last update timestamp (Unix Time MS)
  final int q_updated_at;

  // 🇻🇳 ID người cập nhật cuối
  // 🇺🇸 Last updater ID
  final String? q_updated_by;

  // 🇻🇳 Ghi chú / Lý do thay đổi gần nhất
  // 🇺🇸 Note / Reason for last change
  final String? q_updated_note;

  // 🇻🇳 Nguồn xoá dữ liệu
  // 🇺🇸 Data deletion source
  final String? q_deleted_via;

  // 🇻🇳 Thời điểm xoá (Unix Time MS)
  // 🇺🇸 Deletion timestamp (Unix Time MS)
  final int? q_deleted_at;

  // 🇻🇳 ID người xoá
  // 🇺🇸 Deleter ID
  final String? q_deleted_by;

  // 🇻🇳 Ghi chú / Lý do xoá
  // 🇺🇸 Note / Reason for deletion
  final String? q_deleted_note;

  const M_Db_Ett({
    this.q_status = 0,
    this.q_version = 0,
    this.q_is_deleted = false,
    this.q_created_via,
    this.q_created_at = 0,
    this.q_created_by,
    this.q_updated_via,
    this.q_updated_at = 0,
    this.q_updated_by,
    this.q_updated_note,
    this.q_deleted_via,
    this.q_deleted_at,
    this.q_deleted_by,
    this.q_deleted_note,
  });

  // 🇻🇳 Tạo từ JSON
  // 🇺🇸 Create from JSON
  factory M_Db_Ett.fromJson(Map<String, dynamic> json) {
    return M_Db_Ett(
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
  Map<String, dynamic> toJson() {
    return {
      'q_status': q_status,
      'q_version': q_version,
      'q_is_deleted': q_is_deleted,
      'q_created_via': q_created_via,
      'q_created_at': q_created_at,
      'q_created_by': q_created_by,
      'q_updated_via': q_updated_via,
      'q_updated_at': q_updated_at,
      'q_updated_by': q_updated_by,
      'q_updated_note': q_updated_note,
      'q_deleted_via': q_deleted_via,
      'q_deleted_at': q_deleted_at,
      'q_deleted_by': q_deleted_by,
      'q_deleted_note': q_deleted_note,
    };
  }

  // 🇻🇳 Copy with
  // 🇺🇸 Copy with
  M_Db_Ett copyWith({
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
    return M_Db_Ett(
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
