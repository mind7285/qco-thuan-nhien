// 🇻🇳 Màn hình Dashboard / Trang chủ
// 🇺🇸 Dashboard / Home screen
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ui-dashboard-scn')
export class UiDashboardScn extends LitElement {
  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      padding: var(--q-space-4, 16px);
    }

    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-card {
      background: var(--q-color-bg-primary, #fff);
      border-radius: var(--q-radius-lg, 12px);
      padding: var(--q-space-6, 24px);
      margin-bottom: var(--q-space-4, 16px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .welcome-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: var(--q-space-2, 8px);
      color: var(--q-color-text-primary, #333);
    }

    .welcome-text {
      color: var(--q-color-text-secondary, #666);
      line-height: 1.6;
    }
  `;

  // 🏙️ Render
  render() {
    return html`
      <div class="dashboard-container">
        <div class="welcome-card">
          <h1 class="welcome-title">🇻🇳 Chào mừng đến với TN POS System</h1>
          <p class="welcome-text">
            🇺🇸 Welcome to TN POS System
          </p>
          <p class="welcome-text">
            Đây là màn hình Dashboard. Các tính năng đang được phát triển...
          </p>
        </div>
      </div>
    `;
  }
}

