// 🇻🇳 API quản trị người dùng
// 🇺🇸 User management API
import { Api_Client } from '../../../core/api/api_client';
import type { M_Tb_Auth_Usr } from '../data/models';

export class S_Api_Auth_Adm_Usr {
  private apiClient: Api_Client;

  constructor(apiClient?: Api_Client) {
    this.apiClient = apiClient || new Api_Client();
  }

  // 🇻🇳 Lấy danh sách người dùng
  // 🇺🇸 Get user list
  async list(): Promise<M_Tb_Auth_Usr[]> {
    const response = await this.apiClient.get<M_Tb_Auth_Usr[]>('/auth/admin/users');
    return response.data || [];
  }

  // 🇻🇳 Xóa người dùng
  // 🇺🇸 Delete user
  async delete(id: string): Promise<boolean> {
    const response = await this.apiClient.delete<boolean>(`/auth/admin/users/${id}`);
    return response.data ?? false;
  }

  // 🇻🇳 Thêm/Sửa người dùng
  // 🇺🇸 Upsert user
  async upsert(usr: M_Tb_Auth_Usr): Promise<string> {
    const response = await this.apiClient.post<{ id: string }>('/auth/admin/users', usr);
    return response.data?.id || '';
  }
}

