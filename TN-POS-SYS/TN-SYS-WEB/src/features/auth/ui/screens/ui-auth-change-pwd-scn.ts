// 🇻🇳 Screen đổi mật khẩu
// 🇺🇸 Change password screen
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Auth_Logic } from '../logic/ui-auth-logic';
import { useI18n } from '@/core/utils/i18n';

@customElement('ui-auth-change-pwd-scn')
export class UiAuthChangePwdScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Auth_Logic = new Ui_Auth_Logic();

  // 🌐 i18n
  private i18n = useI18n();

  // 🍃 Internal State
  @state() oldPwd: string = '';
  @state() newPwd: string = '';
  @state() confirmPwd: string = '';
  @state() is_loading: boolean = false;
  @state() errorMessage: string = '';
  @state() successMessage: string = '';

  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      padding: var(--q-space-6, 24px);
    }

    .container {
      max-width: 500px;
      margin: 0 auto;
      background: var(--q-color-bg-primary);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-lg);
      padding: var(--q-space-8, 32px);
      box-shadow: var(--q-shadow-md);
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: var(--q-space-4, 16px);
      right: var(--q-space-4, 16px);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: var(--q-color-text-muted);
      font-size: 20px;
      cursor: pointer;
      border-radius: var(--q-radius-full);
      transition: all 0.2s;
    }

    .close-btn:hover {
      background-color: var(--q-color-bg-hover);
      color: var(--q-color-text-primary);
    }

    .title {
      font-size: var(--q-font-size-2xl);
      font-weight: var(--q-font-weight-bold);
      margin-bottom: var(--q-space-2, 8px);
      color: var(--q-color-text-primary);
    }

    .description {
      color: var(--q-color-text-secondary);
      font-size: var(--q-font-size-sm);
      margin-bottom: var(--q-space-8, 32px);
    }

    .form-group {
      margin-bottom: var(--q-space-5, 20px);
    }

    .form-label {
      display: block;
      margin-bottom: var(--q-space-2, 8px);
      font-weight: var(--q-font-weight-medium);
      color: var(--q-color-text-primary);
    }

    .form-input {
      width: 100%;
      padding: var(--q-space-3, 12px);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-md);
      font-size: var(--q-font-size-base);
      box-sizing: border-box;
      background: var(--q-color-bg-secondary);
      color: var(--q-color-text-primary);
      transition: border-color 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--q-color-primary);
    }

    .btn-primary {
      width: 100%;
      padding: var(--q-space-3, 12px);
      background-color: var(--q-color-primary);
      color: white;
      border: none;
      border-radius: var(--q-radius-md);
      font-size: var(--q-font-size-base);
      font-weight: var(--q-font-weight-bold);
      cursor: pointer;
      margin-top: var(--q-space-4, 16px);
      transition: background-color 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: var(--q-color-primary-dark);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .button-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--q-space-4, 16px);
      margin-top: var(--q-space-4, 16px);
    }

    .btn-secondary {
      width: 100%;
      padding: var(--q-space-3, 12px);
      background-color: transparent;
      color: var(--q-color-text-primary);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-md);
      font-size: var(--q-font-size-base);
      font-weight: var(--q-font-weight-bold);
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background-color: var(--q-color-bg-hover);
    }

    .error {
      background-color: #fee2e2;
      color: #dc2626;
      padding: var(--q-space-3, 12px);
      border-radius: var(--q-radius-md);
      font-size: var(--q-font-size-sm);
      margin-bottom: var(--q-space-4, 16px);
      border: 1px solid #fecaca;
    }

    .success {
      background-color: #dcfce7;
      color: #166534;
      padding: var(--q-space-3, 12px);
      border-radius: var(--q-radius-md);
      font-size: var(--q-font-size-sm);
      margin-bottom: var(--q-space-4, 16px);
      border: 1px solid #bbf7d0;
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--q-space-4, 16px);
      }
      .container {
        padding: var(--q-space-6, 24px);
        box-shadow: none;
        border: none;
      }
    }
  `;

  // 🏙️ Render
  render() {
    return html`
      <div class="container">
        <button class="close-btn" @click="${this._onCancel}" title="${this.i18n.t('auth.cancel')}">✕</button>
        <h2 class="title">${this.i18n.t('auth.changePwd')}</h2>
        <p class="description">
          ${this.i18n.t('dashboard.description')}
        </p>

        ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}
        ${this.successMessage ? html`<div class="success">${this.successMessage}</div>` : ''}

        <div class="form-group">
          <label class="form-label">${this.i18n.t('auth.oldPwd')}</label>
          <input
            class="form-input"
            type="password"
            .value="${this.oldPwd}"
            @input="${(e: Event) => {
              this.oldPwd = (e.target as HTMLInputElement).value;
            }}"
            placeholder="•••"
          />
        </div>

        <div class="form-group">
          <label class="form-label">${this.i18n.t('auth.newPwd')}</label>
          <input
            class="form-input"
            type="password"
            .value="${this.newPwd}"
            @input="${(e: Event) => {
              this.newPwd = (e.target as HTMLInputElement).value;
            }}"
            placeholder="•••"
          />
        </div>

        <div class="form-group">
          <label class="form-label">${this.i18n.t('auth.confirmPwd')}</label>
          <input
            class="form-input"
            type="password"
            .value="${this.confirmPwd}"
            @input="${(e: Event) => {
              this.confirmPwd = (e.target as HTMLInputElement).value;
            }}"
            placeholder="•••"
          />
        </div>

        <div class="button-group">
          <button
            class="btn-secondary"
            ?disabled="${this.is_loading}"
            @click="${this._onCancel}"
          >
            ${this.i18n.t('auth.cancel')}
          </button>
          <button
            class="btn-primary"
            ?disabled="${this.is_loading}"
            @click="${this._onSubmitClick}"
          >
            ${this.is_loading ? this.i18n.t('auth.submitting') : this.i18n.t('auth.submit')}
          </button>
        </div>
      </div>
    `;
  }

  // 🎨 Events
  private _onCancel() {
    this._logic.navigateTo('/home');
  }

  private async _onSubmitClick() {
    this.errorMessage = '';
    this.successMessage = '';
    this.is_loading = true;

    try {
      await this._logic.handleChangePwd(this.oldPwd, this.newPwd, this.confirmPwd);
      this.successMessage = this.i18n.t('auth.success');
      // Reset form
      this.oldPwd = '';
      this.newPwd = '';
      this.confirmPwd = '';
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : this.i18n.t('auth.error');
    } finally {
      this.is_loading = false;
    }
  }
}

