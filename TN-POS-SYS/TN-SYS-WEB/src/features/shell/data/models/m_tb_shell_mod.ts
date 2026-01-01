// 🇻🇳 Model đại diện cho một Module được đăng ký trong hệ thống
// 🇺🇸 Model representing a registered module in the system
import type { M_Db_Ett } from '../../../../core/models';

export interface M_Tb_Shell_Mod extends M_Db_Ett {
  // 🇻🇳 ID định danh module (e.g., 'pos', 'inv')
  // 🇺🇸 Module identifier (e.g., 'pos', 'inv')
  c_mod_id: string;

  // 🇻🇳 Tiêu đề hiển thị của module
  // 🇺🇸 Display title of the module
  c_title: string;

  // 🇻🇳 Tên icon (Material/Shoelace)
  // 🇺🇸 Icon name (Material/Shoelace)
  c_icon: string;

  // 🇻🇳 Đường dẫn gốc (Base Route)
  // 🇺🇸 Base route path
  c_route: string;

  // 🇻🇳 Thứ tự hiển thị trên Sidebar
  // 🇺🇸 Display order on Sidebar
  c_order: number;
}

