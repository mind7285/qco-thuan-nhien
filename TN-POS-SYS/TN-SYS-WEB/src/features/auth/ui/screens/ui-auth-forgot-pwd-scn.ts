// 🇻🇳 Screen yêu cầu khôi phục mật khẩu
// 🇺🇸 Password recovery request screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
import { useI18n } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';

@customElement('ui-auth-forgot-pwd-scn')
export class UiAuthForgotPwdScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Auth_Logic = new Ui_Auth_Logic();
  private i18n = useI18n();

  // 🍃 Internal State
  @state() email: string = '';
  @state() is_loading: boolean = false;
  @state() errorMessage: string = '';
  @state() successMessage: string = '';

  // 🎨 Styles
  static styles = [
    qThemeStyles,
    css`
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
      background-color: var(--q-color-bg-secondary);
    }

    .card {
      width: 100%;
      max-width: 400px;
      background: var(--q-color-bg-primary);
      border-radius: var(--q-radius-lg);
      padding: 40px;
      box-shadow: var(--q-shadow-xl);
      border: 1px solid var(--q-color-border);
    }

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--q-color-text-primary);
    }

    .description {
      text-align: center;
      color: var(--q-color-text-secondary);
      font-size: 14px;
      margin-bottom: 32px;
      line-height: 1.5;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--q-color-text-primary);
    }

    .form-input {
      width: 100%;
      padding: 12px;
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-md);
      font-size: 16px;
      box-sizing: border-box;
      background: var(--q-color-bg-secondary);
      color: var(--q-color-text-primary);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--q-color-primary);
    }

    .btn-primary {
      width: 100%;
      padding: 14px;
      background-color: var(--q-color-primary);
      color: white;
      border: none;
      border-radius: var(--q-radius-md);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
      transition: opacity 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      opacity: 0.9;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .link {
      color: var(--q-color-primary);
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

    .error-msg {
      color: var(--q-color-error);
      font-size: 14px;
      margin-top: 16px;
      text-align: center;
      padding: 12px;
      background: rgba(239, 68, 68, 0.1);
      border-radius: var(--q-radius-md);
    }

    .success-msg {
      color: var(--q-color-success);
      font-size: 14px;
      margin-top: 16px;
      text-align: center;
      padding: 12px;
      background: rgba(16, 185, 129, 0.1);
      border-radius: var(--q-radius-md);
    }

    @media (max-width: 768px) {
      .container {
        padding: 24px;
        background-color: var(--q-color-bg-primary);
      }

      .card {
        box-shadow: none;
        padding: 24px;
        border: none;
      }
    }
  `];

  // 🏙️ Render
  render() {
    return html`
      <div class="container">
        <div class="card">
          <h2 class="title">Khôi phục mật khẩu</h2>
          <p class="description">
            Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.
          </p>

          ${this.errorMessage ? html`<div class="error-msg">${this.errorMessage}</div>` : ''}
          ${this.successMessage ? html`<div class="success-msg">${this.successMessage}</div>` : ''}

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

