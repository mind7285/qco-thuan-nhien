// 🇻🇳 Màn hình Dashboard / Trang chủ
// 🇺🇸 Dashboard / Home screen
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { useI18n, type Language } from '@/core/utils/i18n';

@customElement('ui-dashboard-scn')
export class UiDashboardScn extends LitElement {
  // 🌐 i18n
  private i18n = useI18n();
  @state() language: Language = this.i18n.language;

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
      <div class="dashboard-container">
        <div class="welcome-card">
          <h1 class="welcome-title">${this.i18n.t('dashboard.welcome')}</h1>
          <p class="welcome-text">
            ${this.i18n.t('dashboard.description')}
          </p>
        </div>
      </div>
    `;
  }
}

