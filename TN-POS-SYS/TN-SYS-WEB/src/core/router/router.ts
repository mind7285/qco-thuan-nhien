// 🇻🇳 Simple Router implementation for Web Components
// 🇺🇸 Simple Router implementation for Web Components

export type RouteHandler = () => HTMLElement;

export interface Route {
  path: string;
  handler: RouteHandler;
  requiresAuth?: boolean;
}

export class Router {
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private container: HTMLElement | null = null;
  private rootElement: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this._setupHistoryListener();
  }

  // ⚡️ Đăng ký route
  register(route: Route): void {
    this.routes.push(route);
  }

  // ⚡️ Đăng ký nhiều routes
  registerRoutes(routes: Route[]): void {
    routes.forEach((route) => this.register(route));
  }

  // ⚡️ Điều hướng đến path
  navigate(path: string): void {
    const route = this.routes.find((r) => this._matchPath(r.path, path));

    if (!route) {
      console.warn(`Route not found: ${path}`);
      this.navigate('/auth/login');
      return;
    }

    // Kiểm tra authentication nếu cần
    if (route.requiresAuth && !this._isAuthenticated()) {
      this.navigate('/auth/login');
      return;
    }

    // Cập nhật URL
    window.history.pushState({}, '', path);

    // Render component
    this._renderRoute(route);
  }

  // ⚡️ Khởi động router
  start(): void {
    const path = window.location.pathname || '/auth/login';
    this.navigate(path);
  }

  // ⚡️ Kiểm tra path có match với route pattern không
  private _matchPath(routePath: string, currentPath: string): boolean {
    // Exact match
    if (routePath === currentPath) return true;

    // Wildcard match
    if (routePath.endsWith('*')) {
      const basePath = routePath.slice(0, -1);
      return currentPath.startsWith(basePath);
    }

    return false;
  }

  // ⚡️ Render route component
  private _renderRoute(route: Route): void {
    if (!this.container) return;

    // Remove old component
    if (this.rootElement) {
      this.container.removeChild(this.rootElement);
    }

    // Create and append new component
    this.rootElement = route.handler();
    this.container.appendChild(this.rootElement);
    this.currentRoute = route;
  }

  // ⚡️ Setup history listener
  private _setupHistoryListener(): void {
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      this.navigate(path);
    });
  }

  // ⚡️ Kiểm tra authentication
  private _isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
}

