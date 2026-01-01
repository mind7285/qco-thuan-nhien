// 🇻🇳 Model cơ sở với GUID Identity và Sequence
// 🇺🇸 Base model with GUID Identity and Sequence
import 'package:freezed_annotation/freezed_annotation.dart';
import 'm_db_guid_itt.dart';

part 'm_db_guid_seq_itt.freezed.dart';
part 'm_db_guid_seq_itt.g.dart';

@freezed
class M_Db_Guid_Seq_Itm with _$M_Db_Guid_Seq_Itm implements M_Db_Guid_Itm {
  const factory M_Db_Guid_Seq_Itm({
    // 🇻🇳 Khóa chính của thực thể (GUID)
    // 🇺🇸 Primary key of the entity (GUID)
    required String q_id,

    // 🇻🇳 Số thứ tự hệ thống (Sequence)
    // 🇺🇸 System sequence number
    @Default(1) required int q_seq,

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
  }) = _M_Db_Guid_Seq_Itm;

  factory M_Db_Guid_Seq_Itm.fromJson(Map<String, dynamic> json) =>
      _$M_Db_Guid_Seq_ItmFromJson(json);
}

