// 🇻🇳 Màn hình Shell chính, quản lý bố cục tổng thể
// 🇺🇸 Main Shell screen, managing overall layout
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UiShellSidebarWgt } from '../components/ui-shell-sidebar-wgt';
import { UiShellHeaderWgt } from '../components/ui-shell-header-wgt';
import { Ui_Shell_Logic } from '../logic/ui-shell-logic';
import { S_Api_Shell } from '../../services';
import { useI18n } from '@/core/utils/i18n';
import type { M_Tb_Shell_Mod } from '../../data/models';
import type { M_Tb_Auth_Usr } from '../../../auth/data/models';

@customElement('ui-shell-scn')
export class UiShellScn extends LitElement {
  // 🔌 Logic Binding
  private _logic: Ui_Shell_Logic = new Ui_Shell_Logic(this);

  // 🔌 Service Injection
  private _shellService: S_Api_Shell = new S_Api_Shell();

  // 🌐 i18n
  private i18n = useI18n();

  // 🍃 Internal State
  @state() isSidebarOpen: boolean = true;
  @state() currentModule: string = '';
  @state() modules: M_Tb_Shell_Mod[] = [];
  @state() userData: M_Tb_Auth_Usr | null = null;
  @state() branchData: { id: string; name: string } | null = null;
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
    this._loadUserData();
    await this._loadModules();
    this._updateCurrentModuleFromUrl();
    
    // Listen to URL changes
    window.addEventListener('popstate', () => {
      this._updateCurrentModuleFromUrl();
    });
  }

  // 👤 Load user data from localStorage
  private _loadUserData(): void {
    try {
      const data = localStorage.getItem('user_data');
      if (data) {
        this.userData = JSON.parse(data);
      }
      
      const branchData = localStorage.getItem('branch_data');
      if (branchData) {
        this.branchData = JSON.parse(branchData);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    // Update current module when URL changes
    if (_changedProperties.has('modules')) {
      this._updateCurrentModuleFromUrl();
    }
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
          .userName="${this.userData?.c_full_name || ''}"
          .branchName="${this.branchData?.name || ''}"
          @logout="${this._onLogout}"
        ></ui-shell-header-wgt>

        <!-- Body -->
        <div class="shell-body">
          <!-- Sidebar -->
          <div class="sidebar-container ${this.isSidebarOpen ? '' : 'closed'}">
            <ui-shell-sidebar-wgt
              .modules="${this.modules}"
              .currentModule="${this.currentModule}"
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
    if (!module) {
      return this.i18n.t('shell.defaultTitle');
    }
    // Thử lấy translation từ i18n trước, nếu không có thì dùng c_title từ database
    const translationKey = `modules.${module.c_mod_id}`;
    const translated = this.i18n.t(translationKey);
    // Nếu translation trả về chính key (không tìm thấy), dùng c_title
    return translated !== translationKey ? translated : module.c_title;
  }

  // 💎 Update current module from URL
  private _updateCurrentModuleFromUrl(): void {
    const path = window.location.pathname;
    // Tìm module có c_route khớp dài nhất với path hiện tại
    const sortedModules = [...this.modules].sort((a, b) => b.c_route.length - a.c_route.length);
    const module = sortedModules.find((m) => path.startsWith(m.c_route));
    
    if (module) {
      this.currentModule = module.c_mod_id;
    }
  }
}

