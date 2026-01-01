// 🇻🇳 Screen yêu cầu khôi phục mật khẩu
// 🇺🇸 Password recovery request screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';

@customElement('ui-auth-forgot-pwd-scn')
export class UiAuthForgotPwdScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Auth_Logic = new Ui_Auth_Logic();

  // 🍃 Internal State
  @state() email: string = '';
  @state() is_loading: boolean = false;
  @state() errorMessage: string = '';
  @state() successMessage: string = '';

  // 🎨 Styles (tương tự Login)
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

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #333;
    }

    .description {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-bottom: 32px;
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

    .link {
      color: #007bff;
      text-decoration: none;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      display: block;
      margin-top: 16px;
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

    .success {
      color: #28a745;
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
    }
  `;

  // 🏙️ Render
  render() {
    return html`
      <div class="container">
        <div class="card">
          <h2 class="title">Khôi phục mật khẩu</h2>
          <p class="description">
            Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.
          </p>

          ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}
          ${this.successMessage ? html`<div class="success">${this.successMessage}</div>` : ''}

          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              class="form-input"
              type="email"
              .value="${this.email}"
              @input="${(e: Event) => {
                this.email = (e.target as HTMLInputElement).value;
              }}"
              placeholder="Nhập email"
            />
          </div>

          <button
            class="btn-primary"
            ?disabled="${this.is_loading}"
            @click="${this._onSubmitClick}"
          >
            ${this.is_loading ? 'Đang xử lý...' : 'GỬI YÊU CẦU'}
          </button>

          <a class="link" @click="${this._onLoginNav}">Quay lại Đăng nhập</a>
        </div>
      </div>
    `;
  }

  // 🎨 Events
  private async _onSubmitClick() {
    this.errorMessage = '';
    this.successMessage = '';
    this.is_loading = true;

    try {
      await this._logic.handleForgotPwd(this.email);
      // 💫 4. Luôn báo thành công để bảo mật
      this.successMessage =
        'Nếu email tồn tại trong hệ thống, chúng tôi đã gửi mã khôi phục.';
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Gửi yêu cầu thất bại';
    } finally {
      this.is_loading = false;
    }
  }

  private _onLoginNav() {
    this._logic.navigateTo('/auth/login');
  }
}

