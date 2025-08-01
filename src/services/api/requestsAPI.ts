// src/services/api/requestsAPI.ts
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import type { RequestConfig, RequestInterceptors } from "./typesAPI";
import { API_BASE_URL, API_TIMEOUT } from "./configsAPI";

class Request {
  private instance: AxiosInstance;
  private interceptors?: RequestInterceptors;

  constructor(config: RequestConfig) {
    // Создаем базовый экземпляр Axios
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      ...config
    });

    // Сохраняем перехватчики экземпляра
    this.interceptors = config.interceptors;

    // Применяем перехватчики экземпляра
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // Применяем глобальные перехватчики
    this.instance.interceptors.request.use(
      (config) => {
        // Добавляем токен авторизации в заголовки
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
        // Стандартная обработка успешного ответа - возвращаем только данные
        return response.data;
      },
      (error) => {
        // Обработка ошибок
        if (error.response?.status === 401) {
          // Автоматический логаут при 401 Unauthorized
          localStorage.removeItem('authToken');
          // Генерируем событие для обработки в приложении
          window.dispatchEvent(new Event('unauthorized'));
        }
        
        // Форматируем ошибку в единый формат
        const customError = {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
          data: error.response?.data,
          code: error.code,
          config: error.config
        };
        
        return Promise.reject(customError);
      }
    );
  }

  /**
   * Универсальный метод запроса
   * @template T - Ожидаемый тип ответа
   * @param {RequestConfig} config - Конфигурация запроса
   * @returns {Promise<T>} Промис с данными ответа
   */
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // Применяем перехватчики запроса, если они есть
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(
          config as InternalAxiosRequestConfig
        ) as RequestConfig<T>;
      }

      this.instance
        .request<any, T>(config)
        .then((response) => {
          // Применяем перехватчики ответа, если они есть
          if (config.interceptors?.responseInterceptor) {
            response = config.interceptors.responseInterceptor(response);
          }
          resolve(response);
        })
        .catch((error) => {
          // Применяем обработчики ошибок ответа, если они есть
          if (config.interceptors?.responseInterceptorCatch) {
            error = config.interceptors.responseInterceptorCatch(error);
          }
          reject(error);
        });
    });
  }

  /**
   * GET запрос
   * @template T - Ожидаемый тип ответа
   * @param {string} url - URL endpoint
   * @param {RequestConfig} [config] - Дополнительная конфигурация
   * @returns {Promise<T>} Промис с данными ответа
   */
  get<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  /**
   * POST запрос
   * @template T - Ожидаемый тип ответа
   * @param {string} url - URL endpoint
   * @param {any} [data] - Тело запроса
   * @param {RequestConfig} [config] - Дополнительная конфигурация
   * @returns {Promise<T>} Промис с данными ответа
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'POST' });
  }

  /**
   * PUT запрос
   * @template T - Ожидаемый тип ответа
   * @param {string} url - URL endpoint
   * @param {any} [data] - Тело запроса
   * @param {RequestConfig} [config] - Дополнительная конфигурация
   * @returns {Promise<T>} Промис с данными ответа
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'PUT' });
  }

  /**
   * DELETE запрос
   * @template T - Ожидаемый тип ответа
   * @param {string} url - URL endpoint
   * @param {RequestConfig} [config] - Дополнительная конфигурация
   * @returns {Promise<T>} Промис с данными ответа
   */
  delete<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }

  /**
   * PATCH запрос
   * @template T - Ожидаемый тип ответа
   * @param {string} url - URL endpoint
   * @param {any} [data] - Тело запроса
   * @param {RequestConfig} [config] - Дополнительная конфигурация
   * @returns {Promise<T>} Промис с данными ответа
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'PATCH' });
  }
}

export default Request;