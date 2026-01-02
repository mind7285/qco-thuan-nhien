// 🇻🇳 Logic xử lý nghiệp vụ cho Auth
// 🇺🇸 Business logic handler for Auth
import { S_Api_Auth } from '../../services';
import type { M_Tb_Auth_Usr } from '../../data/models';

export class Ui_Auth_Logic {
  private authService: S_Api_Auth;

  constructor(authService?: S_Api_Auth) {
    this.authService = authService || new S_Api_Auth();
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

