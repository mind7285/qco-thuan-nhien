// 🇻🇳 Screen đăng nhập hệ thống
// 🇺🇸 System login screen
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
import { toast } from '@/core/utils/toast';
import logoUrl from '@/assets/images/core/TN-Logo.png';

@customElement('ui-auth-login-scn')
export class UiAuthLoginScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Auth_Logic = new Ui_Auth_Logic();

  // 🍃 Internal State
  @state() usr_name: string = '';
  @state() pwd: string = '';
  @state() is_loading: boolean = false;
  @state() errorMessage: string = '';
  @state() show_password: boolean = false;
  @state() is_remember: boolean = false;
  @state() language: 'vi' | 'en' = (localStorage.getItem('app_language') as 'vi' | 'en') || 'vi';

  // 🌐 Translations
  private translations = {
    vi: {
      subtitle: 'Hệ thống quản lý cửa hàng THUẦN NHIÊN',
      title: 'ĐĂNG NHẬP',
      usernameLabel: 'Tên đăng nhập',
      usernamePlaceholder: 'Nhập tên đăng nhập',
      passwordLabel: 'Mật khẩu',
      passwordPlaceholder: 'Nhập mật khẩu',
      rememberMe: 'Ghi nhớ đăng nhập',
      trialBtn: 'DÙNG THỬ',
      loginBtn: 'ĐĂNG NHẬP',
      loading: 'Đang xử lý...',
      loginFailed: 'Đăng nhập thất bại',
      clear: 'Xóa',
      showPassword: 'Hiện mật khẩu',
      hidePassword: 'Ẩn mật khẩu',
      hotline: 'Hotline: 1900 xxxx',
    },
    en: {
      subtitle: 'THUAN NHIEN Store Management System',
      title: 'LOGIN',
      usernameLabel: 'Username',
      usernamePlaceholder: 'Enter username',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password',
      rememberMe: 'Remember me',
      trialBtn: 'TRY',
      loginBtn: 'LOGIN',
      loading: 'Processing...',
      loginFailed: 'Login failed',
      clear: 'Clear',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      hotline: 'Hotline: 1900 xxxx',
    },
  };

  // 🌐 Get translation
  private t(key: keyof typeof this.translations.vi): string {
    return this.translations[this.language][key];
  }

  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      font-family: Tahoma, Verdana, Arial, sans-serif;
    }

    /* 🧱 Utility Spacers */
    .q-gap-sm { height: 15px; width: 100%; }
    .q-gap-1x { height: 25px; width: 100%; }
    .q-gap-2x { height: 50px; width: 100%; }

    /* 📱 Mobile: Full screen, white bg, scroll */
    .container {
      width: 100%;
      height: 100vh;
      padding: 24px;
      background-color: white;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box; /* Padding được tính trong height */
    }

    .card {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      border: 1px solid #e5e7eb; /* Gray-200 - Border nhẹ để tạo separation */
      border-radius: 16px; /* Bo góc nhẹ cho mobile */
    }

    .form-section {
      display: flex;
      flex-direction: column;
    }
    /* ✨ Spacer Elements - Spacing Strategy (Base 5px) */
    .q-gap-01x { height: 5px; flex-shrink: 0; }
    .q-gap-02x { height: 10px; flex-shrink: 0; }
    .q-gap-05x { height: 25px; flex-shrink: 0; }
    .q-gap-10x { height: 50px; flex-shrink: 0; }
    
    /* ✨ Layout Architecture Elements */
    .q-spacer-grow {
      flex-grow: 1;
      min-height: 25px; /* Minimum gap ensure separation */
    }

    .block-a {
      /* Header Block */
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .block-b {
      /* Body Block */
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .block-z {
      /* Footer Block */
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .form-section {
      display: flex;
      flex-direction: column;
    }

    .action-section {
      display: flex;
      flex-direction: column;
    }

    .logo {
      text-align: center;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo img {
      width: 125px; /* 5x = 125px (Mobile) */
      height: 125px;
      object-fit: contain;
    }

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      margin: 0; /* Margin handled by spacers */
      color: #333;
    }

    .subtitle {
      text-align: center;
      color: #6b7280; /* Gray-500 */
      font-size: 14px;
      margin: 0; /* Margin-Bottom: 0px */
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-weight: 500;
      color: #374151; /* Gray-700 */
      font-size: 14px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      font-size: 18px;
      color: #6b7280; /* Gray-500 */
      pointer-events: none;
      font-family: 'Material Icons', 'Material Symbols Outlined', sans-serif;
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }

    .form-input {
      width: 100%;
      height: 50px; /* All Devices: 50px */
      padding: 12px 40px 12px 40px;
      border: 1px solid #d1d5db; /* Gray-300 */
      border-radius: 8px; /* Rounded-MD */
      font-size: 16px;
      box-sizing: border-box;
      transition: all 0.2s;
    }

    .form-input.has-suffix {
      padding-right: 80px;
    }

    .form-input.has-double-suffix {
      padding-right: 100px;
    }

    .form-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1); /* Ring shadow */
    }

    .input-suffix {
      position: absolute;
      right: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .suffix-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280; /* Gray-500 */
      font-size: 18px;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    .suffix-btn:hover {
      color: #374151; /* Gray-700 */
    }

    .suffix-btn:active {
      transform: scale(0.95);
    }

    .btn-primary {
      width: 100%;
      height: 60px; /* 12x = 60px (5px * 12) */
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 24px; /* Rounded-2XL - Bo góc gấp đôi */
      font-size: 16px;
      font-weight: 700; /* Bold */
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      width: 100%;
      height: 60px; /* 12x = 60px (5px * 12) */
      background-color: white;
      color: #007bff;
      border: 2px solid #007bff;
      border-radius: 24px; /* Rounded-2XL - Bo góc gấp đôi */
      font-size: 16px;
      font-weight: 700; /* Bold */
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #f0f7ff;
    }

    .btn-secondary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .options-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0; /* No Margin */
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .checkbox-input {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #007bff;
    }

    .checkbox-label {
      font-size: 14px;
      color: #374151; /* Gray-700 */
      cursor: pointer;
      user-select: none;
    }

    .buttons-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .actions {
      display: flex;
      flex-direction: column; /* 📱 Mobile: Flex-Column */
      align-items: center;
      gap: 16px;
    }

    .link {
      color: #007bff;
      text-decoration: none;
      cursor: pointer;
      font-size: 14px;
    }

    .link:hover {
      text-decoration: underline;
    }

    .error {
      color: #dc3545;
      font-size: 14px;
      text-align: center;
      padding: 8px;
      background-color: #fee;
      border-radius: 4px;
    }

    .footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding-top: 24px;
    }

    .footer-version {
      font-size: 12px;
      color: #6b7280; /* Gray-500 */
    }

    .footer-support {
      font-size: 12px;
      color: #6b7280; /* Gray-500 */
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .footer-lang {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }

    .lang-flag {
      font-size: 20px;
      cursor: pointer;
      transition: transform 0.2s;
      opacity: 0.6;
    }

    .lang-flag:hover {
      transform: scale(1.1);
      opacity: 0.8;
    }

    .lang-flag.active {
      opacity: 1;
      transform: scale(1.15);
    }

    /* 💻 Desktop/Tablet: Gray bg, centered card */
    @media (min-width: 769px) {
      .container {
        background-color: #f3f4f6; /* Gray-100 */
        align-items: center;
        justify-content: center; 
        padding: 24px;
        box-sizing: border-box; /* Padding được tính trong height */
      }

      .card {
        width: 400px;
        min-height: 600px;
        max-height: 720px; /* Hoặc 90vh */
        background: white;
        border-radius: 32px; /* Bo cong như điện thoại */
        border: 1px solid #e5e7eb; /* Gray-200 */
        padding: 40px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* Shadow-2XL */
        display: flex;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
      }

      .logo img {
        width: 150px; /* 6x = 150px (Desktop) */
        height: 150px;
      }

      .form-input {
        height: 50px; /* All Devices: 50px */
      }

      .btn-primary {
        height: 60px; /* 12x = 60px (5px * 12) */
      }

      .btn-secondary {
        height: 60px; /* 12x = 60px (5px * 12) */
      }

      .actions {
        flex-direction: row; /* 💻 Desktop: Flex-Row */
        justify-content: space-between; /* Space-Between */
        align-items: center;
        /* margin-top: 16px; removed */
      }

      .footer {
        margin-top: auto;
      }
    }
  `;

  // ♻️ Lifecycle
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    // Autofocus vào input đầu tiên
    const firstInput = this.shadowRoot?.querySelector('.form-input') as HTMLInputElement;
    firstInput?.focus();
  }

  // 🏙️ Render
  render() {
    return html`
      <div class="container">
        <div class="card">
          ${this._renderBlockA()}
          <div class="q-spacer-grow"></div>
          ${this._renderBlockB()}
          <div class="q-spacer-grow"></div>
          ${this._renderBlockZ()}
        </div>
      </div>
    `;
  }

  // 🅰️ Render Block A (Header)
  private _renderBlockA() {
    return html`
      <div class="block-a">
        <div class="logo">
          <img src="${logoUrl}" alt="TN Logo" />
        </div>
        <p class="subtitle">${this.t('subtitle')}</p>
      </div>
    `;
  }

  // ⚠️ Render Error Message (Đã chuyển sang Toast, giữ lại để tương thích)
  private _renderErrorMessage() {
    // Không render nữa, sử dụng Toast thay thế
    return '';
  }

  // 🅱️ Render Block B (Body)
  private _renderBlockB() {
    return html`
      <div class="block-b">
        <h2 class="title">${this.t('title')}</h2>
        <div class="q-gap-05x"></div>
        ${this._renderFormSection()}
        <!-- ⏸️ Tạm ẩn: Ghi nhớ đăng nhập (Browser đã hỗ trợ Remember Password) -->
        <!-- <div class="q-gap-05x"></div> -->
        <!-- ${this._renderRememberCheckbox()} -->
        <div class="q-gap-05x"></div>
        ${this._renderActionSection()}
      </div>
    `;
  }

  // 📝 Render Form Section
  private _renderFormSection() {
    return html`
      <div class="form-section">
        ${this._renderUsernameInput()}
        <div class="q-gap-05x"></div>
        ${this._renderPasswordInput()}
      </div>
    `;
  }

  // 👤 Render Username Input
  private _renderUsernameInput() {
    return html`
      <div class="form-group">
        <label class="form-label">${this.t('usernameLabel')}</label>
        <div class="q-gap-01x"></div>
        <div class="input-wrapper">
          <span class="input-icon">person</span>
          <input
            class="form-input ${this.usr_name ? 'has-suffix' : ''}"
            type="text"
            .value="${this.usr_name}"
            @input="${(e: Event) => {
        this.usr_name = (e.target as HTMLInputElement).value;
      }}"
            placeholder="${this.t('usernamePlaceholder')}"
            autofocus
          />
          ${this.usr_name ? this._renderUsernameSuffix() : ''}
        </div>
      </div>
    `;
  }

  // 🔐 Render Password Input
  private _renderPasswordInput() {
    return html`
      <div class="form-group">
        <label class="form-label">${this.t('passwordLabel')}</label>
        <div class="q-gap-01x"></div>
        <div class="input-wrapper">
          <span class="input-icon">lock</span>
          <input
            class="form-input ${this.pwd ? 'has-double-suffix' : ''}"
            type="${this.show_password ? 'text' : 'password'}"
            .value="${this.pwd}"
            @input="${(e: Event) => {
        this.pwd = (e.target as HTMLInputElement).value;
      }}"
            placeholder="${this.t('passwordPlaceholder')}"
          />
          ${this.pwd ? this._renderPasswordSuffix() : ''}
        </div>
      </div>
    `;
  }

  // ✕ Render Username Suffix (Clear button)
  private _renderUsernameSuffix() {
    return html`
      <div class="input-suffix">
        <button
          class="suffix-btn"
          @click="${() => {
        this.usr_name = '';
      }}"
          type="button"
          title="${this.t('clear')}"
          tabindex="-1"
        >
          ✕
        </button>
      </div>
    `;
  }

  // 👁️ Render Password Suffix (Toggle visibility & Clear)
  private _renderPasswordSuffix() {
    return html`
      <div class="input-suffix">
        <button
          class="suffix-btn"
          @click="${() => {
        this.show_password = !this.show_password;
      }}"
          type="button"
          title="${this.show_password ? this.t('hidePassword') : this.t('showPassword')}"
          tabindex="-1"
        >
          👁️
        </button>
        <button
          class="suffix-btn"
          @click="${() => {
        this.pwd = '';
      }}"
          type="button"
          title="${this.t('clear')}"
          tabindex="-1"
        >
          ✕
        </button>
      </div>
    `;
  }

  // ☑️ Render Remember Checkbox
  private _renderRememberCheckbox() {
    return html`
      <div class="options-row">
        <label class="checkbox-wrapper">
          <input
            type="checkbox"
            class="checkbox-input"
            .checked="${this.is_remember}"
            @change="${(e: Event) => {
        this.is_remember = (e.target as HTMLInputElement).checked;
      }}"
          />
          <span class="checkbox-label">${this.t('rememberMe')}</span>
        </label>
      </div>
    `;
  }

  // 🎯 Render Action Section
  private _renderActionSection() {
    return html`
      <div class="action-section">
        ${this._renderButtonsRow()}
        <!-- ⏸️ Tạm ẩn: Quên mật khẩu và Đăng ký ngay -->
        <!-- <div class="q-gap-05x"></div> -->
        <!-- ${this._renderActionLinks()} -->
      </div>
    `;
  }

  // 🔘 Render Buttons Row
  private _renderButtonsRow() {
    return html`
      <div class="buttons-row">
        <button
          class="btn-secondary"
          ?disabled="${this.is_loading}"
          @click="${this._onTrialClick}"
        >
          ${this.t('trialBtn')}
        </button>
        <button
          class="btn-primary"
          ?disabled="${this.is_loading}"
          @click="${this._onLoginClick}"
        >
          ${this.is_loading ? this.t('loading') : this.t('loginBtn')}
        </button>
      </div>
    `;
  }

  // 🔗 Render Action Links
  private _renderActionLinks() {
    return html`
      <div class="actions">
        <a class="link" @click="${this._onForgotPwdNav}">Quên mật khẩu?</a>
        <a class="link" @click="${this._onRegisterNav}">Đăng ký ngay</a>
      </div>
    `;
  }

  // 💤 Render Block Z (Footer)
  private _renderBlockZ() {
    return html`
      <div class="block-z">
        <div class="footer">
          <div class="footer-version">© 2024 QueenCode - v1.0.0</div>
          <div class="footer-support">
            <span>📞</span>
            <span>${this.t('hotline')}</span>
          </div>
          <div class="footer-lang">
            <span 
              class="lang-flag ${this.language === 'vi' ? 'active' : ''}" 
              title="Tiếng Việt"
              @click="${() => this._onLanguageChange('vi')}"
            >🇻🇳</span>
            <span 
              class="lang-flag ${this.language === 'en' ? 'active' : ''}" 
              title="English"
              @click="${() => this._onLanguageChange('en')}"
            >🇺🇸</span>
          </div>
        </div>
      </div>
    `;
  }

  // 🎨 Events
  private async _onLoginClick() {
    this.errorMessage = '';
    this.is_loading = true;

    try {
      await this._logic.handleLogin(this.usr_name, this.pwd);
      // 💫 5. Nếu thành công, chuyển hướng đến /home
      this._logic.navigateTo('/home');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : this.t('loginFailed');
      this.errorMessage = errorMsg; // Giữ lại để tương thích
      // Hiển thị Toast thay vì error message inline
      toast.error(errorMsg);
    } finally {
      this.is_loading = false;
    }
  }

  // 🌐 Handle Language Change
  private _onLanguageChange(lang: 'vi' | 'en') {
    this.language = lang;
    localStorage.setItem('app_language', lang);
  }

  private _onTrialClick() {
    // 🎨 Xử lý đăng nhập dùng thử
    this.usr_name = 'trial';
    this.pwd = 'trial';
    this._onLoginClick();
  }

  private _onForgotPwdNav() {
    this._logic.navigateTo('/auth/forgot-pwd');
  }

  private _onRegisterNav() {
    this._logic.navigateTo('/auth/register');
  }
}
