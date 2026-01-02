// 🇻🇳 Internationalization (i18n) Utility
// 🇺🇸 Internationalization (i18n) Utility
export type Language = 'vi' | 'en';

// 🌐 Translations cho toàn bộ ứng dụng
export const translations = {
  vi: {
    // Dashboard
    dashboard: {
      welcome: 'Chào mừng đến với TN POS System',
      description: 'Đây là màn hình Dashboard. Các tính năng đang được phát triển...',
    },
    // Shell
    shell: {
      defaultTitle: '🏠 Hệ thống POS',
      logout: 'Đăng xuất',
      logoutConfirm: 'Bạn có chắc muốn đăng xuất?',
    },
    // Modules (Menu items)
    modules: {
      dashboard: '🏠 Tổng quan',
      pos: '🛒 Bán hàng',
      'pos-sale': '🛍️ Màn hình bán lẻ',
      'pos-orders': '🧾 Quản lý hóa đơn',
      'pos-returns': '🔄 Trả hàng / Hoàn tiền',
      inv: '📦 Kho hàng',
      'inv-products': '🏷️ Sản phẩm & Dịch vụ',
      'inv-in': '📥 Nhập kho',
      'inv-check': '📋 Kiểm kê kho',
      'inv-suppliers': '🚚 Nhà cung cấp',
      crm: '👥 Đối tác & Khách hàng',
      'crm-customers': '👤 Danh sách khách hàng',
      'crm-groups': '🏘️ Nhóm khách hàng',
      'crm-promos': '🎁 Khuyến mãi & Tích điểm',
      rpt: '📊 Báo cáo & Thống kê',
      'rpt-sales': '📈 Doanh thu & Lợi nhuận',
      'rpt-inv': '📉 Báo cáo tồn kho',
      'rpt-staff': '👨‍💼 Báo cáo nhân viên',
      cfg: '⚙️ Hệ thống',
      'cfg-gen': '🏪 Thông tin cửa hàng',
      'cfg-ui': '🎨 Giao diện',
      'cfg-ui-theme': '🌗 Đổi theme',
      'cfg-ui-lang': '🌐 Đổi ngôn ngữ',
      auth: '🔐 Tài khoản & Bảo mật',
      'auth-emps': '👥 Hồ sơ nhân viên',
      'auth-usrs': '🆔 Tài khoản hệ thống',
      'auth-roles': '🛡️ Vai trò & Quyền',
      'auth-perms': '📑 Ma trận quyền hạn',
      'auth-pwd': '🔑 Đổi mật khẩu',
      'sys-logs': '📜 Nhật ký hoạt động',
    },
  },
  en: {
    // Dashboard
    dashboard: {
      welcome: 'Welcome to TN POS System',
      description: 'This is the Dashboard screen. Features are under development...',
    },
    // Shell
    shell: {
      defaultTitle: '🏠 POS System',
      logout: 'Logout',
      logoutConfirm: 'Are you sure you want to logout?',
    },
    // Modules (Menu items)
    modules: {
      dashboard: '🏠 Overview',
      pos: '🛒 Sales',
      'pos-sale': '🛍️ Retail POS',
      'pos-orders': '🧾 Order Management',
      'pos-returns': '🔄 Returns / Refunds',
      inv: '📦 Inventory',
      'inv-products': '🏷️ Products & Services',
      'inv-in': '📥 Stock In',
      'inv-check': '📋 Stock Check',
      'inv-suppliers': '🚚 Suppliers',
      crm: '👥 Partners & Customers',
      'crm-customers': '👤 Customer List',
      'crm-groups': '🏘️ Customer Groups',
      'crm-promos': '🎁 Promos & Loyalty',
      rpt: '📊 Reports & Stats',
      'rpt-sales': '📈 Sales & Profit',
      'rpt-inv': '📉 Inventory Reports',
      'rpt-staff': '👨‍💼 Staff Reports',
      cfg: '⚙️ System',
      'cfg-gen': '🏪 Store Info',
      'cfg-ui': '🎨 Interface',
      'cfg-ui-theme': '🌗 Toggle theme',
      'cfg-ui-lang': '🌐 Switch language',
      auth: '🔐 Account & Security',
      'auth-emps': '👥 Employee Profiles',
      'auth-usrs': '🆔 System Accounts',
      'auth-roles': '🛡️ Roles & Permissions',
      'auth-perms': '📑 Permission Matrix',
      'auth-pwd': '🔑 Change Password',
      'sys-logs': '📜 System Logs',
    },
  },
};

// 🌐 Get current language from localStorage
export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'vi';
  const lang = localStorage.getItem('app_language') as Language;
  return lang === 'vi' || lang === 'en' ? lang : 'vi';
}

// 🌐 Set language to localStorage
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('app_language', lang);
  // Dispatch custom event để các component khác có thể lắng nghe và cập nhật
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
}

// 🌐 Get translation helper
export function t(key: string, lang?: Language): string {
  const currentLang = lang || getLanguage();
  const keys = key.split('.');
  let value: any = translations[currentLang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// 🌐 Translation helper function (shorthand)
export function useI18n() {
  const language = getLanguage();
  
  return {
    language,
    t: (key: string) => t(key, language),
    setLanguage,
  };
}

