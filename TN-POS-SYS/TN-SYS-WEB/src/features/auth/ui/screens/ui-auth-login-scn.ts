// 🇻🇳 Screen đăng nhập hệ thống
// 🇺🇸 System login screen
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';

@customElement('ui-auth-login-scn')
export class UiAuthLoginScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Auth_Logic = new Ui_Auth_Logic();

  // 🍃 Internal State
  @state() usr_name: string = '';
  @state() pwd: string = '';
  @state() is_loading: boolean = false;
  @state() errorMessage: string = '';

  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
      background-color: #f5f5f5;
    }

    .card {
      width: 100%;
      max-width: 400px;
      background: white;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .logo {
      text-align: center;
      font-size: 48px;
      margin-bottom: 24px;
    }

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 32px;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    .form-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #007bff;
    }

    .btn-primary {
      width: 100%;
      padding: 14px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
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
      margin-top: 8px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .container {
        padding: 24px;
        background-color: white;
      }

      .card {
        box-shadow: none;
        padding: 24px;
      }

      .form-input {
        padding: 14px;
      }

      .btn-primary {
        padding: 16px;
      }

      .actions {
        flex-direction: column;
        align-items: center;
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
          <div class="logo">🔐</div>
          <h2 class="title">ĐĂNG NHẬP HỆ THỐNG</h2>

          ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}

          <div class="form-group">
            <label class="form-label">Tên đăng nhập</label>
            <input
              class="form-input"
              type="text"
              .value="${this.usr_name}"
              @input="${(e: Event) => {
                this.usr_name = (e.target as HTMLInputElement).value;
              }}"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <input
              class="form-input"
              type="password"
              .value="${this.pwd}"
              @input="${(e: Event) => {
                this.pwd = (e.target as HTMLInputElement).value;
              }}"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            class="btn-primary"
            ?disabled="${this.is_loading}"
            @click="${this._onLoginClick}"
          >
            ${this.is_loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </button>

          <div class="actions">
            <a class="link" @click="${this._onForgotPwdNav}">Quên mật khẩu?</a>
            <a class="link" @click="${this._onRegisterNav}">Đăng ký ngay</a>
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

  private _onForgotPwdNav() {
    this._logic.navigateTo('/auth/forgot-pwd');
  }

  private _onRegisterNav() {
    this._logic.navigateTo('/auth/register');
  }
}

