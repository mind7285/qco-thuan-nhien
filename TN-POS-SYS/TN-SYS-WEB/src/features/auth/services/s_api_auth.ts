// 🇻🇳 API cung cấp các dịch vụ liên quan đến Authentication
// 🇺🇸 API providing authentication-related services
import { Api_Client } from '../../../core/api/api_client';
import type { M_Tb_Auth_Usr, M_Tb_Auth_Usr_Ses } from '../data/models';

export class S_Api_Auth {
  private apiClient: Api_Client;

  constructor(apiClient?: Api_Client) {
    this.apiClient = apiClient || new Api_Client();
  }

  // 🇻🇳 Đăng nhập
  // 🇺🇸 Login
  async login(usrName: string, pwd: string): Promise<M_Tb_Auth_Usr> {
    const response = await this.apiClient.post<M_Tb_Auth_Usr>('/auth/login', {
      usrName,
      pwd,
    });
    if (!response.data) {
      throw new Error('Login failed');
    }
    return response.data;
  }

  // 🇻🇳 Đăng xuất
  // 🇺🇸 Logout
  async logout(): Promise<boolean> {
    const response = await this.apiClient.post<boolean>('/auth/logout');
    return response.data ?? false;
  }

  // 🇻🇳 Đăng ký
  // 🇺🇸 Register
  async register(usr: M_Tb_Auth_Usr): Promise<string> {
    const response = await this.apiClient.post<{ id: string }>('/auth/register', usr);
    return response.data?.id || '';
  }

  // 🇻🇳 Quên mật khẩu
  // 🇺🇸 Forgot password
  async forgot_pwd(email: string): Promise<boolean> {
    const response = await this.apiClient.post<boolean>('/auth/forgot-pwd', { email });
    return response.data ?? false;
  }

  // 🇻🇳 Đổi mật khẩu
  // 🇺🇸 Change password
  async change_pwd(oldPwd: string, newPwd: string): Promise<boolean> {
    const response = await this.apiClient.post<boolean>('/auth/change-pwd', {
      oldPwd,
      newPwd,
    });
    return response.data ?? false;
  }

  // 🇻🇳 Kiểm tra quyền
  // 🇺🇸 Check permission
  async has_perm(permCode: string): Promise<boolean> {
    const response = await this.apiClient.get<boolean>(`/auth/has-perm/${permCode}`);
    return response.data ?? false;
  }
}

