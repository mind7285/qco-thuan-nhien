// 🇻🇳 Toast notification utility
// 🇺🇸 Toast notification utility

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  duration?: number; // milliseconds, default 3000
  position?: 'top' | 'bottom' | 'center';
}

// ⚡️ Show toast notification
export function showToast(
  message: string,
  type: ToastType = 'info',
  options: ToastOptions = {}
): void {
  const { duration = 3000, position = 'top' } = options;

  // Tạo toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Styles
  Object.assign(toast.style, {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    top: position === 'top' ? '20px' : position === 'bottom' ? 'auto' : '50%',
    bottom: position === 'bottom' ? '20px' : 'auto',
    marginTop: position === 'center' ? '-25px' : '0',
    padding: '12px 24px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '10000',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontFamily: 'Tahoma, Verdana, Arial, sans-serif',
    maxWidth: '90%',
    wordWrap: 'break-word',
    opacity: '0',
    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
    pointerEvents: 'none',
  });

  // Màu sắc theo type
  const colors = {
    success: '#10b981', // Green
    error: '#ef4444', // Red
    info: '#3b82f6', // Blue
    warning: '#f59e0b', // Orange
  };
  toast.style.backgroundColor = colors[type];

  // Thêm vào body
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = position === 'center' ? 'translate(-50%, -50%)' : 'translateX(-50%)';
  });

  // Tự động xóa sau duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300); // Wait for fade out animation
  }, duration);
}

// ⚡️ Helper functions
export const toast = {
  success: (message: string, options?: ToastOptions) => showToast(message, 'success', options),
  error: (message: string, options?: ToastOptions) => showToast(message, 'error', options),
  info: (message: string, options?: ToastOptions) => showToast(message, 'info', options),
  warning: (message: string, options?: ToastOptions) => showToast(message, 'warning', options),
};

