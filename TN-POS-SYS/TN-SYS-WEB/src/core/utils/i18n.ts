// 🇻🇳 Internationalization (i18n) Utility
// 🇺🇸 Internationalization (i18n) Utility
export type Language = 'vi' | 'en';

// 🌐 Translations cho toàn bộ ứng dụng
export const translations = {
  vi: {
    // Common
    common: {
      loading: 'Đang tải',
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      edit: 'Sửa',
      add: 'Thêm',
    },
    // Dashboard
    dashboard: {
      welcome: 'Chào mừng đến với TN POS System',
      description: 'Đây là màn hình Dashboard. Các tính năng đang được phát triển...',
    },
    // Shell
    shell: {
      defaultTitle: '🏠 Hệ thống POS',
      logout: '🚪 Đăng xuất',
      logoutConfirm: 'Bạn có chắc muốn đăng xuất?',
      toggleMenu: 'Ẩn/Hiện menu',
      welcome: 'Xin chào',
      branch: 'Chi nhánh',
      trialBadge: 'Dùng thử',
      realBadge: 'Chính thức',
    },
    // Dialog
    dialog: {
      confirmTitle: 'Xác nhận',
      confirmDelete: 'Bạn có chắc muốn xóa?',
      yes: 'Đồng ý',
      no: 'Hủy bỏ',
    },
    // Org module
    org: {
      hierarchy: 'Sơ đồ tổ chức',
      userAssignment: 'Phân bổ nhân sự',
      company: 'Công ty',
      region: 'Khu vực',
      branch: 'Chi nhánh',
      department: 'Phòng ban',
      selectUser: 'Chọn nhân viên',
      assignedBranches: 'Chọn chi nhánh làm việc',
      isDefault: 'Mặc định',
      saveAssignment: 'Cập nhật phân bổ',
      assignmentSuccess: 'Phân bổ nhân sự thành công',
    },
    // Auth features
    auth: {
      username: 'Tên đăng nhập',
      fullName: 'Họ tên',
      password: 'Mật khẩu',
      changePwd: 'Đổi mật khẩu',
      oldPwd: 'Mật khẩu cũ',
      newPwd: 'Mật khẩu mới',
      confirmPwd: 'Xác nhận mật khẩu mới',
      success: 'Đổi mật khẩu thành công',
      error: 'Đổi mật khẩu thất bại',
      pwdMaxLength: 'Mật khẩu chỉ được phép tối đa 3 ký tự',
      submitting: 'Đang xử lý...',
      submit: 'CẬP NHẬT',
      cancel: 'HỦY',
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
      org: '🏢 Quản lý tổ chức',
      'org-manage': '📋 Danh mục tổ chức',
      'org-hierarchy': '🌳 Sơ đồ phân cấp',
      'org-user-assignment': '👥 Phân bổ nhân sự',
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
    // Common
    common: {
      loading: 'Loading',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
    },
    // Dashboard
    dashboard: {
      welcome: 'Welcome to TN POS System',
      description: 'This is the Dashboard screen. Features are under development...',
    },
    // Shell
    shell: {
      defaultTitle: '🏠 POS System',
      logout: '🚪 Logout',
      logoutConfirm: 'Are you sure you want to logout?',
      toggleMenu: 'Toggle menu',
      welcome: 'Welcome',
      branch: 'Branch',
      trialBadge: 'Trial',
      realBadge: 'Official',
    },
    // Dialog
    dialog: {
      confirmTitle: 'Confirmation',
      confirmDelete: 'Are you sure you want to delete?',
      yes: 'Yes',
      no: 'Cancel',
    },
    // Org module
    org: {
      hierarchy: 'Org Hierarchy',
      userAssignment: 'User Assignment',
      company: 'Company',
      region: 'Region',
      branch: 'Branch',
      department: 'Department',
      selectUser: 'Select Employee',
      assignedBranches: 'Select working branch',
      isDefault: 'Default',
      saveAssignment: 'Save Assignment',
      assignmentSuccess: 'Assignment updated successfully',
    },
    // Auth features
    auth: {
      username: 'Username',
      fullName: 'Full Name',
      password: 'Password',
      changePwd: 'Change Password',
      oldPwd: 'Old Password',
      newPwd: 'New Password',
      confirmPwd: 'Confirm New Password',
      success: 'Password changed successfully',
      error: 'Failed to change password',
      pwdMaxLength: 'Password must be maximum 3 characters',
      submitting: 'Processing...',
      submit: 'UPDATE',
      cancel: 'CANCEL',
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
      org: '🏢 Organization',
      'org-manage': '📋 Org Management',
      'org-hierarchy': '🌳 Org Hierarchy',
      'org-user-assignment': '👥 User Assignment',
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

