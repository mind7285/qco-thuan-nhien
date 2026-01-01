// 🇻🇳 Dịch vụ cung cấp thông tin cấu hình và đăng ký module cho Shell
// 🇺🇸 Service providing configuration and module registry information for Shell
import { Api_Client } from '../../../core/api/api_client';
import type { M_Tb_Shell_Mod } from '../data/models';

export class S_Api_Shell {
  private apiClient: Api_Client;

  constructor(apiClient?: Api_Client) {
    this.apiClient = apiClient || new Api_Client();
  }

  // 🇻🇳 Lấy danh sách module đăng ký
  // 🇺🇸 Get registered modules list
  async get_registry(): Promise<M_Tb_Shell_Mod[]> {
    const response = await this.apiClient.get<M_Tb_Shell_Mod[]>('/shell/registry');
    return response.data || [];
  }

  // 🇻🇳 Lấy cấu hình hệ thống
  // 🇺🇸 Get system configuration
  async get_sys_cfg(): Promise<Record<string, unknown>> {
    const response = await this.apiClient.get<Record<string, unknown>>('/shell/config');
    return response.data || {};
  }
}

