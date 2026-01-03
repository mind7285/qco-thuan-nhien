// 🇻🇳 Screen phân bổ nhân sự vào chi nhánh
// 🇺🇸 User Branch Assignment Screen
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Org_Logic } from '../logic/ui-org-logic';
import type { M_Tb_Auth_Usr } from '../../../auth/data/models';
import type { UserBranchAssignment } from '../../services/s_api_org';
import { useI18n } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';

@customElement('ui-org-usr-assign-scn')
export class UiOrgUsrAssignScn extends LitElement {
  private _logic = new Ui_Org_Logic();
  private i18n = useI18n();

  @state() private _users: M_Tb_Auth_Usr[] = [];
  @state() private _selectedUser: M_Tb_Auth_Usr | null = null;
  @state() private _allBranches: { id: string, name: string }[] = [];
  @state() private _assignments: UserBranchAssignment[] = [];
  @state() private _isLoading = false;

  static styles = [
    qThemeStyles,
    css`
      :host {
        display: block;
        padding: 24px;
        height: 100%;
        box-sizing: border-box;
      }
      .container {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 24px;
        height: calc(100vh - 120px);
      }
      .panel {
        background: var(--q-color-bg-primary);
        border-radius: 12px;
        border: 1px solid var(--q-color-border);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .panel-header {
        padding: 16px;
        border-bottom: 1px solid var(--q-color-border);
        background: var(--q-color-bg-secondary);
        font-weight: 600;
      }
      .list-container {
        flex: 1;
        overflow-y: auto;
      }
      .user-item {
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid var(--q-color-border-subtle);
        transition: background 0.2s;
      }
      .user-item:hover {
        background: var(--q-color-bg-hover);
      }
      .user-item.selected {
        background: var(--q-color-primary-light);
        color: var(--q-color-primary);
        font-weight: 500;
      }
      .assignment-table {
        width: 100%;
        border-collapse: collapse;
      }
      .assignment-table th {
        text-align: left;
        padding: 12px 16px;
        background: var(--q-color-bg-secondary);
        border-bottom: 1px solid var(--q-color-border);
      }
      .assignment-table td {
        padding: 12px 16px;
        border-bottom: 1px solid var(--q-color-border-subtle);
      }
      .empty-state {
        padding: 40px;
        text-align: center;
        color: var(--q-color-text-secondary);
      }
      .actions {
        padding: 16px;
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid var(--q-color-border);
      }
      .btn-primary {
        background: var(--q-color-primary);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `
  ];

  protected async firstUpdated() {
    this._isLoading = true;
    const [users, hierarchy] = await Promise.all([
      this._logic.getUsers(),
      this._logic.getHierarchy()
    ]);
    this._users = users;
    this._allBranches = this._logic.flattenBranches(hierarchy);
    this._isLoading = false;
  }

  private async _onUserSelect(user: M_Tb_Auth_Usr) {
    this._selectedUser = user;
    this._isLoading = true;
    this._assignments = await this._logic.getUserAssignments(user.q_id);
    this._isLoading = false;
  }

  private _isAssigned(brhId: string): boolean {
    return this._assignments.some(a => a.c_brh_id === brhId);
  }

  private _isDefault(brhId: string): boolean {
    return this._assignments.some(a => a.c_brh_id === brhId && a.c_is_default);
  }

  private async _onToggleAssign(brhId: string) {
    if (!this._selectedUser) return;

    const existing = this._assignments.find(a => a.c_brh_id === brhId);
    if (existing) {
      // Logic xóa gán - Ở SPEC SP chưa hỗ trợ xóa, chỉ có Assign (Upsert)
      // Tạm thời chỉ cho phép bật/tắt default hoặc gán thêm
    } else {
      await this._logic.assignUserToBranch({
        c_usr_id: this._selectedUser.q_id,
        c_brh_id: brhId,
        c_is_default: this._assignments.length === 0 // Nếu là chi nhánh đầu tiên, tự động là mặc định
      });
      this._assignments = await this._logic.getUserAssignments(this._selectedUser.q_id);
    }
  }

  private async _onSetDefault(brhId: string) {
    if (!this._selectedUser) return;
    
    await this._logic.assignUserToBranch({
      c_usr_id: this._selectedUser.q_id,
      c_brh_id: brhId,
      c_is_default: true
    });
    this._assignments = await this._logic.getUserAssignments(this._selectedUser.q_id);
  }

  render() {
    return html`
      <h2>${this.i18n.t('org.userAssignment')}</h2>
      
      <div class="container">
        <!-- Panel bên trái: Danh sách nhân viên -->
        <div class="panel">
          <div class="panel-header">${this.i18n.t('org.selectUser')}</div>
          <div class="list-container">
            ${this._users.map(u => html`
              <div 
                class="user-item ${this._selectedUser?.q_id === u.q_id ? 'selected' : ''}"
                @click="${() => this._onUserSelect(u)}"
              >
                <div>${u.c_full_name}</div>
                <small>@${u.c_usr_name}</small>
              </div>
            `)}
          </div>
        </div>

        <!-- Panel bên phải: Danh sách chi nhánh -->
        <div class="panel">
          <div class="panel-header">
            ${this._selectedUser ? this._selectedUser.c_full_name : this.i18n.t('org.assignedBranches')}
          </div>
          <div class="list-container">
            ${!this._selectedUser ? html`
              <div class="empty-state">${this.i18n.t('org.selectUser')}</div>
            ` : html`
              <table class="assignment-table">
                <thead>
                  <tr>
                    <th>${this.i18n.t('org.branch')}</th>
                    <th style="width: 100px; text-align: center;">Gán</th>
                    <th style="width: 100px; text-align: center;">${this.i18n.t('org.isDefault')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._allBranches.map(b => html`
                    <tr>
                      <td>${b.name}</td>
                      <td style="text-align: center;">
                        <input 
                          type="checkbox" 
                          .checked="${this._isAssigned(b.id)}"
                          @change="${() => this._onToggleAssign(b.id)}"
                        >
                      </td>
                      <td style="text-align: center;">
                        <input 
                          type="radio" 
                          name="default-branch"
                          .checked="${this._isDefault(b.id)}"
                          ?disabled="${!this._isAssigned(b.id)}"
                          @change="${() => this._onSetDefault(b.id)}"
                        >
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            `}
          </div>
        </div>
      </div>
    `;
  }
}

