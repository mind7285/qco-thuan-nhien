// 🇻🇳 Screen đăng nhập hệ thống
// 🇺🇸 System login screen
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
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

  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
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
    }

    .card {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
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
      height: 50px; /* All Devices: 50px */
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px; /* Rounded-MD */
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
      height: 50px; /* All Devices: 50px */
      background-color: white;
      color: #007bff;
      border: 2px solid #007bff;
      border-radius: 8px; /* Rounded-MD */
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
    }

    .lang-flag:hover {
      transform: scale(1.1);
    }

    /* 💻 Desktop/Tablet: Gray bg, centered card */
    @media (min-width: 769px) {
      .container {
        background-color: #f3f4f6; /* Gray-100 */
        align-items: center;
        justify-content: center;
        padding: 24px;
      }

      .card {
        width: 400px;
        min-height: 600px;
        max-height: 850px; /* Hoặc 90vh */
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
        height: 50px; /* All Devices: 50px */
      }

      .btn-secondary {
        height: 50px; /* All Devices: 50px */
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
          <div class="logo">
            <img src="${logoUrl}" alt="TN Logo" />
          </div>
          <h2 class="title">ĐĂNG NHẬP</h2>
          
          <!-- ✨ Spacer 02x (10px) -->
          <div class="q-gap-02x"></div>
          
          <p class="subtitle">Hệ thống quản lý cửa hàng THUẦN NHIÊN</p>

          ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}

          <!-- ✨ Spacer 2x (50px) -->
          <div class="q-gap-2x"></div>

          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Tên đăng nhập</label>
              <div class="input-wrapper">
                <span class="input-icon">person</span>
                <input
                  class="form-input ${this.usr_name ? 'has-suffix' : ''}"
                  type="text"
                  .value="${this.usr_name}"
                  @input="${(e: Event) => {
                    this.usr_name = (e.target as HTMLInputElement).value;
                  }}"
                  placeholder="Nhập tên đăng nhập"
                  autofocus
                />
                ${this.usr_name
                  ? html`
                      <div class="input-suffix">
                        <button
                          class="suffix-btn"
                          @click="${() => {
                            this.usr_name = '';
                          }}"
                          type="button"
                          title="Xóa"
                        >
                          ✕
                        </button>
                      </div>
                    `
                  : ''}
              </div>
            </div>

            <!-- ✨ Spacer 1x (25px) -->
            <div class="q-gap-1x"></div>

            <div class="form-group">
              <label class="form-label">Mật khẩu</label>
              <div class="input-wrapper">
                <span class="input-icon">lock</span>
                <input
                  class="form-input ${this.pwd ? 'has-double-suffix' : ''}"
                  type="${this.show_password ? 'text' : 'password'}"
                  .value="${this.pwd}"
                  @input="${(e: Event) => {
                    this.pwd = (e.target as HTMLInputElement).value;
                  }}"
                  placeholder="Nhập mật khẩu"
                />
                ${this.pwd
                  ? html`
                      <div class="input-suffix">
                        <button
                          class="suffix-btn"
                          @click="${() => {
                            this.show_password = !this.show_password;
                          }}"
                          type="button"
                          title="${this.show_password ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}"
                        >
                          👁️
                        </button>
                        <button
                          class="suffix-btn"
                          @click="${() => {
                            this.pwd = '';
                          }}"
                          type="button"
                          title="Xóa"
                        >
                          ✕
                        </button>
                      </div>
                    `
                  : ''}
              </div>
            </div>
          </div>

          <!-- ✨ Spacer 1x (25px) -->
          <div class="q-gap-1x"></div>

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
              <span class="checkbox-label">Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <!-- ✨ Spacer 1x (25px) -->
          <div class="q-gap-1x"></div>

          <div class="action-section">
            <div class="buttons-row">
              <button
                class="btn-secondary"
                ?disabled="${this.is_loading}"
                @click="${this._onTrialClick}"
              >
                DÙNG THỬ
              </button>
              <button
                class="btn-primary"
                ?disabled="${this.is_loading}"
                @click="${this._onLoginClick}"
              >
                ${this.is_loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
              </button>
            </div>

            <!-- ✨ Spacer 1x (25px) -->
            <div class="q-gap-1x"></div>

            <div class="actions">
              <a class="link" @click="${this._onForgotPwdNav}">Quên mật khẩu?</a>
              <a class="link" @click="${this._onRegisterNav}">Đăng ký ngay</a>
            </div>
          </div>

          <div class="footer">
            <div class="footer-version">© 2024 QueenCode - v1.0.0</div>
            <div class="footer-support">
              <span>📞</span>
              <span>Hotline: 1900 xxxx</span>
            </div>
            <div class="footer-lang">
              <span class="lang-flag" title="Tiếng Việt">🇻🇳</span>
              <span class="lang-flag" title="English">🇺🇸</span>
            </div>
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
      this.errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
    } finally {
      this.is_loading = false;
    }
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

