// 🇻🇳 Model cơ sở cho tất cả các Entity trong hệ thống
// 🇺🇸 Base model for all entities in the system
export interface M_Db_Ett {
  // 🇻🇳 Trạng thái dữ liệu (0: Nháp, 1: Kích hoạt, 2: Vô hiệu hoá)
  // 🇺🇸 Data status (0: Draft, 1: Active, 2: Disabled)
  q_status: number;

  // 🇻🇳 Phiên bản của dữ liệu
  // 🇺🇸 Data version
  q_version: number;

  // 🇻🇳 Cờ đánh dấu đã xoá (Soft Delete)
  // 🇺🇸 Soft delete flag
  q_is_deleted: boolean;

  // 🇻🇳 Nguồn tạo dữ liệu
  // 🇺🇸 Data creation source
  q_created_via?: string;

  // 🇻🇳 Thời điểm tạo (Unix Time MS)
  // 🇺🇸 Creation timestamp (Unix Time MS)
  q_created_at: number;

  // 🇻🇳 ID người tạo
  // 🇺🇸 Creator ID
  q_created_by?: string;

  // 🇻🇳 Nguồn sửa dữ liệu
  // 🇺🇸 Data update source
  q_updated_via?: string;

  // 🇻🇳 Thời điểm cập nhật cuối (Unix Time MS)
  // 🇺🇸 Last update timestamp (Unix Time MS)
  q_updated_at: number;

  // 🇻🇳 ID người cập nhật cuối
  // 🇺🇸 Last updater ID
  q_updated_by?: string;

  // 🇻🇳 Ghi chú / Lý do thay đổi gần nhất
  // 🇺🇸 Note / Reason for last change
  q_updated_note?: string;

  // 🇻🇳 Nguồn xoá dữ liệu
  // 🇺🇸 Data deletion source
  q_deleted_via?: string;

  // 🇻🇳 Thời điểm xoá (Unix Time MS)
  // 🇺🇸 Deletion timestamp (Unix Time MS)
  q_deleted_at?: number;

  // 🇻🇳 ID người xoá
  // 🇺🇸 Deleter ID
  q_deleted_by?: string;

  // 🇻🇳 Ghi chú / Lý do xoá
  // 🇺🇸 Note / Reason for deletion
  q_deleted_note?: string;
}

