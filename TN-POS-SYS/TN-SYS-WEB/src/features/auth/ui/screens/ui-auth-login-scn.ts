// 🇻🇳 Screen đăng nhập hệ thống
// 🇺🇸 System login screen
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
import { toast } from '@/core/utils/toast';
import { qLayoutStyles } from '@/core/styles/q-layout';
import { qSizeStyles } from '@/core/styles/q-size';
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
  @state() usr_name_error: string = ''; // Validation error cho username
  @state() pwd_error: string = ''; // Validation error cho password

  // 🌐 Translations
  private translations = {
    vi: {
      subtitle: 'Hệ thống bán hàng THUẦN NHIÊN',
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
      hotline: 'Hotline: 0877 501 561',
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
      hotline: 'Hotline: 0877 501 561',
    },
  };

  // 🌐 Get translation
  private t(key: keyof typeof this.translations.vi): string {
    return this.translations[this.language][key];
  }

  // 🎨 Styles
  static styles = [
    qLayoutStyles,
    qSizeStyles,
    css`
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
      background-color: white;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box; /* Padding được tính trong height */
    }

    .card {
      /* Layout utilities: q-flex-parent-column q-flex-parent-column-space-between q-gap-05x q-w-full q-flex-grow q-min-h-0 */
      /* Size utilities applied via classes in HTML */
      border-color: #e5e7eb; /* Gray-200 */
      box-sizing: border-box; /* Padding và border được tính trong width */
    }

    /* Mobile: Override desktop size classes to mobile values */
    .card.q-width-450 {
      width: 100%; /* Mobile: full width instead of 450px */
    }

    .card.q-min-h-600 {
      min-height: auto; /* Mobile: no min-height */
    }

    .card.q-max-h-720 {
      max-height: none; /* Mobile: no max-height */
    }

    .card.q-p-40 {
      padding: 24px; /* Mobile: 24px instead of 40px */
    }

    .card.q-rounded-32 {
      border-radius: 16px; /* Mobile: 16px instead of 32px */
    }

    .logo {
      text-align: center;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo img {
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

    .form-label {
      font-weight: 500;
      color: #374151; /* Gray-700 */
      font-size: 14px;
      line-height: 1.5; /* Cố định line-height để tránh giật */
      margin: 0; /* Cố định margin để tránh giật */
      padding: 0; /* Cố định padding để tránh giật */
      display: block; /* Cố định display */
      transition: color 0.2s;
      text-align: left; /* Giữ nguyên left align */
      background-color: transparent; /* Background giữ nguyên (transparent) */
    }

    .form-label.error {
      color: #ef4444; /* Red - Error color (chỉ text đỏ) */
      line-height: 1.5; /* Giữ nguyên line-height */
      margin: 0; /* Giữ nguyên margin */
      padding: 0; /* Giữ nguyên padding */
      display: block; /* Giữ nguyên display */
      text-align: left; /* Giữ nguyên left align */
      background-color: transparent; /* Background giữ nguyên (transparent) */
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
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
      border: 1px solid #d1d5db; /* Gray-300 */
      font-size: 16px;
      box-sizing: border-box;
      transition: all 0.2s;
    }


    .form-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1); /* Ring shadow */
    }

    .input-suffix {
      position: absolute;
      display: flex;
      align-items: center;
    }

    .suffix-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280; /* Gray-500 */
      font-size: 18px;
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
      background-color: #007bff;
      color: white;
      border: none;
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
      background-color: white;
      color: #007bff;
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
      cursor: pointer;
    }

    .checkbox-input {
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
    }

    .actions {
      display: flex;
      flex-direction: column; /* 📱 Mobile: Flex-Column */
      align-items: center;
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
      background-color: #fee;
      /* Size utilities: q-p-8 q-rounded-4 */
    }

    .footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
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
        box-sizing: border-box; /* Padding được tính trong height */
      }

      .card {
        background: white;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* Shadow-2XL */
        /* Layout utilities: q-flex-parent-column q-flex-parent-column-space-between q-gap-05x */
        /* Size utilities: q-width-400 q-min-h-600 q-max-h-720 q-p-40 q-rounded-32 */
        overflow: hidden;
        overflow-y: auto;
      }

      /* Desktop size overrides - apply Q-Size classes */
      .card.q-width-450 {
        width: 450px !important;
      }

      .card.q-min-h-600 {
        min-height: 600px !important;
      }

      .card.q-max-h-720 {
        max-height: 720px !important;
      }

      .card.q-p-40 {
        padding: 40px !important;
      }

      .card.q-rounded-32 {
        border-radius: 32px !important;
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
  `,
  ];

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
      <div class="container q-p-24">
        <div class="card q-flex-parent-column q-flex-parent-column-space-between q-gap-05x q-w-full q-flex-grow q-min-h-0 q-rounded-16 q-border-1 q-width-450 q-min-h-600 q-max-h-720 q-p-40 q-rounded-32">
          ${this._renderBlockA()}
          ${this._renderBlockB()}
          ${this._renderBlockZ()}
        </div>
      </div>
    `;
  }

  // 🅰️ Render Block A (Header)
  private _renderBlockA() {
    return html`
      <div class="block-a q-flex-child-column q-flex-child-column-center q-w-full q-flex-shrink-0">
        <div class="logo">
          <img src="${logoUrl}" alt="TN Logo" class="q-width-125 q-height-125" />
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
      <div class="block-b q-flex-child-column q-flex-grow q-justify-center q-w-full q-gap-05x">
        <h2 class="title">${this.t('title')}</h2>
        ${this._renderFormSection()}
        <!-- ⏸️ Tạm ẩn: Ghi nhớ đăng nhập (Browser đã hỗ trợ Remember Password) -->
        <!-- ${this._renderRememberCheckbox()} -->
        ${this._renderActionSection()}
      </div>
    `;
  }

  // 📝 Render Form Section
  private _renderFormSection() {
    return html`
      <div class="form-section q-flex-child-column q-gap-05x">
        ${this._renderUsernameInput()}
        ${this._renderPasswordInput()}
      </div>
    `;
  }

  // 👤 Render Username Input
  private _renderUsernameInput() {
    const hasError = !!this.usr_name_error;
    return html`
      <div class="form-group q-flex-child-column q-gap-02x">
        <label class="form-label ${hasError ? 'error' : ''}">${this.t('usernameLabel')}</label>
        <div class="input-wrapper">
          <span class="input-icon q-left-12">person</span>
          <input
            id="username-input"
            class="form-input q-height-50 q-py-12 q-px-40 q-rounded-8 ${this.usr_name ? 'q-pr-80' : ''}"
            type="text"
            .value="${this.usr_name}"
            @input="${(e: Event) => {
        this.usr_name = (e.target as HTMLInputElement).value;
        // Clear error khi user nhập đúng
        if (this.usr_name_error && this.usr_name.trim().length >= 3) {
          this.usr_name_error = '';
        }
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
    const hasError = !!this.pwd_error;
    return html`
      <div class="form-group q-flex-child-column q-gap-02x">
        <label class="form-label ${hasError ? 'error' : ''}">${this.t('passwordLabel')}</label>
        <div class="input-wrapper">
          <span class="input-icon q-left-12">lock</span>
          <input
            id="password-input"
            class="form-input q-height-50 q-py-12 q-px-40 q-rounded-8 ${this.pwd ? 'q-pr-100' : ''}"
            type="${this.show_password ? 'text' : 'password'}"
            .value="${this.pwd}"
            @input="${(e: Event) => {
        this.pwd = (e.target as HTMLInputElement).value;
        // Clear error khi user nhập đúng (không trim() vì password có thể có khoảng trắng hợp lệ)
        if (this.pwd_error && this.pwd.length >= 3) {
          this.pwd_error = '';
        }
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
      <div class="input-suffix q-right-12">
        <button
          class="suffix-btn q-p-4"
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
      <div class="input-suffix q-right-12 q-gap-8">
        <button
          class="suffix-btn q-p-4"
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
          class="suffix-btn q-p-4"
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
      <div class="action-section q-flex-child-column">
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
      <div class="buttons-row q-gap-16">
        <button
          class="btn-secondary q-height-60 q-rounded-24 q-border-2"
          ?disabled="${this.is_loading}"
          @click="${this._onTrialClick}"
        >
          ${this.t('trialBtn')}
        </button>
        <button
          class="btn-primary q-height-60 q-rounded-24"
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
      <div class="block-z q-flex-child-column q-flex-child-column-center q-w-full q-flex-shrink-0">
        <div class="footer q-gap-8 q-pt-24">
          <div class="footer-version">© 2026 QueenCode - v1.0.0</div>
          <div class="footer-support q-gap-4">
            <span>📞</span>
            <span>${this.t('hotline')}</span>
          </div>
          <div class="footer-lang q-gap-8 q-mt-4">
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

  // ✅ Validation
  private _validateForm(): { isValid: boolean; firstErrorField: 'username' | 'password' | null } {
    // Clear previous errors
    this.usr_name_error = '';
    this.pwd_error = '';

    let isValid = true;
    let firstErrorField: 'username' | 'password' | null = null;

    // Validate username
    if (!this.usr_name || this.usr_name.trim().length === 0) {
      this.usr_name_error = this.language === 'vi' ? 'Vui lòng nhập tên đăng nhập' : 'Please enter username';
      isValid = false;
      if (!firstErrorField) firstErrorField = 'username';
    } else if (this.usr_name.trim().length < 3) {
      this.usr_name_error = this.language === 'vi' ? 'Tên đăng nhập phải có ít nhất 3 ký tự' : 'Username must be at least 3 characters';
      isValid = false;
      if (!firstErrorField) firstErrorField = 'username';
    }

    // Validate password
    // Password không nên trim() vì có thể có khoảng trắng hợp lệ, nhưng cần check empty
    if (!this.pwd || this.pwd.length === 0) {
      this.pwd_error = this.language === 'vi' ? 'Vui lòng nhập mật khẩu' : 'Please enter password';
      isValid = false;
      if (!firstErrorField) firstErrorField = 'password';
    } else if (this.pwd.length < 3) {
      this.pwd_error = this.language === 'vi' ? 'Mật khẩu phải có ít nhất 3 ký tự' : 'Password must be at least 3 characters';
      isValid = false;
      if (!firstErrorField) firstErrorField = 'password';
    }

    // Trả về field đầu tiên có lỗi để focus sau
    return { isValid, firstErrorField };
  }

  // 🎯 Focus input khi có lỗi (chỉ focus, không select để tránh nhảy nhảy)
  private _focusInput(field: 'username' | 'password'): void {
    // Đợi DOM update và Toast hiển thị (sau khi state thay đổi)
    setTimeout(() => {
      const inputId = field === 'username' ? 'username-input' : 'password-input';
      const input = this.shadowRoot?.querySelector(`#${inputId}`) as HTMLInputElement;
      if (input) {
        input.focus(); // Chỉ focus, không select để tránh nhảy nhảy
      }
    }, 100); // Đợi Toast hiển thị xong
  }

  // 🎨 Events
  private async _onLoginClick() {
    // Validate trước khi gọi API
    const validation = this._validateForm();
    if (!validation.isValid) {
      const errorMsg = this.language === 'vi' 
        ? 'Vui lòng kiểm tra lại thông tin đăng nhập'
        : 'Please check your login information';
      toast.error(errorMsg);
      // Focus vào input đầu tiên có lỗi sau khi Toast hiển thị
      if (validation.firstErrorField) {
        this._focusInput(validation.firstErrorField);
      }
      return;
    }

    this.errorMessage = '';
    this.is_loading = true;

    try {
      await this._logic.handleLogin(this.usr_name, this.pwd);
      // 💫 5. Nếu thành công, chuyển hướng đến /home
      this._logic.navigateTo('/home');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : this.t('loginFailed');
      this.errorMessage = errorMsg; // Giữ lại để tương thích
      
      // Clear validation errors trước khi hiển thị API error
      this.usr_name_error = '';
      this.pwd_error = '';
      
      // Hiển thị Toast thay vì error message inline
      toast.error(errorMsg);
      
      // Nếu lỗi liên quan đến mật khẩu (từ API), không set pwd_error state
      // vì đây là lỗi API, không phải validation error
      // Chỉ focus vào password input để user có thể nhập lại
      this._focusInput('password');
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
