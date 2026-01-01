// 🇻🇳 Model cơ sở với GUID Identity
// 🇺🇸 Base model with GUID Identity
import type { M_Db_Itm } from './m_db_itt';

export interface M_Db_Guid_Itm extends M_Db_Itm<string> {
  // q_id: string (inherited from M_Db_Itm<string>)
}

