// gateway.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './config';
import { RequestConfig, RequestInterceptors } from './type';
import errorHandler from '../error/handler';

export class ApiGateway {
  private instance: AxiosInstance;
  private interceptors?: RequestInterceptors;

  constructor(config: RequestConfig = {}) {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      ...config
    });

    this.interceptors = config.interceptors;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptors
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
          };
        }
        return this.interceptors?.requestInterceptor?.(config) || config;
      },
      (error: AxiosError) => {
        return this.interceptors?.requestInterceptorCatch?.(error) || Promise.reject(error);
      }
    );

    // Response interceptors
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return this.interceptors?.responseInterceptor?.(response) || response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.dispatchEvent(new Event('unauthorized'));
        }
        errorHandler.handle(error);
        return this.interceptors?.responseInterceptorCatch?.(error) || Promise.reject(error);
      }
    );
  }

  public async request<T = any>(config: RequestConfig): Promise<T> {
    try {
      const response = await this.instance.request(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET', url });
  }

  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST', url, data });
  }

  public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT', url, data });
  }

  public delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE', url });
  }

  public patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH', url, data });
  }
}

export default new ApiGateway();