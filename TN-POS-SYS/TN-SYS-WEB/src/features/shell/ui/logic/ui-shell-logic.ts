// 🇻🇳 Logic xử lý nghiệp vụ cho Shell
// 🇺🇸 Business logic handler for Shell
import { getLanguage, t } from '@/core/utils/i18n';
import type { UiShellScn } from '../screens/ui-shell-scn';

export class Ui_Shell_Logic {
  host: UiShellScn;

  constructor(host: UiShellScn) {
    this.host = host;
  }

  // ⚡️ Xử lý điều hướng module
  async handleNav(modId: string): Promise<void> {
    // 💫 1. Cập nhật currentModule
    this.host.currentModule = modId;

    // 💫 2. Điều hướng tới đường dẫn của module
    const module = this.host.modules.find((m) => m.c_mod_id === modId);
    if (module) {
      const router = (window as any).router;
      if (router) {
        router.navigate(module.c_route);
      } else {
        window.history.pushState({}, '', module.c_route);
        this.host.requestUpdate();
      }
    }
  }

  // ⚡️ Xử lý đăng xuất
  async handleLogout(): Promise<void> {
    // 💫 1. Hiển thị hộp thoại xác nhận
    const confirmMsg = t('shell.logoutConfirm');
    const confirmed = window.confirm(confirmMsg);
    if (!confirmed) return;

    try {
      // 💫 2. Gọi API logout
      // TODO: Import và gọi Api_Auth_Usr_Logout()
      // await this.host._authService.logout();

      // 💫 3. Xoá Token và thông tin User tại local
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('branch_data');

      // 💫 4. Điều hướng về màn hình Login
      const router = (window as any).router;
      if (router) {
        router.navigate('/auth/login');
      } else {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      // TODO: Hiển thị toast error
    }
  }
}

