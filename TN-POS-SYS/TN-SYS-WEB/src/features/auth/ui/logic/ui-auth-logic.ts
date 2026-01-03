// 🇻🇳 Logic xử lý nghiệp vụ cho Auth
// 🇺🇸 Business logic handler for Auth
import { S_Api_Auth, S_Api_Auth_Adm_Usr } from '../../services';
import type { M_Tb_Auth_Usr } from '../../data/models';
import { t } from '@/core/utils/i18n';

export class Ui_Auth_Logic {
  private authService: S_Api_Auth;
  private admUsrService: S_Api_Auth_Adm_Usr;

  constructor(authService?: S_Api_Auth, admUsrService?: S_Api_Auth_Adm_Usr) {
    this.authService = authService || new S_Api_Auth();
    this.admUsrService = admUsrService || new S_Api_Auth_Adm_Usr();
  }

  // ⚡️ Quản trị người dùng
  async getUsers(): Promise<M_Tb_Auth_Usr[]> {
    return await this.admUsrService.list();
  }

  async upsertUser(usr: M_Tb_Auth_Usr): Promise<string> {
    // 💫 Kiểm tra mật khẩu nếu có nhập (tối đa 3 ký tự theo yêu cầu)
    if (usr.c_pwd_hash && usr.c_pwd_hash.length > 3) {
      throw new Error(t('auth.pwdMaxLength'));
    }
    return await this.admUsrService.upsert(usr);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.admUsrService.delete(id);
  }

  // ⚡️ Xử lý đăng nhập
  async handleLogin(usrName: string, pwd: string): Promise<M_Tb_Auth_Usr> {
    // 💫 1. Kiểm tra hợp lệ
    if (!usrName || !pwd) {
      throw new Error('Vui lòng nhập đầy đủ thông tin');
    }

    // 💫 2. Gọi API login
    const result = await this.authService.login(usrName, pwd);

    // 💫 3. Lưu token và user data
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', result.token);
      localStorage.setItem('user_data', JSON.stringify(result.user));
      if (result.branch) {
        localStorage.setItem('branch_data', JSON.stringify(result.branch));
      }
    }

    return result.user;
  }

  // ⚡️ Xử lý đăng ký
  async handleRegister(usr: M_Tb_Auth_Usr): Promise<string> {
    // 💫 1. Kiểm tra hợp lệ
    if (!usr.c_usr_name || !usr.c_pwd_hash || !usr.c_full_name || !usr.c_email) {
      throw new Error('Vui lòng nhập đầy đủ thông tin');
    }

    // 💫 2. Kiểm tra email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usr.c_email)) {
      throw new Error('Email không hợp lệ');
    }

    // 💫 3. Gọi API register
    if (usr.c_pwd_hash.length > 3) {
      throw new Error(t('auth.pwdMaxLength'));
    }
    return await this.authService.register(usr);
  }

  // ⚡️ Xử lý quên mật khẩu
  async handleForgotPwd(email: string): Promise<boolean> {
    // 💫 1. Kiểm tra hợp lệ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email không hợp lệ');
    }

    // 💫 2. Gọi API forgot password
    return await this.authService.forgot_pwd(email);
  }

  // ⚡️ Xử lý đổi mật khẩu
  async handleChangePwd(oldPwd: string, newPwd: string, confirmPwd: string): Promise<boolean> {
    // 💫 1. Kiểm tra hợp lệ
    if (!oldPwd || !newPwd || !confirmPwd) {
      throw new Error('Vui lòng nhập đầy đủ thông tin');
    }

    if (newPwd !== confirmPwd) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }

    if (newPwd.length > 3) {
      throw new Error(t('auth.pwdMaxLength'));
    }

    // 💫 2. Gọi API change password
    return await this.authService.change_pwd(oldPwd, newPwd);
  }

  // ⚡️ Xử lý điều hướng
  navigateTo(path: string): void {
    if (typeof window !== 'undefined') {
      const router = (window as any).router;
      if (router) {
        router.navigate(path);
      } else {
        window.location.href = path;
      }
    }
  }
}

