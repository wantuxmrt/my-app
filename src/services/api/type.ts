// type.ts
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig;
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;
export type ErrorInterceptor = (error: AxiosError) => Promise<AxiosError>;

export interface RequestInterceptors {
  requestInterceptor?: RequestInterceptor;
  requestInterceptorCatch?: ErrorInterceptor;
  responseInterceptor?: ResponseInterceptor;
  responseInterceptorCatch?: ErrorInterceptor;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}