import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Установка сервера MSW перед всеми тестами
beforeAll(() => server.listen());

// Сброс обработчиков после каждого теста
afterEach(() => server.resetHandlers());

// Очистка сервера после завершения всех тестов
afterAll(() => server.close());

// Моки для window.matchMedia
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

// Моки для ResizeObserver
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

window.ResizeObserver = ResizeObserverMock;