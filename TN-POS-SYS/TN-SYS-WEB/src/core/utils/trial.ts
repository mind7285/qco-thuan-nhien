// 🇻🇳 Trial Mode Management Utility
// 🇺🇸 Trial Mode Management Utility

const TRIAL_STORAGE_KEY = 'app_trial_mode';

// 🌐 Get current trial mode from localStorage
export function getTrialMode(): boolean {
  if (typeof window === 'undefined') return false;
  const trial = localStorage.getItem(TRIAL_STORAGE_KEY);
  return trial === 'true';
}

// 🌐 Set trial mode to localStorage
export function setTrialMode(isTrial: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRIAL_STORAGE_KEY, isTrial ? 'true' : 'false');
  // Dispatch custom event để các component khác có thể lắng nghe và cập nhật
  window.dispatchEvent(new CustomEvent('trialmodechange', { detail: { isTrial } }));
}

// 🌐 Clear trial mode (khi logout hoặc đăng nhập thật)
export function clearTrialMode(): void {
  setTrialMode(false);
}

// 🌐 Initialize trial mode on app load
export function initTrialMode(): void {
  if (typeof window === 'undefined') return;
  // Chỉ đọc từ localStorage, không dispatch event vì đây là initialization
  const isTrial = getTrialMode();
  // Không cần dispatch event khi init
}

