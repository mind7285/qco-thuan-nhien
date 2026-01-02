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
      defaultTitle: 'Hệ thống POS',
      logout: 'Đăng xuất',
      logoutConfirm: 'Bạn có chắc muốn đăng xuất?',
    },
    // Modules (Menu items)
    modules: {
      dashboard: 'Trang chủ',
      pos: 'Bán hàng',
      inv: 'Kho hàng',
      rpt: 'Báo cáo',
      cfg: 'Cấu hình',
      auth: 'Phân quyền',
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
      defaultTitle: 'POS System',
      logout: 'Logout',
      logoutConfirm: 'Are you sure you want to logout?',
    },
    // Modules (Menu items)
    modules: {
      dashboard: 'Dashboard',
      pos: 'Point of Sale',
      inv: 'Inventory',
      rpt: 'Reports',
      cfg: 'Settings',
      auth: 'Authorization',
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

