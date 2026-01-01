// 🇻🇳 Model cơ sở cho tất cả các Entity trong hệ thống
// 🇺🇸 Base model for all entities in the system
import 'package:freezed_annotation/freezed_annotation.dart';

part 'm_db_ett.freezed.dart';
part 'm_db_ett.g.dart';

@freezed
class M_Db_Ett with _$M_Db_Ett {
  const factory M_Db_Ett({
    // 🇻🇳 Trạng thái dữ liệu (0: Nháp, 1: Kích hoạt, 2: Vô hiệu hoá)
    // 🇺🇸 Data status (0: Draft, 1: Active, 2: Disabled)
    @Default(0) required int q_status,

    // 🇻🇳 Phiên bản của dữ liệu
    // 🇺🇸 Data version
    @Default(0) required int q_version,

    // 🇻🇳 Cờ đánh dấu đã xoá (Soft Delete)
    // 🇺🇸 Soft delete flag
    @Default(false) required bool q_is_deleted,

    // 🇻🇳 Nguồn tạo dữ liệu
    // 🇺🇸 Data creation source
    String? q_created_via,

    // 🇻🇳 Thời điểm tạo (Unix Time MS)
    // 🇺🇸 Creation timestamp (Unix Time MS)
    @Default(0) required int q_created_at,

    // 🇻🇳 ID người tạo
    // 🇺🇸 Creator ID
    String? q_created_by,

    // 🇻🇳 Nguồn sửa dữ liệu
    // 🇺🇸 Data update source
    String? q_updated_via,

    // 🇻🇳 Thời điểm cập nhật cuối (Unix Time MS)
    // 🇺🇸 Last update timestamp (Unix Time MS)
    @Default(0) required int q_updated_at,

    // 🇻🇳 ID người cập nhật cuối
    // 🇺🇸 Last updater ID
    String? q_updated_by,

    // 🇻🇳 Ghi chú / Lý do thay đổi gần nhất
    // 🇺🇸 Note / Reason for last change
    String? q_updated_note,

    // 🇻🇳 Nguồn xoá dữ liệu
    // 🇺🇸 Data deletion source
    String? q_deleted_via,

    // 🇻🇳 Thời điểm xoá (Unix Time MS)
    // 🇺🇸 Deletion timestamp (Unix Time MS)
    int? q_deleted_at,

    // 🇻🇳 ID người xoá
    // 🇺🇸 Deleter ID
    String? q_deleted_by,

    // 🇻🇳 Ghi chú / Lý do xoá
    // 🇺🇸 Note / Reason for deletion
    String? q_deleted_note,
  }) = _M_Db_Ett;

  factory M_Db_Ett.fromJson(Map<String, dynamic> json) =>
      _$M_Db_EttFromJson(json);
}

