// 🇻🇳 Screen đăng ký tài khoản mới
// 🇺🇸 New account registration screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
import type { M_Tb_Auth_Usr } from '../../data/models';
import { useI18n } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';

@customElement('ui-auth-register-scn')
export class UiAuthRegisterScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Auth_Logic = new Ui_Auth_Logic();
  private i18n = useI18n();

  // 🍃 Internal State
  @state() usr_name: string = '';
  @state() pwd: string = '';
  @state() full_name: string = '';
  @state() email: string = '';
  @state() is_loading: boolean = false;
  @state() errorMessage: string = '';

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
      margin-bottom: 32px;
      color: var(--q-color-text-primary);
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

    .btn-success {
      width: 100%;
      padding: 14px;
      background-color: var(--q-color-success);
      color: white;
      border: none;
      border-radius: var(--q-radius-md);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
      transition: opacity 0.2s;
    }

    .btn-success:hover:not(:disabled) {
      opacity: 0.9;
    }

    .btn-success:disabled {
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
      margin-top: 8px;
      text-align: center;
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
          <h2 class="title">Đăng ký tài khoản</h2>

          ${this.errorMessage ? html`<div class="error-msg">${this.errorMessage}</div>` : ''}

          <div class="form-group">
            <label class="form-label">Họ và tên</label>
            <input
              class="form-input"
              type="text"
              .value="${this.full_name}"
              @input="${(e: Event) => {
                this.full_name = (e.target as HTMLInputElement).value;
              }}"
              placeholder="Nhập họ và tên"
            />
          </div>

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
              placeholder="•••"
            />
          </div>

          <button
            class="btn-success"
            ?disabled="${this.is_loading}"
            @click="${this._onRegisterClick}"
          >
            ${this.is_loading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
          </button>

          <a class="link" @click="${this._onLoginNav}">Đã có tài khoản? Đăng nhập</a>
        </div>
      </div>
    `;
  }

  // 🎨 Events
  private async _onRegisterClick() {
    this.errorMessage = '';
    this.is_loading = true;

    try {
      // 💫 Mapping dữ liệu
      const usr: Partial<M_Tb_Auth_Usr> = {
        c_usr_name: this.usr_name,
        c_pwd_hash: this.pwd, // TODO: Hash password trước khi gửi
        c_full_name: this.full_name,
        c_email: this.email,
      };

      await this._logic.handleRegister(usr as M_Tb_Auth_Usr);
      // 💫 5. Nếu thành công, chuyển hướng đến /auth/login
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      this._logic.navigateTo('/auth/login');
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại';
    } finally {
      this.is_loading = false;
    }
  }

  private _onLoginNav() {
    this._logic.navigateTo('/auth/login');
  }
}

