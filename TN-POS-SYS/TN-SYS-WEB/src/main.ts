// 🇻🇳 Main entry point
// 🇺🇸 Main entry point
import { Router, type Route } from './core/router/router';

// 🎨 Q-Layout Utility Classes được import trong từng component (LitElement Shadow DOM)
// Không cần import global CSS vì LitElement sử dụng Shadow DOM

// ⚡️ Import các component để đảm bảo custom elements được đăng ký
// Import trực tiếp từ file để decorator @customElement được thực thi
import './features/auth/ui/screens/ui-auth-login-scn';
import './features/auth/ui/screens/ui-auth-register-scn';
import './features/auth/ui/screens/ui-auth-forgot-pwd-scn';
import './features/shell/ui/screens/ui-shell-scn';
import './features/shell/ui/components/ui-shell-sidebar-wgt';
import './features/shell/ui/components/ui-shell-header-wgt';
// Module screens
import './features/shell/ui/screens/ui-dashboard-scn';
import './features/shell/ui/screens/ui-pos-scn';
import './features/shell/ui/screens/ui-inv-scn';
import './features/shell/ui/screens/ui-rpt-scn';
import './features/shell/ui/screens/ui-cfg-scn';

// ⚡️ Khởi tạo router
const appContainer = document.getElementById('app');
if (!appContainer) {
  throw new Error('App container not found');
}

const router = new Router(appContainer);

// ⚡️ Helper function để kiểm tra authentication
function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('auth_token');
  return !!token;
}

// ⚡️ Định nghĩa routes
const routes: Route[] = [
  // Root path - redirect based on auth status
  {
    path: '/',
    handler: () => {
      // Kiểm tra authentication
      if (isAuthenticated()) {
        // Đã login → redirect đến /home
        window.history.replaceState({}, '', '/home');
        const component = document.createElement('ui-shell-scn');
        return component as any;
      } else {
        // Chưa login → redirect đến /auth/login
        window.history.replaceState({}, '', '/auth/login');
        const component = document.createElement('ui-auth-login-scn');
        return component as any;
      }
    },
  },
  
  // Auth Public Routes
  {
    path: '/auth/login',
    handler: () => {
      const component = document.createElement('ui-auth-login-scn');
      return component as any;
    },
  },
  {
    path: '/auth/register',
    handler: () => {
      const component = document.createElement('ui-auth-register-scn');
      return component as any;
    },
  },
  {
    path: '/auth/forgot-pwd',
    handler: () => {
      const component = document.createElement('ui-auth-forgot-pwd-scn');
      return component as any;
    },
  },

  // Protected Routes (Auth Required) - Shell Container
  {
    path: '/home',
    handler: () => {
      const component = document.createElement('ui-shell-scn');
      return component as any;
    },
    requiresAuth: true,
  },
  {
    path: '/dashboard',
    handler: () => {
      const shell = document.createElement('ui-shell-scn');
      const content = document.createElement('ui-dashboard-scn');
      shell.appendChild(content);
      return shell as any;
    },
    requiresAuth: true,
  },
  {
    path: '/auth',
    handler: () => {
      const shell = document.createElement('ui-shell-scn');
      const content = document.createElement('div');
      content.innerHTML = '<h1>Module Auth Admin - Đang phát triển...</h1>';
      shell.appendChild(content);
      return shell as any;
    },
    requiresAuth: true,
  },
  {
    path: '/pos',
    handler: () => {
      const shell = document.createElement('ui-shell-scn');
      const content = document.createElement('ui-pos-scn');
      shell.appendChild(content);
      return shell as any;
    },
    requiresAuth: true,
  },
  {
    path: '/inv',
    handler: () => {
      const shell = document.createElement('ui-shell-scn');
      const content = document.createElement('ui-inv-scn');
      shell.appendChild(content);
      return shell as any;
    },
    requiresAuth: true,
  },
  {
    path: '/rpt',
    handler: () => {
      const shell = document.createElement('ui-shell-scn');
      const content = document.createElement('ui-rpt-scn');
      shell.appendChild(content);
      return shell as any;
    },
    requiresAuth: true,
  },
  {
    path: '/cfg',
    handler: () => {
      const shell = document.createElement('ui-shell-scn');
      const content = document.createElement('ui-cfg-scn');
      shell.appendChild(content);
      return shell as any;
    },
    requiresAuth: true,
  },
];

// ⚡️ Đăng ký routes
router.registerRoutes(routes);

// ⚡️ Khởi động router
router.start();

// ⚡️ Export router để có thể sử dụng trong các component
(window as any).router = router;

