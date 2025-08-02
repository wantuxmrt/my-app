// setupTests.ts
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { server } from './mocks/server';

// Настройка времени ожидания для тестов
configure({ asyncUtilTimeout: 5000 });

// Настройка моков для matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // устаревшее
    removeListener: jest.fn(), // устаревшее
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Настройка моков для localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Запуск сервера для моков API
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Сброс обработчиков после каждого теста
afterEach(() => {
  server.resetHandlers();
  localStorageMock.clear();
});

// Остановка сервера после завершения всех тестов
afterAll(() => server.close());