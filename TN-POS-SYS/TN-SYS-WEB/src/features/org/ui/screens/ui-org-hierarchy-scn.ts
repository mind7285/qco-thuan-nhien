// 🇻🇳 Screen quản lý sơ đồ tổ chức
// 🇺🇸 Organization Hierarchy Management Screen
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ui_Org_Logic } from '../logic/ui-org-logic';
import type { OrgNode } from '../../services/s_api_org';
import { useI18n } from '@/core/utils/i18n';
import { qThemeStyles } from '@/core/styles/q-theme';

@customElement('ui-org-hierarchy-scn')
export class UiOrgHierarchyScn extends LitElement {
  private _logic = new Ui_Org_Logic();
  private i18n = useI18n();

  @state() private _hierarchy: OrgNode[] = [];
  @state() private _selectedNode: OrgNode | null = null;
  @state() private _isLoading = false;

  static styles = [
    qThemeStyles,
    css`
      :host {
        display: block;
        padding: 24px;
        height: 100%;
        box-sizing: border-box;
      }
      .container {
        display: grid;
        grid-template-columns: 350px 1fr;
        gap: 24px;
        height: calc(100vh - 120px);
      }
      .panel {
        background: var(--q-color-bg-primary);
        border-radius: 12px;
        border: 1px solid var(--q-color-border);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .panel-header {
        padding: 16px;
        border-bottom: 1px solid var(--q-color-border);
        background: var(--q-color-bg-secondary);
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .tree-container {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
      }
      .tree-node {
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 8px;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.2s;
        color: var(--q-color-text-primary);
      }
      .tree-node:hover {
        background: var(--q-color-bg-hover);
      }
      .tree-node.selected {
        background: var(--q-color-primary);
        color: white;
        font-weight: 600;
        box-shadow: var(--q-shadow-md);
      }
      .tree-node-children {
        margin-left: 24px;
        border-left: 1px solid var(--q-color-border);
        padding-left: 4px;
      }
      .node-icon {
        font-size: 1.2em;
      }
      .empty-state {
        padding: 40px;
        text-align: center;
        color: var(--q-color-text-secondary);
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }
      .form-control {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--q-color-border);
        background: var(--q-color-bg-secondary);
        color: var(--q-color-text-primary);
      }
    `
  ];

  protected async firstUpdated() {
    this._loadData();
  }

  private async _loadData() {
    this._isLoading = true;
    this._hierarchy = await this._logic.getHierarchy();
    this._isLoading = false;
  }

  private _getIcon(type: string) {
    switch (type) {
      case 'CPY': return '🏢';
      case 'REG': return '🌍';
      case 'BRH': return '🏪';
      case 'DEP': return '👥';
      default: return '📄';
    }
  }

  private _renderTree(nodes: OrgNode[]): TemplateResult[] {
    return nodes.map(node => html`
      <div class="tree-node-wrapper">
        <div 
          class="tree-node ${this._selectedNode?.id === node.id ? 'selected' : ''}"
          @click="${() => this._selectedNode = node}"
        >
          <span class="node-icon">${this._getIcon(node.type)}</span>
          <span>${node.name}</span>
        </div>
        ${node.children && node.children.length > 0 ? html`
          <div class="tree-node-children">
            ${this._renderTree(node.children)}
          </div>
        ` : ''}
      </div>
    `);
  }

  render() {
    return html`
      <h2>${this.i18n.t('org.hierarchy')}</h2>
      
      <div class="container">
        <!-- Panel bên trái: Cây tổ chức -->
        <div class="panel">
          <div class="panel-header">
            <span>Sơ đồ phân cấp</span>
            <button @click="${this._loadData}" style="background: none; border: none; cursor: pointer; font-size: 1.2em;">🔄</button>
          </div>
          <div class="tree-container">
            ${this._renderTree(this._hierarchy)}
          </div>
        </div>

        <!-- Panel bên phải: Form chỉnh sửa -->
        <div class="panel">
          <div class="panel-header">
            ${this._selectedNode ? `Chi tiết: ${this._selectedNode.name}` : 'Thông tin chi tiết'}
          </div>
          <div class="tree-container">
            ${!this._selectedNode ? html`
              <div class="empty-state">Chọn một thành phần trên sơ đồ để xem chi tiết</div>
            ` : html`
              <div class="form-group">
                <label>Tên đơn vị</label>
                <input class="form-control" type="text" .value="${this._selectedNode.name}" readonly>
              </div>
              <div class="form-group">
                <label>Loại đơn vị</label>
                <input class="form-control" type="text" .value="${this.i18n.t(`org.${this._selectedNode.type.toLowerCase()}`)}" readonly>
              </div>
              <div class="form-group">
                <label>ID</label>
                <input class="form-control" type="text" .value="${this._selectedNode.id}" readonly>
              </div>
              
              <p style="color: var(--q-color-text-secondary); font-style: italic;">
                * Các chức năng Thêm/Sửa/Xóa trực tiếp trên sơ đồ đang được phát triển.
              </p>
            `}
          </div>
        </div>
      </div>
    `;
  }
}

