// 🇻🇳 Toast notification utility
// 🇺🇸 Toast notification utility

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  duration?: number; // milliseconds, default 3000
  position?: 'top' | 'bottom' | 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

// 🎨 Emoji cho từng loại toast
const toastEmojis: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
};

// 🎨 Position mặc định cho từng loại
const defaultPositions: Record<ToastType, NonNullable<ToastOptions['position']>> = {
  success: 'bottom',      // Success ít quan trọng, không chặn workflow
  error: 'bottom',        // Error hiển thị ở bottom center (căn giữa ngang, dưới)
  info: 'bottom',         // Info ít quan trọng
  warning: 'top',         // Warning quan trọng, user cần thấy ngay
};

// ⚡️ Show toast notification
export function showToast(
  message: string,
  type: ToastType = 'info',
  options: ToastOptions = {}
): void {
  const { duration = 3000, position } = options;
  
  // Sử dụng position mặc định nếu không chỉ định
  const finalPosition: NonNullable<ToastOptions['position']> = position || defaultPositions[type];

  // Tạo toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Thêm emoji vào message
  const emoji = toastEmojis[type];
  toast.textContent = `${emoji} ${message}`;

  // Styles
  const positionStyles: Record<string, Partial<CSSStyleDeclaration>> = {
    'top': { left: '50%', transform: 'translateX(-50%)', top: '20px', bottom: 'auto', marginTop: '0' },
    'bottom': { left: '50%', transform: 'translateX(-50%)', top: 'auto', bottom: '20px', marginTop: '0' },
    'center': { left: '50%', transform: 'translate(-50%, -50%)', top: '50%', bottom: 'auto', marginTop: '-25px' },
    'bottom-right': { left: 'auto', right: '20px', transform: 'none', top: 'auto', bottom: '20px', marginTop: '0' },
    'bottom-left': { left: '20px', right: 'auto', transform: 'none', top: 'auto', bottom: '20px', marginTop: '0' },
    'top-right': { left: 'auto', right: '20px', transform: 'none', top: '20px', bottom: 'auto', marginTop: '0' },
    'top-left': { left: '20px', right: 'auto', transform: 'none', top: '20px', bottom: 'auto', marginTop: '0' },
  };

  Object.assign(toast.style, {
    position: 'fixed',
    ...positionStyles[finalPosition],
    padding: '10px 25px', // Grid 5px: q-gap-02x (10px), q-gap-05x (25px)
    borderRadius: '10px', // Grid 5px: q-gap-02x (10px)
    backgroundColor: '#000000', // Nền đen làm chủ đạo
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

  // Màu text theo type (nền đen, text màu theo loại)
  const textColors = {
    success: '#10b981', // Green
    error: '#ef4444', // Red
    info: '#3b82f6', // Blue
    warning: '#f59e0b', // Orange
  };
  toast.style.color = textColors[type];

  // Thêm vào body
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    // Transform đã được set trong positionStyles, chỉ cần đảm bảo opacity
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

