// 🇻🇳 Client API cơ sở
// 🇺🇸 Base API client
import type { M_Api_Response } from './m_api_response';

export class Api_Client {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    // 🇻🇳 Sử dụng proxy trong development hoặc baseUrl được cung cấp
    // 🇺🇸 Use proxy in development or provided baseUrl
    if (baseUrl) {
      this.baseUrl = baseUrl;
    } else if (typeof window !== 'undefined') {
      // Trong development, sử dụng proxy /api
      // In production, có thể cấu hình qua environment variable
      const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
      this.baseUrl = apiBase.startsWith('http') ? apiBase : `${window.location.origin}${apiBase}`;
    } else {
      this.baseUrl = '';
    }
  }

  // 🇻🇳 Gửi request GET
  // 🇺🇸 Send GET request
  async get<T>(path: string, options?: RequestInit): Promise<M_Api_Response<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // 🇻🇳 Gửi request POST
  // 🇺🇸 Send POST request
  async post<T>(path: string, body?: unknown, options?: RequestInit): Promise<M_Api_Response<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // 🇻🇳 Gửi request DELETE
  // 🇺🇸 Send DELETE request
  async delete<T>(path: string, options?: RequestInit): Promise<M_Api_Response<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // 🇻🇳 Lấy headers xác thực
  // 🇺🇸 Get authentication headers
  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // 🇻🇳 Lấy token từ storage
  // 🇺🇸 Get token from storage
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  // 🇻🇳 Xử lý phản hồi
  // 🇺🇸 Handle response
  private async handleResponse<T>(response: Response): Promise<M_Api_Response<T>> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }
}

