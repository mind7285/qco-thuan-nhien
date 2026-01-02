// 🇻🇳 Màn hình Ma trận quyền hạn theo module
// 🇺🇸 Permission Matrix by Module screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { qThemeStyles } from '@/core/styles/q-theme';
import { qLayoutStyles } from '@/core/styles/q-layout';
import { getLanguage } from '@/core/utils/i18n';

@customElement('ui-auth-perms-scn')
export class UiAuthPermsScn extends LitElement {
  @state() private _language = getLanguage();

  static styles = [
    qThemeStyles,
    qLayoutStyles,
    css`
    :host {
      display: block;
      padding: var(--q-space-4, 16px);
    }

    .container {
      max-width: 100%;
    }

    .card {
      background: var(--q-color-bg-primary);
      border-radius: var(--q-radius-lg);
      padding: var(--q-space-6);
      box-shadow: var(--q-shadow-md);
      border: 1px solid var(--q-color-border);
    }

    .header {
      margin-bottom: var(--q-space-6);
      border-bottom: 1px solid var(--q-color-border);
      padding-bottom: var(--q-space-4);
    }

    .title {
      font-size: var(--q-font-size-2xl);
      font-weight: var(--q-font-weight-bold);
      margin: 0;
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }

    th, td {
      border: 1px solid var(--q-color-border);
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: var(--q-color-bg-secondary);
      font-weight: var(--q-font-weight-bold);
    }

    .perm-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: var(--q-radius-sm);
      font-size: var(--q-font-size-xs);
      font-weight: var(--q-font-weight-bold);
      margin-right: 4px;
      background-color: var(--q-color-primary-light);
      color: var(--q-color-primary);
    }
  `];

  render() {
    const isVi = this._language === 'vi';
    
    return html`
      <div class="container">
        <div class="card">
          <div class="header">
            <h1 class="title">📑 ${isVi ? 'Ma trận quyền hạn' : 'Permission Matrix'}</h1>
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>${isVi ? 'Module / Tính năng' : 'Module / Feature'}</th>
                  <th>${isVi ? 'Danh sách quyền' : 'Permissions List'}</th>
                  <th>${isVi ? 'Ghi chú' : 'Notes'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🛒 Bán hàng (POS)</td>
                  <td>
                    <span class="perm-badge">VIEW</span>
                    <span class="perm-badge">CREATE</span>
                    <span class="perm-badge">UPDATE</span>
                    <span class="perm-badge">PRINT</span>
                  </td>
                  <td>${isVi ? 'Các quyền liên quan đến lập hóa đơn' : 'POS billing related permissions'}</td>
                </tr>
                <tr>
                  <td>📦 Kho hàng (INV)</td>
                  <td>
                    <span class="perm-badge">VIEW</span>
                    <span class="perm-badge">CREATE</span>
                    <span class="perm-badge">UPDATE</span>
                    <span class="perm-badge">DELETE</span>
                    <span class="perm-badge">IMPORT</span>
                  </td>
                  <td>${isVi ? 'Quản lý tồn kho và sản phẩm' : 'Inventory and products management'}</td>
                </tr>
                <tr>
                  <td>🔐 Bảo mật (AUTH)</td>
                  <td>
                    <span class="perm-badge">FULL_CONTROL</span>
                  </td>
                  <td>${isVi ? 'Toàn quyền quản trị hệ thống' : 'Full administrative access'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

