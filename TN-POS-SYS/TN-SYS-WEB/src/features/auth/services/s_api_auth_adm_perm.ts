// 🇻🇳 API quản trị quyền hạn hệ thống
// 🇺🇸 System permissions management API
import { Api_Client } from '../../../core/api/api_client';
import type { M_Tb_Auth_Mod } from '../data/models';

export class S_Api_Auth_Adm_Perm {
  private apiClient: Api_Client;

  constructor(apiClient?: Api_Client) {
    this.apiClient = apiClient || new Api_Client();
  }

  // 🇻🇳 Đồng bộ quyền từ code
  // 🇺🇸 Sync permissions from code
  async sync(): Promise<boolean> {
    const response = await this.apiClient.post<boolean>('/auth/admin/perms/sync');
    return response.data ?? false;
  }

  // 🇻🇳 Lấy danh sách quyền
  // 🇺🇸 Get permission list
  async list(): Promise<M_Tb_Auth_Mod[]> {
    const response = await this.apiClient.get<M_Tb_Auth_Mod[]>('/auth/admin/perms');
    return response.data || [];
  }
}

