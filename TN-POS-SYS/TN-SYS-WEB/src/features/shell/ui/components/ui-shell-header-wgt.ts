// 🇻🇳 Header chứa thông tin module, thông báo và user menu
// 🇺🇸 Header containing module information, notifications and user menu
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useI18n, type Language } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';

@customElement('ui-shell-header-wgt')
export class UiShellHeaderWgt extends LitElement {
  // 🏷️ Tiêu đề module hiện tại
  @property({ type: String }) title: string = '';

  // 👤 Tên người dùng đang đăng nhập
  @property({ type: String }) userName: string = '';

  // 🏪 Tên chi nhánh
  @property({ type: String }) branchName: string = '';

  // 🌐 i18n
  private i18n = useI18n();
  @state() language: Language = this.i18n.language;

  // 🎨 Styles
  static styles = [
    qThemeStyles,
    css`
    :host {
      display: block;
      height: 64px;
      background-color: var(--q-color-bg-primary);
      border-bottom: 1px solid var(--q-color-border);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--q-space-4, 16px);
      height: 100%;
    }

    .title {
      font-size: var(--q-font-size-lg);
      font-weight: var(--q-font-weight-semibold);
      color: var(--q-color-text-primary);
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--q-space-4, 16px);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: var(--q-space-2, 8px);
      color: var(--q-color-text-secondary);
      font-size: var(--q-font-size-sm);
    }

    .user-name {
      font-weight: var(--q-font-weight-medium);
      color: var(--q-color-text-primary);
    }

    .branch-info {
      display: flex;
      align-items: center;
      gap: var(--q-space-2, 8px);
      padding: var(--q-space-1, 4px) var(--q-space-3, 12px);
      background-color: var(--q-color-bg-secondary);
      color: var(--q-color-text-primary);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-full);
      font-size: var(--q-font-size-sm);
      font-weight: var(--q-font-weight-bold);
    }

    .logout-btn {
      padding: var(--q-space-2, 8px) var(--q-space-4, 16px);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-md);
      background-color: var(--q-color-bg-primary);
      color: var(--q-color-text-primary);
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
      font-family: var(--q-font-family);
      font-size: var(--q-font-size-base);
    }

    .logout-btn:hover {
      background-color: var(--q-color-bg-hover);
    }
  `];

  // ♻️ Lifecycle
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    // Listen to language change events
    window.addEventListener('languagechange', this._onLanguageChange);
    // Update language from localStorage
    this.language = this.i18n.language;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('languagechange', this._onLanguageChange);
  }

  // 🌐 Handle language change
  private _onLanguageChange = (e: Event) => {
    const event = e as CustomEvent<{ language: Language }>;
    this.language = event.detail.language;
    this.i18n = useI18n(); // Re-initialize i18n
  };

  // 🏙️ Render
  render() {
    return html`
      <div class="header">
        <div class="title">${this.title || this.i18n.t('shell.defaultTitle')}</div>
        <div class="actions">
          ${this.branchName ? html`
            <div class="branch-info">
              <span>🏪</span>
              <span>${this.branchName}</span>
            </div>
          ` : ''}
          ${this.userName ? html`
            <div class="user-info">
              <span>👤</span>
              <span class="user-name">${this.userName}</span>
            </div>
          ` : ''}
          <button class="logout-btn" @click="${this._onLogout}">
            ${this.i18n.t('shell.logout')}
          </button>
        </div>
      </div>
    `;
  }

  // 🎨 Events
  private _onLogout() {
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

