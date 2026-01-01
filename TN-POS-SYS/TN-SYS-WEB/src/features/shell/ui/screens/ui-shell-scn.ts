// 🇻🇳 Màn hình Shell chính, quản lý bố cục tổng thể
// 🇺🇸 Main Shell screen, managing overall layout
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UiShellSidebarWgt } from '../components/ui-shell-sidebar-wgt';
import { UiShellHeaderWgt } from '../components/ui-shell-header-wgt';
import { Ui_Shell_Logic } from '../logic/ui-shell-logic';
import { S_Api_Shell } from '../../services';
import type { M_Tb_Shell_Mod } from '../../data/models';

@customElement('ui-shell-scn')
export class UiShellScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Shell_Logic = new Ui_Shell_Logic(this);

  // 🔌 Service Injection
  private _shellService: S_Api_Shell = new S_Api_Shell();

  // 🍃 Internal State
  @state() isSidebarOpen: boolean = true;
  @state() currentModule: string = '';
  @state() modules: M_Tb_Shell_Mod[] = [];
  @state() userData: unknown = null;
  @state() isLoading: boolean = false;

  // 🎨 Styles
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    .shell-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .shell-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .sidebar-container {
      transition: transform 0.3s ease;
    }

    .sidebar-container.closed {
      transform: translateX(-100%);
    }

    .content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--q-space-4, 16px);
    }

    /* 📱 Mobile Layout */
    @media (max-width: 768px) {
      .sidebar-container {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .sidebar-container.closed {
        display: none;
      }
    }

    /* 💻 Desktop Layout */
    @media (min-width: 769px) {
      .sidebar-container {
        position: relative;
      }
    }
  `;

  // ♻️ Lifecycle
  protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(_changedProperties);
    await this._loadModules();
  }

  // ⚡️ Load modules from registry
  private async _loadModules(): Promise<void> {
    this.isLoading = true;
    try {
      this.modules = await this._shellService.get_registry();
      // Sort by order
      this.modules.sort((a, b) => a.c_order - b.c_order);
    } catch (error) {
      console.error('Failed to load modules:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // 🏙️ Render
  render() {
    return html`
      <div class="shell-container">
        <!-- Header -->
        <ui-shell-header-wgt
          .title="${this._getCurrentModuleTitle()}"
          @logout="${this._onLogout}"
        ></ui-shell-header-wgt>

        <!-- Body -->
        <div class="shell-body">
          <!-- Sidebar -->
          <div class="sidebar-container ${this.isSidebarOpen ? '' : 'closed'}">
            <ui-shell-sidebar-wgt
              .modules="${this.modules}"
              @mod-click="${this._onModClick}"
            ></ui-shell-sidebar-wgt>
          </div>

          <!-- Content Area -->
          <div class="content-area">
            <div class="main-content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 🎨 Events
  private _onModClick(e: CustomEvent<{ modId: string }>) {
    this._logic.handleNav(e.detail.modId);
  }

  private _onLogout() {
    this._logic.handleLogout();
  }

  // 💎 Helper
  private _getCurrentModuleTitle(): string {
    const module = this.modules.find((m) => m.c_mod_id === this.currentModule);
    return module?.c_title || 'POS System';
  }
}

