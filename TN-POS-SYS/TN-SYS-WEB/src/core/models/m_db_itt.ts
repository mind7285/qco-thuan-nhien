// 🇻🇳 Model cơ sở với Identity (Generic)
// 🇺🇸 Base model with Identity (Generic)
import type { M_Db_Ett } from './m_db_ett';

// 🇻🇳 Model cơ sở với Identity (Generic)
// 🇺🇸 Base model with Identity (Generic)
export interface M_Db_Itm<T> extends M_Db_Ett {
  // 🇻🇳 Khóa chính của thực thể
  // 🇺🇸 Primary key of the entity
  q_id: T;
}

