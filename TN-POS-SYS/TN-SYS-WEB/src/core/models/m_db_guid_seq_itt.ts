// 🇻🇳 Model cơ sở với GUID Identity và Sequence
// 🇺🇸 Base model with GUID Identity and Sequence
import type { M_Db_Guid_Itm } from './m_db_guid_itt';

export interface M_Db_Guid_Seq_Itm extends M_Db_Guid_Itm {
  // 🇻🇳 Số thứ tự hệ thống (Sequence)
  // 🇺🇸 System sequence number
  q_seq: number;
}

