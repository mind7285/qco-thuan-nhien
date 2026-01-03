// 🇻🇳 Screen quản lý danh sách các cấp tổ chức (CRUD)
// 🇺🇸 Organization Management Screen (CRUD)
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Org_Logic } from '../logic/ui-org-logic';
import type { OrgNode } from '../../services/s_api_org';
import { useI18n } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';
import { confirmDialog } from '@/core/utils/dialog';

@customElement('ui-org-manage-scn')
export class UiOrgManageScn extends LitElement {
  private _logic = new Ui_Org_Logic();
  private i18n = useI18n();

  @state() private _activeTab: 'CPY' | 'REG' | 'BRH' | 'DEP' = 'CPY';
  @state() private _list: OrgNode[] = [];
  @state() private _isLoading = false;
  
  // State cho Modal/Form
  @state() private _isFormOpen = false;
  @state() private _editingItem: any = null;
  
  // Dropdowns cho việc chọn cấp cha
  @state() private _companies: OrgNode[] = [];
  @state() private _regions: OrgNode[] = [];
  @state() private _branches: OrgNode[] = [];

  static styles = [
    qThemeStyles,
    css`
      :host { display: block; padding: 24px; }
      .header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
      .tabs { display: flex; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid var(--q-color-border); padding-bottom: 8px; }
      .tab { padding: 8px 16px; cursor: pointer; border-radius: 8px; transition: all 0.2s; }
      .tab:hover { background: var(--q-color-bg-hover); }
      .tab.active { background: var(--q-color-primary); color: white; }
      
      .data-table { width: 100%; border-collapse: collapse; background: var(--q-color-bg-primary); border-radius: 12px; overflow: hidden; border: 1px solid var(--q-color-border); }
      .data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--q-color-border-subtle); }
      .data-table th { background: var(--q-color-bg-secondary); font-weight: 600; }
      
      .btn { padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; border: none; }
      .btn-primary { background: var(--q-color-primary); color: white; }
      .btn-sm { padding: 4px 8px; font-size: 12px; }
      .btn-danger { background: #ef4444; color: white; }
      
      /* Modal Styles */
      .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
      .modal-content { background: var(--q-color-bg-primary); padding: 24px; border-radius: 16px; width: 90%; max-width: 500px; box-shadow: var(--q-shadow-xl); }
      .form-group { margin-bottom: 16px; }
      .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
      .form-control { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--q-color-border); background: var(--q-color-bg-secondary); color: var(--q-color-text-primary); box-sizing: border-box; }
    `
  ];

  protected async firstUpdated() {
    this._loadList();
    this._loadDropdowns();
  }

  private async _loadDropdowns() {
    const [c, r, b] = await Promise.all([
      this._logic.getCompanies(),
      this._logic.getRegions(),
      this._logic.getBranches()
    ]);
    this._companies = c;
    this._regions = r;
    this._branches = b;
  }

  private async _loadList() {
    this._isLoading = true;
    switch(this._activeTab) {
      case 'CPY': this._list = await this._logic.getCompanies(); break;
      case 'REG': this._list = await this._logic.getRegions(); break;
      case 'BRH': this._list = await this._logic.getBranches(); break;
      case 'DEP': this._list = await this._logic.getDepartments(); break;
    }
    this._isLoading = false;
  }

  private _onTabChange(tab: any) {
    this._activeTab = tab;
    this._loadList();
  }

  private _openForm(item: any = null) {
    this._editingItem = item ? { ...item } : { name: '', parent_id: '', tax_code: '', address: '', phone: '' };
    this._isFormOpen = true;
  }

  private async _onSave() {
    const data = this._editingItem;
    // Map fields to database column names
    const payload: any = { q_id: data.id || null };
    
    switch(this._activeTab) {
      case 'CPY':
        payload.c_cpy_name = data.name;
        payload.c_tax_code = data.tax_code;
        payload.c_parent_id = data.parent_id || null;
        await this._logic.upsertCompany(payload);
        break;
      case 'REG':
        payload.c_reg_name = data.name;
        payload.c_cpy_id = data.parent_id;
        await this._logic.upsertRegion(payload);
        break;
      case 'BRH':
        payload.c_brh_name = data.name;
        payload.c_reg_id = data.parent_id;
        payload.c_address = data.address;
        payload.c_phone = data.phone;
        await this._logic.upsertBranch(payload);
        break;
      case 'DEP':
        payload.c_dep_name = data.name;
        payload.c_brh_id = data.parent_id;
        await this._logic.upsertDepartment(payload);
        break;
    }
    
    this._isFormOpen = false;
    this._loadList();
    this._loadDropdowns();
  }

  private async _onDelete(id: string) {
    const ok = await confirmDialog("Bạn có chắc muốn xóa?");
    if (ok) {
      await this._logic.deleteEntity(this._activeTab, id);
      this._loadList();
      this._loadDropdowns();
    }
  }

  render() {
    return html`
      <div class="header-actions">
        <h2>Quản lý danh mục tổ chức</h2>
        <button class="btn btn-primary" @click="${() => this._openForm()}">+ Thêm mới</button>
      </div>

      <div class="tabs">
        <div class="tab ${this._activeTab === 'CPY' ? 'active' : ''}" @click="${() => this._onTabChange('CPY')}">Công ty</div>
        <div class="tab ${this._activeTab === 'REG' ? 'active' : ''}" @click="${() => this._onTabChange('REG')}">Khu vực</div>
        <div class="tab ${this._activeTab === 'BRH' ? 'active' : ''}" @click="${() => this._onTabChange('BRH')}">Chi nhánh</div>
        <div class="tab ${this._activeTab === 'DEP' ? 'active' : ''}" @click="${() => this._onTabChange('DEP')}">Phòng ban</div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Tên</th>
            ${this._activeTab === 'CPY' ? html`<th>Mã số thuế</th>` : html`<th>Cấp cha</th>`}
            <th style="width: 150px;">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${this._list.map(item => html`
            <tr>
              <td>${item.name}</td>
              <td>
                ${this._activeTab === 'CPY' ? item.tax_code : 
                  this._activeTab === 'REG' ? this._companies.find(c => c.id === item.parent_id)?.name :
                  this._activeTab === 'BRH' ? this._regions.find(r => r.id === item.parent_id)?.name :
                  this._branches.find(b => b.id === item.parent_id)?.name
                }
              </td>
              <td>
                <button class="btn btn-sm btn-primary" @click="${() => this._openForm(item)}">Sửa</button>
                <button class="btn btn-sm btn-danger" @click="${() => this._onDelete(item.id)}">Xóa</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>

      ${this._isFormOpen ? html`
        <div class="modal-overlay">
          <div class="modal-content">
            <h3>${this._editingItem.id ? 'Cập nhật' : 'Thêm mới'} ${this.i18n.t(`org.${this._activeTab.toLowerCase()}`)}</h3>
            
            <div class="form-group">
              <label>Tên</label>
              <input class="form-control" .value="${this._editingItem.name}" @input="${(e: any) => this._editingItem.name = e.target.value}">
            </div>

            ${this._activeTab === 'CPY' ? html`
              <div class="form-group">
                <label>Mã số thuế</label>
                <input class="form-control" .value="${this._editingItem.tax_code}" @input="${(e: any) => this._editingItem.tax_code = e.target.value}">
              </div>
              <div class="form-group">
                <label>Công ty mẹ (nếu có)</label>
                <select class="form-control" @change="${(e: any) => this._editingItem.parent_id = e.target.value}">
                  <option value="" ?selected="${!this._editingItem.parent_id}">-- Không có --</option>
                  ${this._companies.filter(c => c.id !== this._editingItem.id).map(c => html`
                    <option value="${c.id}" ?selected="${this._editingItem.parent_id === c.id}">${c.name}</option>
                  `)}
                </select>
              </div>
            ` : ''}

            ${this._activeTab === 'REG' ? html`
              <div class="form-group">
                <label>Thuộc công ty</label>
                <select class="form-control" @change="${(e: any) => this._editingItem.parent_id = e.target.value}">
                  <option value="" ?selected="${!this._editingItem.parent_id}">-- Chọn công ty --</option>
                  ${this._companies.map(c => html`
                    <option value="${c.id}" ?selected="${this._editingItem.parent_id === c.id}">${c.name}</option>
                  `)}
                </select>
              </div>
            ` : ''}

            ${this._activeTab === 'BRH' ? html`
              <div class="form-group">
                <label>Thuộc khu vực</label>
                <select class="form-control" @change="${(e: any) => this._editingItem.parent_id = e.target.value}">
                  <option value="" ?selected="${!this._editingItem.parent_id}">-- Chọn khu vực --</option>
                  ${this._regions.map(r => html`
                    <option value="${r.id}" ?selected="${this._editingItem.parent_id === r.id}">${r.name}</option>
                  `)}
                </select>
              </div>
              <div class="form-group">
                <label>Địa chỉ</label>
                <input class="form-control" .value="${this._editingItem.address}" @input="${(e: any) => this._editingItem.address = e.target.value}">
              </div>
              <div class="form-group">
                <label>Số điện thoại</label>
                <input class="form-control" .value="${this._editingItem.phone}" @input="${(e: any) => this._editingItem.phone = e.target.value}">
              </div>
            ` : ''}

            ${this._activeTab === 'DEP' ? html`
              <div class="form-group">
                <label>Thuộc chi nhánh</label>
                <select class="form-control" @change="${(e: any) => this._editingItem.parent_id = e.target.value}">
                  <option value="" ?selected="${!this._editingItem.parent_id}">-- Chọn chi nhánh --</option>
                  ${this._branches.map(b => html`
                    <option value="${b.id}" ?selected="${this._editingItem.parent_id === b.id}">${b.name}</option>
                  `)}
                </select>
              </div>
            ` : ''}

            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
              <button class="btn" @click="${() => this._isFormOpen = false}">Hủy</button>
              <button class="btn btn-primary" @click="${this._onSave}">Lưu</button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }
}

