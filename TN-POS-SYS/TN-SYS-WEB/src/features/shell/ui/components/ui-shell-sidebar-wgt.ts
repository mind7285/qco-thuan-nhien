// 🇻🇳 Sidebar chứa menu điều hướng giữa các module
// 🇺🇸 Sidebar containing navigation menu between modules
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type { M_Tb_Shell_Mod } from '../../data/models';

@customElement('ui-shell-sidebar-wgt')
export class UiShellSidebarWgt extends LitElement {
  // 🍃 Danh sách module từ Registry
  @property({ type: Array }) modules: M_Tb_Shell_Mod[] = [];

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

  // 🏙️ Render
  render() {
    return html`
      <div class="sidebar">
        ${repeat(
          this.modules,
          (mod) => mod.c_mod_id,
          (mod) => html`
            <div
              class="module-item"
              @click="${() => this._onModClick(mod.c_mod_id)}"
            >
              <span class="module-icon">${mod.c_icon || '📦'}</span>
              <span>${mod.c_title}</span>
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

