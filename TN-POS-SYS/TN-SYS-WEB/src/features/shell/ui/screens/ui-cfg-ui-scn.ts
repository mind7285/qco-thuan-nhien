// 🇻🇳 Màn hình Cài đặt Giao diện
// 🇺🇸 Interface Settings screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getTheme, toggleTheme, type Theme } from '@/core/utils/theme';
import { getLanguage, setLanguage, type Language } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';
import { qLayoutStyles } from '@/core/styles/q-layout';
import { qSizeStyles } from '@/core/styles/q-size';

@customElement('ui-cfg-ui-scn')
export class UiCfgUiScn extends LitElement {
  @state() private _theme: Theme = getTheme();
  @state() private _language: Language = getLanguage();

  static styles = [
    qThemeStyles,
    qLayoutStyles,
    qSizeStyles,
    css`
    :host {
      display: block;
      padding: var(--q-space-4, 16px);
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
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
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .section {
      margin-bottom: var(--q-space-6);
    }

    .section-title {
      font-size: var(--q-font-size-lg);
      font-weight: var(--q-font-weight-semibold);
      margin-bottom: var(--q-space-4);
      color: var(--q-color-text-primary);
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--q-space-4);
      background: var(--q-color-bg-secondary);
      border-radius: var(--q-radius-md);
    }

    .setting-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .setting-label {
      font-weight: var(--q-font-weight-medium);
    }

    .setting-desc {
      font-size: var(--q-font-size-sm);
      color: var(--q-color-text-muted);
    }

    .theme-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background-color: var(--q-color-primary);
      color: white;
      border: none;
      border-radius: var(--q-radius-md);
      cursor: pointer;
      font-weight: var(--q-font-weight-bold);
      transition: background-color 0.2s;
    }

    .theme-btn:hover {
      background-color: var(--q-color-primary-hover);
    }

    .theme-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: var(--q-font-weight-bold);
      color: var(--q-color-primary);
      min-width: 80px; /* Thêm min-width để không bị nhảy khi đổi chữ */
    }
  `];

  constructor() {
    super();
    window.addEventListener('themechange', this._onThemeChange);
    window.addEventListener('languagechange', this._onLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('themechange', this._onThemeChange);
    window.removeEventListener('languagechange', this._onLanguageChange);
  }

  private _onThemeChange = (e: Event) => {
    const event = e as CustomEvent<{ theme: Theme }>;
    this._theme = event.detail.theme;
  }

  private _onLanguageChange = (e: Event) => {
    const event = e as CustomEvent<{ language: Language }>;
    this._language = event.detail.language;
  }

  private _handleToggleTheme() {
    toggleTheme();
  }

  private _handleToggleLanguage() {
    const newLang = this._language === 'vi' ? 'en' : 'vi';
    setLanguage(newLang);
  }

  render() {
    const isVi = this._language === 'vi';
    
    return html`
      <div class="container">
        <div class="card">
          <div class="header">
            <h1 class="title">🎨 ${isVi ? 'Giao diện' : 'Interface'}</h1>
          </div>

          <div class="section">
            <h2 class="section-title">${isVi ? 'Chế độ hiển thị' : 'Display Mode'}</h2>
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-label">${isVi ? 'Chủ đề hệ thống' : 'System Theme'}</div>
                <div class="setting-desc">${isVi ? 'Thay đổi giữa giao diện Sáng và Tối' : 'Switch between Light and Dark interface'}</div>
              </div>
              <div class="q-flex-child-row q-items-center q-gap-16">
                <button class="theme-btn" @click="${this._handleToggleTheme}">
                  🌗 ${isVi ? 'Đổi theme' : 'Toggle theme'}
                </button>
                <div class="theme-status">
                  ${this._theme === 'dark' ? (isVi ? '🌙 Tối' : '🌙 Dark') : (isVi ? '☀️ Sáng' : '☀️ Light')}
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">${isVi ? 'Ngôn ngữ' : 'Language'}</h2>
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-label">${isVi ? 'Ngôn ngữ hiển thị' : 'Display Language'}</div>
                <div class="setting-desc">${isVi ? 'Chọn ngôn ngữ cho toàn bộ hệ thống' : 'Select language for the entire system'}</div>
              </div>
              <div class="q-flex-child-row q-items-center q-gap-16">
                <button class="theme-btn" @click="${this._handleToggleLanguage}">
                  🌐 ${isVi ? 'Đổi ngôn ngữ' : 'Switch Language'}
                </button>
                <div class="theme-status">
                  ${isVi ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

