// 🇻🇳 Sidebar chứa menu điều hướng giữa các module
// 🇺🇸 Sidebar containing navigation menu between modules
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { useI18n, type Language, setLanguage, getLanguage } from '@/core/utils/i18n';
import { toggleTheme } from '@/core/utils/theme';
import { qThemeStyles } from '@/core/styles/q-theme';
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
  static styles = [
    qThemeStyles,
    css`
    :host {
      display: block;
      width: 300px;
      height: 100%;
      background-color: var(--q-color-bg-secondary);
      border-right: 1px solid var(--q-color-border);
    }

    .sidebar {
      padding: var(--q-space-2) var(--q-space-3);
      height: 100%;
      overflow-y: auto;
    }

    /* 🧱 Nhóm Module */
    .module-group {
      margin-bottom: 8px;
      position: relative;
    }

    .group-label {
      padding: 8px 16px;
      font-size: var(--q-font-size-xs);
      font-weight: var(--q-font-weight-bold);
      color: var(--q-color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 16px;
      margin-bottom: 4px;
    }

    .module-item {
      padding: 12px 16px;
      margin-bottom: 2px;
      border-radius: var(--q-radius-md);
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      color: var(--q-color-text-primary);
      font-family: var(--q-font-family);
      font-size: var(--q-font-size-base);
      font-weight: var(--q-font-weight-medium);
      white-space: nowrap;
      gap: 8px;
    }

    .module-item span:not(.module-icon):not(.expand-icon) {
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      display: flex;
      align-items: center;
    }

    .module-item:hover {
      background-color: var(--q-color-bg-hover);
      color: var(--q-color-primary);
    }

    :host-context(.dark) .module-item:hover {
      color: #60a5fa;
    }

    .module-item.active {
      background-color: var(--q-color-primary-light);
      color: var(--q-color-primary);
      font-weight: var(--q-font-weight-semibold);
    }

    :host-context(.dark) .module-item.active {
      color: #60a5fa; /* Blue-400 cho độ sáng tốt hơn trong dark mode */
    }
    
    .module-item.active-root {
      background-color: var(--q-color-primary);
      color: var(--q-color-text-white);
    }

    .module-item.active-root,
    .module-item.active {
      color: inherit;
    }
    
    .expand-icon {
      margin-left: auto;
      font-family: 'Material Icons', 'Material Symbols Outlined', sans-serif;
      font-size: 20px;
      transition: transform 0.3s ease;
      color: var(--q-color-text-muted);
      opacity: 0.5;
    }

    .module-group:hover .expand-icon,
    .module-group.active .expand-icon {
      opacity: 1;
    }

    .module-group:hover .module-item:not(.active-root) .expand-icon {
      transform: rotate(180deg);
    }

    .sub-menu {
      margin-left: 12px;
      padding-left: 8px;
      border-left: 2px solid var(--q-color-border-light);
      overflow: hidden;
      max-height: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      visibility: hidden;
    }

    /* Xổ ra khi hover vào group HOẶC khi group đang có item active */
    .module-group:hover .sub-menu,
    .module-group.active .sub-menu {
      max-height: 800px; /* Tăng lên cho chắc chắn nếu có nhiều menu con */
      opacity: 1;
      visibility: visible;
      margin-top: 4px;
      margin-bottom: 8px;
    }

    /* Đảm bảo khi rê chuột vào sub-menu thì group vẫn được coi là đang hover */
    .sub-menu:hover {
      visibility: visible;
      opacity: 1;
    }

    .sub-item {
      padding: 10px 16px;
      margin-bottom: 2px;
      font-size: var(--q-font-size-sm);
      font-weight: var(--q-font-weight-normal);
    }

    .sub-item.active {
      background-color: var(--q-color-primary-light);
      color: var(--q-color-primary);
    }
  `];

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
    const topLevelModules = this.modules.filter(m => !m.c_parent_id);
    
    // Phân nhóm các module cấp cao
    const groups = [
      { label: this.language === 'vi' ? 'Bàn làm việc' : 'Workspace', mods: topLevelModules.filter(m => m.c_mod_id === 'dashboard') },
      { label: this.language === 'vi' ? 'Nghiệp vụ' : 'Operations', mods: topLevelModules.filter(m => ['pos', 'inv', 'crm'].includes(m.c_mod_id)) },
      { label: this.language === 'vi' ? 'Thống kê' : 'Statistics', mods: topLevelModules.filter(m => ['rpt-sales', 'rpt-inv', 'rpt-staff'].includes(m.c_mod_id)) },
      { label: this.language === 'vi' ? 'Cấu hình' : 'Settings', mods: topLevelModules.filter(m => ['cfg-gen', 'org', 'auth', 'cfg-ui', 'sys-logs'].includes(m.c_mod_id)) },
    ];

    return html`
      <div class="sidebar">
        ${repeat(
          groups,
          (g) => g.label,
          (g) => g.mods.length > 0 ? html`
            <div class="group-label">${g.label}</div>
            ${repeat(
              g.mods,
              (mod) => mod.c_mod_id,
              (mod) => this._renderModuleGroup(mod)
            )}
          ` : ''
        )}
      </div>
    `;
  }

  // 🧱 Render từng nhóm Module (Parent + Children)
  private _renderModuleGroup(mod: M_Tb_Shell_Mod) {
    const children = this.modules.filter(m => m.c_parent_id === mod.c_mod_id);
    const hasChildren = children.length > 0;
    
    // Kiểm tra xem group này có đang chứa module active không
    const isParentActive = mod.c_mod_id === this.currentModule;
    const hasActiveChild = children.some(c => c.c_mod_id === this.currentModule);
    const isGroupActive = isParentActive || hasActiveChild;

    return html`
      <div class="module-group ${isGroupActive ? 'active' : ''}">
        <div
          class="module-item ${isParentActive ? 'active-root' : ''} ${hasActiveChild && !isParentActive ? 'active' : ''}"
          @click="${() => this._onParentClick(mod, hasChildren)}"
        >
          <span>${this._getModuleTitle(mod)}</span>
          ${hasChildren ? html`<span class="expand-icon">expand_more</span>` : ''}
        </div>

        ${hasChildren ? html`
          <div class="sub-menu">
            ${repeat(
              children,
              (child) => child.c_mod_id,
              (child) => html`
                <div
                  class="module-item sub-item ${child.c_mod_id === this.currentModule ? 'active' : ''}"
                  @click="${() => this._onModClick(child.c_mod_id)}"
                >
                  <span>${this._getModuleTitle(child)}</span>
                </div>
              `
            )}
          </div>
        ` : ''}
      </div>
    `;
  }

  // 🎨 Events
  private _onParentClick(mod: M_Tb_Shell_Mod, hasChildren: boolean) {
    // Nếu có con, click vào parent sẽ không điều hướng mà chỉ để UI handle hover (hoặc có thể toggle nếu muốn)
    // Ở đây mình ưu tiên điều hướng nếu parent có route hợp lệ và không phải chỉ là group
    if (!hasChildren || mod.c_route !== '#') {
      this._onModClick(mod.c_mod_id);
    }
  }

  private _onModClick(modId: string) {
    // 🎨 Xử lý các action đặc biệt
    if (modId === 'cfg-ui-theme') {
      toggleTheme();
      return;
    }
    
    if (modId === 'cfg-ui-lang') {
      const currentLang = getLanguage();
      setLanguage(currentLang === 'vi' ? 'en' : 'vi');
      return;
    }

    this.dispatchEvent(
      new CustomEvent('mod-click', {
        detail: { modId },
        bubbles: true,
        composed: true,
      })
    );
  }
}

