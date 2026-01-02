// 🇻🇳 Sidebar chứa menu điều hướng giữa các module
// 🇺🇸 Sidebar containing navigation menu between modules
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { useI18n, type Language } from '@/core/utils/i18n';
import type { M_Tb_Shell_Mod } from '../../data/models';

@customElement('ui-shell-sidebar-wgt')
export class UiShellSidebarWgt extends LitElement {
  // 🍃 Danh sách module từ Registry
  @property({ type: Array }) modules: M_Tb_Shell_Mod[] = [];
  
  // 🍃 Module đang được chọn
  @property({ type: String }) currentModule: string = '';

  // 🌐 i18n
  private i18n = useI18n();
  @state() language: Language = this.i18n.language;

  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      width: 250px;
      height: 100%;
      background-color: var(--q-color-bg-secondary, #f5f5f5);
      border-right: 1px solid var(--q-color-border, #e0e0e0);
    }

    .sidebar {
      padding: var(--q-space-4, 16px);
      height: 100%;
      overflow-y: auto;
    }

    .module-item {
      padding: var(--q-space-3, 12px);
      margin-bottom: var(--q-space-2, 8px);
      border-radius: var(--q-radius-md, 8px);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .module-item:hover {
      background-color: var(--q-color-bg-hover, #e8e8e8);
    }

    .module-item.active {
      background-color: var(--q-color-primary, #007bff);
      color: white;
    }

    .module-icon {
      margin-right: var(--q-space-2, 8px);
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

  // 🌐 Get translated module title
  private _getModuleTitle(mod: M_Tb_Shell_Mod): string {
    // Thử lấy translation từ i18n trước, nếu không có thì dùng c_title từ database
    const translationKey = `modules.${mod.c_mod_id}`;
    const translated = this.i18n.t(translationKey);
    // Nếu translation trả về chính key (không tìm thấy), dùng c_title
    return translated !== translationKey ? translated : mod.c_title;
  }

  // 🏙️ Render
  render() {
    return html`
      <div class="sidebar">
        ${repeat(
          this.modules,
          (mod) => mod.c_mod_id,
          (mod) => html`
            <div
              class="module-item ${mod.c_mod_id === this.currentModule ? 'active' : ''}"
              @click="${() => this._onModClick(mod.c_mod_id)}"
            >
              <span class="module-icon">${mod.c_icon || '📦'}</span>
              <span>${this._getModuleTitle(mod)}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  // 🎨 Events
  private _onModClick(modId: string) {
    this.dispatchEvent(
      new CustomEvent('mod-click', {
        detail: { modId },
        bubbles: true,
        composed: true,
      })
    );
  }
}

