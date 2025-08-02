// src/services/api/config.ts
/**
 * Конфигурация окружения
 */
//const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
//const TIME_OUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '5000', 10);

// Проверка окружения
//const getEnvConfig = () => {
 // if (import.meta.env.MODE === 'development') {
  //  return {
   //   BASE_URL: BASE_URL || 'https://api.dev.example.com',
    //  TIME_OUT: TIME_OUT || 5000
//    };
//  }
  
//  if (import.meta.env.MODE === 'production') {
//    return {
//      BASE_URL: BASE_URL || 'https://api.example.com',
//      TIME_OUT: TIME_OUT || 10000
//    };
//  }
  
//  return {
//    BASE_URL,
//    TIME_OUT
//  };
//};

//const { BASE_URL: API_BASE_URL, TIME_OUT: API_TIMEOUT } = getEnvConfig();

//export { API_BASE_URL, API_TIMEOUT };
// config.ts
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000; // 30 seconds
export const WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL || 'ws://localhost:3001';