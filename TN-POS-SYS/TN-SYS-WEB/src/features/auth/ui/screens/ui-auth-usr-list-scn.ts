// 🇻🇳 Screen quản lý danh sách tài khoản hệ thống
// 🇺🇸 System Accounts Management Screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
import type { M_Tb_Auth_Usr } from '../../data/models';
import { useI18n } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';
import { confirmDialog } from '@/core/utils/dialog';

@customElement('ui-auth-usr-list-scn')
export class UiAuthUsrListScn extends LitElement {
  private _logic = new Ui_Auth_Logic();
  private i18n = useI18n();

  @state() private _users: M_Tb_Auth_Usr[] = [];
  @state() private _isLoading = false;
  @state() private _isFormOpen = false;
  @state() private _editingItem: Partial<M_Tb_Auth_Usr> = {};

  static styles = [
    qThemeStyles,
    css`
      :host { display: block; padding: 24px; }
      .header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
      
      .data-table { width: 100%; border-collapse: collapse; background: var(--q-color-bg-primary); border-radius: 12px; overflow: hidden; border: 1px solid var(--q-color-border); }
      .data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--q-color-border-subtle); }
      .data-table th { background: var(--q-color-bg-secondary); font-weight: 600; }
      
      .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
      .status-active { background: #dcfce7; color: #16a34a; }
      .status-inactive { background: #fee2e2; color: #ef4444; }

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
      this._users = await this._logic.getUsers();
    } catch (e) {
      console.error(e);
    } finally {
      this._isLoading = false;
    }
  }

  private _openForm(item: Partial<M_Tb_Auth_Usr> | null = null) {
    this._editingItem = item ? { ...item } : { c_usr_name: '', c_full_name: '', c_email: '', c_phone: '', q_status: 1 };
    this._isFormOpen = true;
  }

  private async _onSave() {
    try {
      await this._logic.upsertUser(this._editingItem as M_Tb_Auth_Usr);
      this._isFormOpen = false;
      this._loadData();
    } catch (e: any) {
      alert(e.message);
    }
  }

  private async _onDelete(id: string) {
    const ok = await confirmDialog(this.i18n.t('dialog.confirmDelete') || "Bạn có chắc muốn xóa tài khoản này?");
    if (ok) {
      await this._logic.deleteUser(id);
      this._loadData();
    }
  }

  render() {
    return html`
      <div class="header-actions">
        <h2>${this.i18n.t('modules.auth-usrs')}</h2>
        <button class="btn btn-primary" @click="${() => this._openForm()}">+ ${this.i18n.t('common.add')}</button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>${this.i18n.t('auth.username') || 'Tên đăng nhập'}</th>
            <th>${this.i18n.t('auth.fullName') || 'Họ tên'}</th>
            <th>Email / SĐT</th>
            <th>Trạng thái</th>
            <th style="width: 150px;">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${this._isLoading ? html`<tr><td colspan="5" style="text-align: center;">${this.i18n.t('common.loading')}...</td></tr>` : ''}
          ${!this._isLoading && this._users.length === 0 ? html`<tr><td colspan="5" style="text-align: center;">Không có dữ liệu</td></tr>` : ''}
          ${this._users.map(u => html`
            <tr>
              <td><strong>${u.c_usr_name}</strong></td>
              <td>${u.c_full_name}</td>
              <td>
                <div style="font-size: 12px; color: var(--q-color-text-secondary)">${u.c_email}</div>
                <div style="font-size: 12px; color: var(--q-color-text-secondary)">${u.c_phone}</div>
              </td>
              <td>
                <span class="status-badge ${u.q_status === 1 ? 'status-active' : 'status-inactive'}">
                  ${u.q_status === 1 ? 'Hoạt động' : 'Khóa'}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-ghost" @click="${() => this._openForm(u)}">
                  ✏️ ${this.i18n.t('common.edit')}
                </button>
                <button class="btn btn-sm btn-danger" @click="${() => this._onDelete(u.q_id)}">
                  🗑️ ${this.i18n.t('common.delete')}
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>

      ${this._isFormOpen ? html`
        <div class="modal-overlay">
          <div class="modal-content">
            <h3>${this._editingItem.q_id ? 'Cập nhật' : 'Thêm mới'} tài khoản</h3>
            
            <div class="form-group">
              <label>Tên đăng nhập</label>
              <input class="form-control" .value="${this._editingItem.c_usr_name ?? ''}" 
                     ?readonly="${!!this._editingItem.q_id}"
                     @input="${(e: any) => this._editingItem.c_usr_name = e.target.value}">
            </div>

            <div class="form-group">
              <label>${this._editingItem.q_id ? 'Đổi mật khẩu (để trống nếu không đổi)' : 'Mật khẩu mặc định'}</label>
              <input class="form-control" type="password" placeholder="•••"
                     @input="${(e: any) => (this._editingItem as any).c_pwd_hash = e.target.value}">
            </div>

            <div class="form-group">
              <label>Họ tên đầy đủ</label>
              <input class="form-control" .value="${this._editingItem.c_full_name ?? ''}" 
                     @input="${(e: any) => this._editingItem.c_full_name = e.target.value}">
            </div>

            <div class="form-group">
              <label>Email</label>
              <input class="form-control" type="email" .value="${this._editingItem.c_email ?? ''}" 
                     @input="${(e: any) => this._editingItem.c_email = e.target.value}">
            </div>

            <div class="form-group">
              <label>Số điện thoại</label>
              <input class="form-control" .value="${this._editingItem.c_phone ?? ''}" 
                     @input="${(e: any) => this._editingItem.c_phone = e.target.value}">
            </div>

            <div class="form-group">
              <label>Trạng thái</label>
              <select class="form-control" @change="${(e: any) => this._editingItem.q_status = parseInt(e.target.value)}">
                <option value="1" ?selected="${this._editingItem.q_status === 1}">Hoạt động</option>
                <option value="0" ?selected="${this._editingItem.q_status === 0}">Khóa</option>
              </select>
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

