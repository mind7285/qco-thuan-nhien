// 🇻🇳 Logic xử lý cho Module Tổ chức
// 🇺🇸 Business logic handler for Organization Module
import { S_Api_Org, type OrgNode, type UserBranchAssignment } from '../../services/s_api_org';
import { S_Api_Auth_Adm_Usr } from '../../../auth/services/s_api_auth_adm_usr';
import type { M_Tb_Auth_Usr } from '../../../auth/data/models';
import { toast } from '@/core/utils/toast';
import { t } from '@/core/utils/i18n';

export class Ui_Org_Logic {
  private orgService: S_Api_Org;
  private authAdminService: S_Api_Auth_Adm_Usr;

  constructor() {
    this.orgService = new S_Api_Org();
    this.authAdminService = new S_Api_Auth_Adm_Usr();
  }

  // 🏝️ Lấy danh sách nhân viên
  async getUsers(): Promise<M_Tb_Auth_Usr[]> {
    try {
      return await this.authAdminService.list();
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }

  // 🏝️ Lấy danh sách chi nhánh đã gán
  async getUserAssignments(usrId: string): Promise<UserBranchAssignment[]> {
    try {
      return await this.orgService.getUserBranches(usrId);
    } catch (error) {
      console.error('Failed to fetch user assignments:', error);
      return [];
    }
  }

  // 🏝️ Lấy sơ đồ tổ chức (để lấy danh sách tất cả chi nhánh)
  async getHierarchy(): Promise<OrgNode[]> {
    try {
      return await this.orgService.getHierarchy();
    } catch (error) {
      console.error('Failed to fetch org hierarchy:', error);
      return [];
    }
  }

  // 💾 Cập nhật gán chi nhánh
  async assignUserToBranch(assignment: UserBranchAssignment): Promise<boolean> {
    try {
      const success = await this.orgService.assignUserToBranch(assignment);
      if (success) {
        toast.success(t('org.assignmentSuccess'));
      }
      return success;
    } catch (error) {
      toast.error(t('auth.error'));
      return false;
    }
  }

  // --- CRUD Operations ---

  async getCompanies() { return await this.orgService.getCompanies(); }
  async upsertCompany(data: any) { 
    const res = await this.orgService.upsertCompany(data);
    if (res) toast.success(t('auth.success'));
    return res;
  }

  async getRegions() { return await this.orgService.getRegions(); }
  async upsertRegion(data: any) {
    const res = await this.orgService.upsertRegion(data);
    if (res) toast.success(t('auth.success'));
    return res;
  }

  async getBranches() { return await this.orgService.getBranches(); }
  async upsertBranch(data: any) {
    const res = await this.orgService.upsertBranch(data);
    if (res) toast.success(t('auth.success'));
    return res;
  }

  async getDepartments() { return await this.orgService.getDepartments(); }
  async upsertDepartment(data: any) {
    const res = await this.orgService.upsertDepartment(data);
    if (res) toast.success(t('auth.success'));
    return res;
  }

  async deleteEntity(type: string, id: string) {
    const res = await this.orgService.deleteEntity(type, id);
    if (res) toast.success(t('auth.success'));
    return res;
  }

  // 🏝️ Phẳng hóa cây để lấy danh sách chi nhánh
  flattenBranches(nodes: OrgNode[]): { id: string, name: string }[] {
    let branches: { id: string, name: string }[] = [];
    for (const node of nodes) {
      if (node.type === 'BRH') {
        branches.push({ id: node.id, name: node.name });
      }
      if (node.children && node.children.length > 0) {
        branches = branches.concat(this.flattenBranches(node.children));
      }
    }
    return branches;
  }
}

