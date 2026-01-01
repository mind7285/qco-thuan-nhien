// 🇻🇳 Màn hình Settings / Cài đặt
// 🇺🇸 Settings / Configuration screen
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ui-cfg-scn')
export class UiCfgScn extends LitElement {
  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      padding: var(--q-space-4, 16px);
    }

    .cfg-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .placeholder-card {
      background: var(--q-color-bg-primary, #fff);
      border-radius: var(--q-radius-lg, 12px);
      padding: var(--q-space-6, 24px);
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .placeholder-icon {
      font-size: 4rem;
      margin-bottom: var(--q-space-4, 16px);
    }

    .placeholder-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: var(--q-space-2, 8px);
      color: var(--q-color-text-primary, #333);
    }

    .placeholder-text {
      color: var(--q-color-text-secondary, #666);
    }
  `;

  // 🏙️ Render
  render() {
    return html`
      <div class="cfg-container">
        <div class="placeholder-card">
          <div class="placeholder-icon">⚙️</div>
          <h1 class="placeholder-title">Module Cài đặt (Settings)</h1>
          <p class="placeholder-text">Tính năng đang được phát triển...</p>
        </div>
      </div>
    `;
  }
}

