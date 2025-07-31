import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import { RootState } from '@/store';
import { store } from '@/store';
import { logout } from '@/store/authSlice';

// Базовый URL для API
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Интерфейс для кастомной ошибки
export interface ApiError extends Error {
  status?: number;
  code?: string;
  response?: AxiosResponse;
  isAxiosError: boolean;
}

// Создаем экземпляр Axios
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state: RootState = store.getState();
    const token = state.auth.user?.token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      name: 'ApiError',
      message: error.message,
      isAxiosError: true,
      response: error.response,
      status: error.response?.status,
      code: error.code,
    };

    // Обработка специфических ошибок
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }

    if (error.response?.status === 403) {
      apiError.message = 'Доступ запрещен';
    }

    if (error.response?.status === 429) {
      apiError.message = 'Слишком много запросов. Попробуйте позже.';
    }

    return Promise.reject(apiError);
  }
);

export default api;