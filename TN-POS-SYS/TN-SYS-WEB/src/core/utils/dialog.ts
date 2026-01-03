// 🇻🇳 Tiện ích hiển thị hộp thoại xác nhận tùy chỉnh
// 🇺🇸 Custom confirmation dialog utility
import { t } from './i18n';

/**
 * 🇻🇳 Hiển thị hộp thoại xác nhận tùy chỉnh
 * 🇺🇸 Show a custom confirmation dialog
 */
export async function confirmDialog(message: string, title?: string): Promise<boolean> {
  return new Promise((resolve) => {
    // 1. Tạo overlay (nền mờ)
    const overlay = document.createElement('div');
    overlay.className = 'q-dialog-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '20000',
      backdropFilter: 'blur(4px)',
      opacity: '0',
      transition: 'opacity 0.2s ease',
    });

    // 2. Tạo modal content
    const modal = document.createElement('div');
    modal.className = 'q-bg-primary q-rounded-lg q-shadow-xl';
    Object.assign(modal.style, {
      width: '90%',
      maxWidth: '400px',
      backgroundColor: 'var(--q-color-bg-primary, #ffffff)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: 'var(--q-shadow-xl)',
      transform: 'scale(0.9)',
      transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      fontFamily: 'var(--q-font-family, sans-serif)',
    });

    modal.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: var(--q-color-text-primary)">
          ${title || t('dialog.confirmTitle')}
        </h3>
      </div>
      <div style="margin-bottom: 24px;">
        <p style="margin: 0; font-size: 15px; color: var(--q-color-text-secondary); line-height: 1.5">
          ${message}
        </p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
        <button id="dlg-no" style="padding: 12px; border-radius: 12px; border: 1px solid var(--q-color-border, #e5e7eb); background: transparent; cursor: pointer; font-weight: 600; color: var(--q-color-text-primary); transition: background 0.2s">
          ${t('dialog.no')}
        </button>
        <button id="dlg-yes" style="padding: 12px; border-radius: 12px; border: none; background: #ef4444; color: white; cursor: pointer; font-weight: 600; transition: opacity 0.2s">
          ${t('dialog.yes')}
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // 3. Hiệu ứng hiển thị
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    });

    // 4. Xử lý sự kiện
    const cleanup = (result: boolean) => {
      modal.style.transform = 'scale(0.9)';
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (overlay.parentNode) {
          document.body.removeChild(overlay);
        }
        resolve(result);
      }, 200);
    };

    const yesBtn = overlay.querySelector('#dlg-yes') as HTMLButtonElement;
    const noBtn = overlay.querySelector('#dlg-no') as HTMLButtonElement;

    yesBtn.addEventListener('click', () => cleanup(true));
    noBtn.addEventListener('click', () => cleanup(false));
    
    // Hover effects cho nút
    noBtn.addEventListener('mouseenter', () => noBtn.style.backgroundColor = 'var(--q-color-bg-hover, #f3f4f6)');
    noBtn.addEventListener('mouseleave', () => noBtn.style.backgroundColor = 'transparent');
    yesBtn.addEventListener('mouseenter', () => yesBtn.style.opacity = '0.9');
    yesBtn.addEventListener('mouseleave', () => yesBtn.style.opacity = '1');

    // Đóng khi click ra ngoài overlay
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cleanup(false);
    });
  });
}
