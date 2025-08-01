// src/services/api/typesAPI.ts

import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

/**
 * Интерфейс для кастомных интерцепторов запросов/ответов
 * @template T - Тип ожидаемого ответа (по умолчанию AxiosResponse)
 */
export interface RequestInterceptors<T = AxiosResponse> {
  /** Интерцептор успешного запроса */
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  
  /** Обработчик ошибок запроса */
  requestInterceptorCatch?: (error: any) => any;
  
  /** Интерцептор успешного ответа */
  responseInterceptor?: (config: T) => T;
  
  /** Обработчик ошибок ответа */
  responseInterceptorCatch?: (error: any) => any;
}

/**
 * Расширенная конфигурация запроса с поддержкой кастомных интерцепторов
 * @template T - Тип ожидаемого ответа
 */
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  /** Кастомные интерцепторы для конкретного запроса */
  interceptors?: RequestInterceptors<T>;
}