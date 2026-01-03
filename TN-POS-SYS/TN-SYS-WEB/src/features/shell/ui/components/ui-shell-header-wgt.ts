// 🇻🇳 Header chứa thông tin module, thông báo và user menu
// 🇺🇸 Header containing module information, notifications and user menu
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useI18n, type Language } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';
import { getTrialMode } from '@/core/utils/trial';
import { S_Api_Org, type UserBranchAssignment } from '@/features/org/services/s_api_org';

@customElement('ui-shell-header-wgt')
export class UiShellHeaderWgt extends LitElement {
  // 🏷️ Tiêu đề module hiện tại
  @property({ type: String }) title: string = '';

  // 👤 Tên người dùng đang đăng nhập
  @property({ type: String }) userName: string = '';

  // 🏪 Tên chi nhánh
  @property({ type: String }) branchName: string = '';

  // 🌐 i18n
  private i18n = useI18n();
  @state() language: Language = this.i18n.language;

  // 🍃 Internal State
  @state() private _isUserMenuOpen: boolean = false;
  @state() private _isBranchMenuOpen: boolean = false;
  @state() private _isTrial: boolean = getTrialMode();
  @state() private _userBranches: UserBranchAssignment[] = [];
  private _orgService = new S_Api_Org();

  // 🎨 Styles
  static styles = [
    qThemeStyles,
    css`
    :host {
      display: block;
      height: 64px;
      background-color: var(--q-color-bg-primary);
      border-bottom: 1px solid var(--q-color-border);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--q-space-4, 16px);
      height: 100%;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: var(--q-space-2, 8px);
    }

    .menu-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: var(--q-radius-md);
      background: transparent;
      color: var(--q-color-text-primary);
      cursor: pointer;
      font-size: 24px;
      transition: background-color 0.2s;
    }

    .menu-toggle-btn:hover {
      background-color: var(--q-color-bg-hover);
    }

    .title {
      font-size: var(--q-font-size-lg);
      font-weight: var(--q-font-weight-semibold);
      color: var(--q-color-text-primary);
    }

    .mode-badge {
      padding: 2px 8px;
      border-radius: var(--q-radius-full);
      font-size: 10px;
      font-weight: var(--q-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-left: 8px;
    }

    .mode-badge.trial {
      background-color: #fff7ed; /* Amber-50 */
      color: #ea580c; /* Amber-600 */
      border: 1px solid #ffedd5;
    }

    .mode-badge.real {
      background-color: #f0fdf4; /* Green-50 */
      color: #16a34a; /* Green-600 */
      border: 1px solid #dcfce7;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--q-space-4, 16px);
    }

    .branch-info {
      display: flex;
      align-items: center;
      gap: var(--q-space-2, 8px);
      padding: var(--q-space-1, 4px) var(--q-space-3, 12px);
      background-color: var(--q-color-bg-secondary);
      color: var(--q-color-text-secondary);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-full);
      font-size: var(--q-font-size-xs);
      font-weight: var(--q-font-weight-medium);
    }

    .branch-selector {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--q-space-2, 8px);
      padding: var(--q-space-1, 4px) var(--q-space-3, 12px);
      background-color: var(--q-color-bg-secondary);
      color: var(--q-color-text-secondary);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-full);
      font-size: var(--q-font-size-xs);
      font-weight: var(--q-font-weight-medium);
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }

    .branch-selector:hover {
      background-color: var(--q-color-bg-hover);
      border-color: var(--q-color-primary);
      color: var(--q-color-primary);
    }

    .branch-selector.open {
      background-color: var(--q-color-bg-hover);
      border-color: var(--q-color-primary);
      color: var(--q-color-primary);
    }

    .branch-dropdown {
      right: auto;
      left: 0;
      width: 250px;
    }

    /* 👤 User Profile Dropdown */
    .user-profile {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--q-space-2, 8px);
      padding: var(--q-space-2, 8px) var(--q-space-3, 12px);
      border-radius: var(--q-radius-md);
      cursor: pointer;
      transition: background-color 0.2s;
      user-select: none;
    }

    .user-profile:hover {
      background-color: var(--q-color-bg-hover);
    }

    .user-profile.open {
      background-color: var(--q-color-bg-hover);
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: var(--q-radius-full);
      background-color: var(--q-color-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--q-font-weight-bold);
      font-size: var(--q-font-size-sm);
    }

    .user-name {
      font-weight: var(--q-font-weight-medium);
      color: var(--q-color-text-primary);
      font-size: var(--q-font-size-sm);
    }

    .dropdown-arrow {
      font-size: 12px;
      color: var(--q-color-text-muted);
      transition: transform 0.2s;
    }

    .user-profile.open .dropdown-arrow {
      transform: rotate(180deg);
    }

    /* 📔 Dropdown Menu */
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 220px;
      background-color: var(--q-color-bg-primary);
      border: 1px solid var(--q-color-border);
      border-radius: var(--q-radius-lg);
      box-shadow: var(--q-shadow-xl);
      padding: var(--q-space-2, 8px);
      display: none;
      flex-direction: column;
      z-index: 1000;
      animation: slideIn 0.2s ease;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-menu.open {
      display: flex;
    }

    .menu-header {
      padding: var(--q-space-2, 8px) var(--q-space-3, 12px);
      margin-bottom: var(--q-space-2, 8px);
    }

    .menu-user-name {
      display: block;
      font-weight: var(--q-font-weight-bold);
      color: var(--q-color-text-primary);
    }

    .menu-user-role {
      display: block;
      font-size: var(--q-font-size-xs);
      color: var(--q-color-text-muted);
    }

    .menu-divider {
      height: 1px;
      background-color: var(--q-color-border);
      margin: var(--q-space-1, 4px) 0;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: var(--q-space-3, 12px);
      padding: var(--q-space-2, 8px) var(--q-space-3, 12px);
      border-radius: var(--q-radius-md);
      color: var(--q-color-text-primary);
      text-decoration: none;
      font-size: var(--q-font-size-sm);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .menu-item:hover {
      background-color: var(--q-color-bg-hover);
    }

    .menu-item.logout {
      color: var(--q-color-error, #ef4444);
    }

    .menu-item.logout:hover {
      background-color: #fef2f2;
    }

    :host-context(.dark) .menu-item.logout:hover {
      background-color: #450a0a;
    }

    .menu-icon {
      font-size: 18px;
    }
  `];

  // ♻️ Lifecycle
  protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(_changedProperties);
    // Listen to language change events
    window.addEventListener('languagechange', this._onLanguageChange);
    // Listen to click outside to close dropdown
    window.addEventListener('click', this._onWindowClick);
    // Listen to trial mode changes
    window.addEventListener('trialmodechange', this._onTrialModeChange);
    // Update language from localStorage
    this.language = this.i18n.language;

    // Load branches
    this._loadUserBranches();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('languagechange', this._onLanguageChange);
    window.removeEventListener('click', this._onWindowClick);
    window.removeEventListener('trialmodechange', this._onTrialModeChange);
  }

  private async _loadUserBranches() {
    try {
      const userDataStr = localStorage.getItem('user_data');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (userData.q_id) {
          this._userBranches = await this._orgService.getUserBranches(userData.q_id);
        }
      }
    } catch (error) {
      console.error('Failed to load user branches:', error);
    }
  }

  // 🧪 Handle trial mode change
  private _onTrialModeChange = (e: Event) => {
    const event = e as CustomEvent<{ isTrial: boolean }>;
    this._isTrial = event.detail.isTrial;
  };

  // 🖱️ Close dropdown when clicking outside
  private _onWindowClick = (e: MouseEvent) => {
    const path = e.composedPath();
    
    if (this._isUserMenuOpen) {
      const isInsideUser = path.some(target => 
        target instanceof HTMLElement && target.classList.contains('user-profile')
      );
      if (!isInsideUser) {
        this._isUserMenuOpen = false;
      }
    }

    if (this._isBranchMenuOpen) {
      const isInsideBranch = path.some(target => 
        target instanceof HTMLElement && target.classList.contains('branch-selector')
      );
      if (!isInsideBranch) {
        this._isBranchMenuOpen = false;
      }
    }
  };

  // 🌐 Handle language change
  private _onLanguageChange = (e: Event) => {
    const event = e as CustomEvent<{ language: Language }>;
    this.language = event.detail.language;
    this.i18n = useI18n(); // Re-initialize i18n
  };

  // 🏙️ Render
  render() {
    const userInitial = this.userName ? this.userName.charAt(0).toUpperCase() : '?';

    return html`
      <div class="header">
        <div class="header-left">
          <button 
            class="menu-toggle-btn" 
            title="${this.i18n.t('shell.toggleMenu')}"
            @click="${this._onToggleMenu}"
          >
            ☰
          </button>
          <div class="title">${this.title || this.i18n.t('shell.defaultTitle')}</div>
          <div class="mode-badge ${this._isTrial ? 'trial' : 'real'}">
            ${this._isTrial ? this.i18n.t('shell.trialBadge') : this.i18n.t('shell.realBadge')}
          </div>
        </div>

        <div class="actions">
          ${this.branchName ? html`
            <div class="branch-selector ${this._isBranchMenuOpen ? 'open' : ''}" 
                 @click="${this._onToggleBranchMenu}"
                 title="${this.i18n.t('shell.branch')}">
              <span class="menu-icon">🏪</span>
              <span>${this.branchName}</span>
              <span class="dropdown-arrow">▼</span>

              <div class="dropdown-menu branch-dropdown ${this._isBranchMenuOpen ? 'open' : ''}">
                <div class="menu-header">
                  <span class="menu-user-name">${this.i18n.t('org.assignedBranches')}</span>
                </div>
                <div class="menu-divider"></div>
                ${this._userBranches.length === 0 ? html`
                  <div class="menu-item">
                    <span>${this.i18n.t('common.loading')}...</span>
                  </div>
                ` : this._userBranches.map(brh => html`
                  <div class="menu-item ${brh.c_brh_name === this.branchName ? 'active' : ''}" 
                       @click="${(e: Event) => this._onSwitchBranch(brh, e)}">
                    <span class="menu-icon">${brh.c_brh_name === this.branchName ? '✅' : '🏪'}</span>
                    <span>${brh.c_brh_name}</span>
                  </div>
                `)}
              </div>
            </div>
          ` : ''}

          <div class="user-profile ${this._isUserMenuOpen ? 'open' : ''}" @click="${this._onToggleUserMenu}">
            <div class="user-avatar">${userInitial}</div>
            <span class="user-name">${this.userName}</span>
            <span class="dropdown-arrow">▼</span>

            <div class="dropdown-menu ${this._isUserMenuOpen ? 'open' : ''}">
              <div class="menu-header">
                <span class="menu-user-name">${this.userName}</span>
                <span class="menu-user-role">${this.i18n.t('shell.welcome')}</span>
              </div>
              <div class="menu-divider"></div>
              <div class="menu-item" @click="${() => this._handleMenuAction('password')}">
                <span>${this.i18n.t('modules.auth-pwd')}</span>
              </div>
              <div class="menu-divider"></div>
              <div class="menu-item logout" @click="${this._onLogout}">
                <span>${this.i18n.t('shell.logout')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 🎨 Events
  private _onToggleUserMenu(e: Event) {
    e.stopPropagation();
    this._isUserMenuOpen = !this._isUserMenuOpen;
    if (this._isUserMenuOpen) this._isBranchMenuOpen = false;
  }

  private _onToggleBranchMenu(e: Event) {
    e.stopPropagation();
    this._isBranchMenuOpen = !this._isBranchMenuOpen;
    if (this._isBranchMenuOpen) this._isUserMenuOpen = false;
  }

  private _onSwitchBranch(brh: UserBranchAssignment, e: Event) {
    e.stopPropagation();
    this._isBranchMenuOpen = false;
    
    if (brh.c_brh_name === this.branchName) return;

    // Lưu chi nhánh mới vào localStorage
    const branchData = {
      id: brh.c_brh_id,
      name: brh.c_brh_name
    };
    localStorage.setItem('branch_data', JSON.stringify(branchData));
    
    // Thông báo cho Shell cập nhật lại branchName property
    this.dispatchEvent(new CustomEvent('branch-changed', {
      detail: branchData,
      bubbles: true,
      composed: true
    }));
  }

  private _handleMenuAction(action: string) {
    this._isUserMenuOpen = false;
    const router = (window as any).router;
    if (!router) return;

    if (action === 'password') {
      router.navigate('/auth/change-password');
    } else if (action === 'profile') {
      router.navigate('/auth/permissions'); // Tạm thời dùng permissions cho profile
    }
  }

  private _onToggleMenu() {
    this.dispatchEvent(
      new CustomEvent('toggle-sidebar', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onLogout() {
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

