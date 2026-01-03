// 🇻🇳 API cung cấp các dịch vụ liên quan đến Tổ chức
// 🇺🇸 API providing organization-related services
import { Api_Client } from '../../../core/api/api_client';

export interface OrgNode {
  id: string;
  name: string;
  type: 'CPY' | 'REG' | 'BRH' | 'DEP';
  children: OrgNode[];
  parent_id?: string;
  tax_code?: string;
  address?: string;
  phone?: string;
}

export interface UserBranchAssignment {
  c_usr_id: string;
  c_brh_id: string;
  c_brh_name?: string;
  c_is_default: boolean;
}

export class S_Api_Org {
  private apiClient: Api_Client;

  constructor(apiClient?: Api_Client) {
    this.apiClient = apiClient || new Api_Client();
  }

  // 🇻🇳 Lấy sơ đồ tổ chức
  // 🇺🇸 Get organization hierarchy
  async getHierarchy(): Promise<OrgNode[]> {
    const response = await this.apiClient.get<OrgNode[]>('/org/hierarchy');
    return response.data ?? [];
  }

  // 🇻🇳 Quản lý Công ty
  async getCompanies(): Promise<OrgNode[]> {
    const response = await this.apiClient.get<any[]>('/org/companies');
    return (response.data ?? []).map(c => ({ id: c.q_id, name: c.c_cpy_name, type: 'CPY', tax_code: c.c_tax_code, parent_id: c.c_parent_id, children: [] }));
  }
  async upsertCompany(cpy: any): Promise<string> {
    const response = await this.apiClient.post<{ data: string }>('/org/companies', cpy);
    return response.data?.data || '';
  }

  // 🇻🇳 Quản lý Khu vực
  async getRegions(): Promise<OrgNode[]> {
    const response = await this.apiClient.get<any[]>('/org/regions');
    return (response.data ?? []).map(r => ({ id: r.q_id, name: r.c_reg_name, type: 'REG', parent_id: r.c_cpy_id, children: [] }));
  }
  async upsertRegion(reg: any): Promise<string> {
    const response = await this.apiClient.post<{ data: string }>('/org/regions', reg);
    return response.data?.data || '';
  }

  // 🇻🇳 Quản lý Chi nhánh
  async getBranches(): Promise<OrgNode[]> {
    const response = await this.apiClient.get<any[]>('/org/branches');
    return (response.data ?? []).map(b => ({ id: b.q_id, name: b.c_brh_name, type: 'BRH', parent_id: b.c_reg_id, address: b.c_address, phone: b.c_phone, children: [] }));
  }
  async upsertBranch(brh: any): Promise<string> {
    const response = await this.apiClient.post<{ data: string }>('/org/branches', brh);
    return response.data?.data || '';
  }

  // 🇻🇳 Quản lý Phòng ban
  async getDepartments(): Promise<OrgNode[]> {
    const response = await this.apiClient.get<any[]>('/org/departments');
    return (response.data ?? []).map(d => ({ id: d.q_id, name: d.c_dep_name, type: 'DEP', parent_id: d.c_brh_id, children: [] }));
  }
  async upsertDepartment(dep: any): Promise<string> {
    const response = await this.apiClient.post<{ data: string }>('/org/departments', dep);
    return response.data?.data || '';
  }

  // 🇻🇳 Xóa thực thể
  async deleteEntity(type: string, id: string): Promise<boolean> {
    const tableMap: Record<string, string> = { 'CPY': 'cpy', 'REG': 'reg', 'BRH': 'brh', 'DEP': 'dep' };
    const response = await this.apiClient.delete<boolean>(`/org/${tableMap[type]}/${id}`);
    return response.data ?? false;
  }

  // 🇻🇳 Lấy danh sách chi nhánh của người dùng
  // 🇺🇸 Get branches assigned to a user
  async getUserBranches(usrId: string): Promise<UserBranchAssignment[]> {
    const response = await this.apiClient.get<UserBranchAssignment[]>(`/org/user-branch/${usrId}`);
    return response.data ?? [];
  }

  // 🇻🇳 Gán nhân viên vào chi nhánh
  // 🇺🇸 Assign user to branch
  async assignUserToBranch(assignment: UserBranchAssignment): Promise<boolean> {
    const response = await this.apiClient.post<boolean>('/org/user-branch/assign', assignment);
    return response.data ?? false;
  }
}

