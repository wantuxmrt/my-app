// src/services/api/axios.ts
import Request from './request';
import type { RequestConfig } from './type';

const api = new Request({
  interceptors: {
    requestInterceptor: (config) => {
      console.log('Запрос отправлен:', config.url);
      return config;
    },
    responseInterceptor: (response) => {
      console.log('Ответ получен:', response);
      return response;
    },
    responseInterceptorCatch: (error) => {
      console.error('Ошибка API:', error);
      return Promise.reject(error);
    }
  }
});

export default api;