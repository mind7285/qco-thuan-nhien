// 🇻🇳 API quản trị vai trò và phân quyền
// 🇺🇸 Role and permission management API
import { Api_Client } from '../../../core/api/api_client';
import type { M_Tb_Auth_Role } from '../data/models';

export class S_Api_Auth_Adm_Role {
  private apiClient: Api_Client;

  constructor(apiClient?: Api_Client) {
    this.apiClient = apiClient || new Api_Client();
  }

  // 🇻🇳 Lấy danh sách vai trò
  // 🇺🇸 Get role list
  async list(): Promise<M_Tb_Auth_Role[]> {
    const response = await this.apiClient.get<M_Tb_Auth_Role[]>('/auth/admin/roles');
    return response.data || [];
  }

  // 🇻🇳 Xóa vai trò
  // 🇺🇸 Delete role
  async delete(id: string): Promise<boolean> {
    const response = await this.apiClient.delete<boolean>(`/auth/admin/roles/${id}`);
    return response.data ?? false;
  }

  // 🇻🇳 Thêm/Sửa vai trò
  // 🇺🇸 Upsert role
  async upsert(role: M_Tb_Auth_Role): Promise<string> {
    const response = await this.apiClient.post<{ id: string }>('/auth/admin/roles', role);
    return response.data?.id || '';
  }

  // 🇻🇳 Lưu phân quyền cho vai trò
  // 🇺🇸 Save permissions for role
  async save_perms(roleId: string, permIds: string[]): Promise<boolean> {
    const response = await this.apiClient.post<boolean>('/auth/admin/roles/perms', {
      roleId,
      permIds,
    });
    return response.data ?? false;
  }
}

