// 🇻🇳 Screen quản lý danh sách hồ sơ nhân viên
// 🇺🇸 Employee Profiles Management Screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
import type { M_Tb_Auth_Usr } from '../../data/models';
import { useI18n } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';
import { confirmDialog } from '@/core/utils/dialog';

@customElement('ui-auth-emp-list-scn')
export class UiAuthEmpListScn extends LitElement {
  private _logic = new Ui_Auth_Logic();
  private i18n = useI18n();

  @state() private _employees: M_Tb_Auth_Usr[] = [];
  @state() private _isLoading = false;
  @state() private _isFormOpen = false;
  @state() private _editingItem: Partial<M_Tb_Auth_Usr> = {};

  static styles = [
    qThemeStyles,
    css`
      :host { display: block; padding: 24px; }
      .header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
      
      .employee-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
      .employee-card { 
        background: var(--q-color-bg-primary); 
        border-radius: var(--q-radius-lg); 
        border: 1px solid var(--q-color-border); 
        display: flex; 
        flex-direction: column;
        transition: all 0.2s ease;
        overflow: hidden;
      }
      .employee-card:hover { 
        transform: translateY(-4px); 
        box-shadow: var(--q-shadow-lg); 
        border-color: var(--q-color-primary);
      }
      
      .card-body { padding: 20px; display: flex; gap: 16px; align-items: center; }
      .avatar { 
        width: 56px; 
        height: 56px; 
        border-radius: 50%; 
        background: var(--q-color-bg-secondary); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 24px; 
        color: var(--q-color-primary); 
        border: 2px solid var(--q-color-primary-light); 
        flex-shrink: 0;
      }
      
      .info { flex: 1; min-width: 0; }
      .name { font-size: 18px; font-weight: 700; color: var(--q-color-text-primary); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .detail { font-size: 13px; color: var(--q-color-text-secondary); margin-bottom: 2px; display: flex; align-items: center; gap: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      
      .card-footer { 
        padding: 12px 20px; 
        background: var(--q-color-bg-secondary); 
        border-top: 1px solid var(--q-color-border); 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
      }
      .id-badge { 
        font-size: 11px; 
        font-weight: 600;
        padding: 2px 8px; 
        background: var(--q-color-bg-primary); 
        border: 1px solid var(--q-color-border);
        border-radius: 4px; 
        color: var(--q-color-text-muted);
      }
      
      .actions { display: flex; gap: 8px; }
      
      .btn { padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; border: none; transition: all 0.2s; font-family: inherit; }
      .btn-primary { background: var(--q-color-primary); color: white; }
      .btn-sm { padding: 6px 12px; font-size: 12px; }
      
      .btn-ghost { 
        background: var(--q-color-bg-primary); 
        border: 1px solid var(--q-color-border);
        color: var(--q-color-text-primary);
      }
      .btn-ghost:hover {
        background: var(--q-color-bg-hover);
        border-color: var(--q-color-primary);
        color: var(--q-color-primary);
      }
      
      .btn-danger { 
        background: #fee2e2; 
        color: #ef4444; 
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn-danger:hover {
        background: #ef4444;
        color: white;
      }
      
      :host-context(.dark) .btn-danger {
        background: #450a0a;
        color: #f87171;
      }
      :host-context(.dark) .btn-danger:hover {
        background: #ef4444;
        color: white;
      }

      /* Modal Styles */
      .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
      .modal-content { background: var(--q-color-bg-primary); padding: 24px; border-radius: 16px; width: 90%; max-width: 500px; box-shadow: var(--q-shadow-xl); }
      .form-group { margin-bottom: 16px; }
      .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
      .form-control { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--q-color-border); background: var(--q-color-bg-secondary); color: var(--q-color-text-primary); box-sizing: border-box; }
    `
  ];

  protected async firstUpdated() {
    this._loadData();
  }

  private async _loadData() {
    this._isLoading = true;
    try {
      this._employees = await this._logic.getUsers();
    } catch (e) {
      console.error(e);
    } finally {
      this._isLoading = false;
    }
  }

  private _openForm(item: Partial<M_Tb_Auth_Usr> | null = null) {
    this._editingItem = item ? { ...item } : { 
      c_full_name: '', 
      c_email: '', 
      c_phone: '', 
      q_status: 1,
      c_usr_name: '',
      c_pwd_hash: '' 
    } as any;
    this._isFormOpen = true;
  }

  private async _onSave() {
    try {
      const item = this._editingItem as M_Tb_Auth_Usr;
      
      // Tự động tạo usr_name nếu trống
      if (!item.q_id && !item.c_usr_name) {
        item.c_usr_name = item.c_email?.split('@')[0] || 'emp_' + Date.now();
      }
      
      await this._logic.upsertUser(item);
      this._isFormOpen = false;
      await this._loadData();
    } catch (e: any) {
      alert(e.message || 'Lỗi khi lưu dữ liệu');
    }
  }

  private async _onDelete(id: string) {
    const ok = await confirmDialog("Bạn có chắc muốn xóa hồ sơ nhân viên này?");
    if (ok) {
      await this._logic.deleteUser(id);
      this._loadData();
    }
  }

  render() {
    return html`
      <div class="header-actions">
        <h2>${this.i18n.t('modules.auth-emps')}</h2>
        <button class="btn btn-primary" @click="${() => this._openForm()}">+ Thêm nhân viên</button>
      </div>

      ${this._isLoading ? html`<div style="text-align: center; padding: 40px;">${this.i18n.t('common.loading')}...</div>` : ''}
      
      <div class="employee-grid">
        ${this._employees.map(emp => html`
          <div class="employee-card">
            <div class="card-body">
              <div class="avatar">👤</div>
              <div class="info">
                <div class="name">${emp.c_full_name}</div>
                <div class="detail">📧 ${emp.c_email || '---'}</div>
                <div class="detail">📞 ${emp.c_phone || '---'}</div>
              </div>
            </div>
            <div class="card-footer">
              <div class="id-badge">ID: ${emp.c_usr_name}</div>
              <div class="actions">
                <button class="btn btn-sm btn-ghost" @click="${() => this._openForm(emp)}">
                  ✏️ ${this.i18n.t('common.edit')}
                </button>
                <button class="btn btn-sm btn-danger" title="${this.i18n.t('common.delete')}" @click="${() => this._onDelete(emp.q_id)}">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        `)}
      </div>

      ${this._isFormOpen ? html`
        <div class="modal-overlay">
          <div class="modal-content">
            <h3>${this._editingItem.q_id ? 'Cập nhật' : 'Thêm mới'} hồ sơ nhân viên</h3>
            
            <div class="form-group">
              <label>Họ tên đầy đủ</label>
              <input class="form-control" .value="${this._editingItem.c_full_name ?? ''}" 
                     @input="${(e: any) => { (this._editingItem as any).c_full_name = e.target.value; this.requestUpdate(); }}">
            </div>

            <div class="form-group">
              <label>${this._editingItem.q_id ? 'Đổi mật khẩu (để trống nếu không đổi)' : 'Mật khẩu mặc định'}</label>
              <input class="form-control" type="password" placeholder="•••"
                     @input="${(e: any) => { (this._editingItem as any).c_pwd_hash = e.target.value; this.requestUpdate(); }}">
            </div>

            <div class="form-group">
              <label>Email</label>
              <input class="form-control" type="email" .value="${this._editingItem.c_email ?? ''}" 
                     @input="${(e: any) => { (this._editingItem as any).c_email = e.target.value; this.requestUpdate(); }}">
            </div>

            <div class="form-group">
              <label>Số điện thoại</label>
              <input class="form-control" .value="${this._editingItem.c_phone ?? ''}" 
                     @input="${(e: any) => { (this._editingItem as any).c_phone = e.target.value; this.requestUpdate(); }}">
            </div>

            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
              <button class="btn btn-ghost" @click="${() => this._isFormOpen = false}">${this.i18n.t('common.cancel')}</button>
              <button class="btn btn-primary" @click="${this._onSave}">${this.i18n.t('common.save')}</button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }
}

