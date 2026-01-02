// 🇻🇳 Header chứa thông tin module, thông báo và user menu
// 🇺🇸 Header containing module information, notifications and user menu
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useI18n, type Language } from '@/core/utils/i18n';

@customElement('ui-shell-header-wgt')
export class UiShellHeaderWgt extends LitElement {
  // 🏷️ Tiêu đề module hiện tại
  @property({ type: String }) title: string = '';

  // 🌐 i18n
  private i18n = useI18n();
  @state() language: Language = this.i18n.language;

  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      height: 64px;
      background-color: var(--q-color-bg-primary, #ffffff);
      border-bottom: 1px solid var(--q-color-border, #e0e0e0);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--q-space-4, 16px);
      height: 100%;
    }

    .title {
      font-size: var(--q-font-size-lg, 18px);
      font-weight: var(--q-font-weight-semibold, 600);
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--q-space-3, 12px);
    }

    .logout-btn {
      padding: var(--q-space-2, 8px) var(--q-space-4, 16px);
      border: 1px solid var(--q-color-border, #e0e0e0);
      border-radius: var(--q-radius-md, 8px);
      background-color: var(--q-color-bg-primary, #ffffff);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .logout-btn:hover {
      background-color: var(--q-color-bg-hover, #f5f5f5);
    }
  `;

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

