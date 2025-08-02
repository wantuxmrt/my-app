// src/services/api/request.ts
import axios, { type AxiosInstance } from "axios";
import type { RequestConfig, RequestInterceptors } from "./type";
import { API_BASE_URL, API_TIMEOUT } from "./config";

class Request {
  private instance: AxiosInstance;
  private interceptors?: RequestInterceptors;

  constructor(config: RequestConfig) {
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

    // Применяем интерцепторы экземпляра
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // Глобальные интерцепторы
    this.instance.interceptors.request.use(
      (config) => {
        // Добавляем токен авторизации
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    this.instance.interceptors.response.use(
      (response) => {
        // Стандартная обработка успешного ответа
        return response.data;
      },
      (error) => {
        // Обработка ошибок
        if (error.response?.status === 401) {
          // Автоматический логаут при 401
          localStorage.removeItem('authToken');
          window.dispatchEvent(new Event('unauthorized'));
        }
        
        const customError = {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
          data: error.response?.data
        };
        
        return Promise.reject(customError);
      }
    );
  }

  /**
   * Универсальный метод запроса
   */
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // Применяем интерцепторы запроса
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(
          config as InternalAxiosRequestConfig
        ) as RequestConfig<T>;
      }

      this.instance
        .request<any, T>(config)
        .then((response) => {
          if (config.interceptors?.responseInterceptor) {
            response = config.interceptors.responseInterceptor(response);
          }
          resolve(response);
        })
        .catch((error) => {
          if (config.interceptors?.responseInterceptorCatch) {
            error = config.interceptors.responseInterceptorCatch(error);
          }
          reject(error);
        });
    });
  }

  get<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'POST' });
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'PUT' });
  }

  delete<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }

  patch<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'PATCH' });
  }
}

export default Request;