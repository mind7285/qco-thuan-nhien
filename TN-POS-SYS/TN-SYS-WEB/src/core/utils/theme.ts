// 🇻🇳 Theme Management Utility
// 🇺🇸 Theme Management Utility
export type Theme = 'light' | 'dark';

// 🌐 Get current theme from localStorage
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const theme = localStorage.getItem('app_theme') as Theme;
  return theme === 'light' || theme === 'dark' ? theme : 'light';
}

// 🌐 Set theme to localStorage and apply to document
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('app_theme', theme);
  
  // Apply theme to document
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
  } else {
    html.classList.add('light');
    html.classList.remove('dark');
  }
  
  // Dispatch custom event để các component khác có thể lắng nghe và cập nhật
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

// 🌐 Toggle theme (light <-> dark)
export function toggleTheme(): Theme {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}

// 🌐 Initialize theme on app load
export function initTheme(): void {
  if (typeof window === 'undefined') return;
  const theme = getTheme();
  setTheme(theme); // Apply theme immediately
}

