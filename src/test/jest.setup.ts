import { TextEncoder, TextDecoder } from 'util';
import { describe, test, expect, jest } from '@jest/globals';

global.TextEncoder = TextEncoder;
// @ts-expect-error Типы для TextDecoder
global.TextDecoder = TextDecoder;

// Моки для localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Моки для sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Моки для URL.createObjectURL
window.URL.createObjectURL = jest.fn();

// Моки для анимаций
jest.mock('react-transition-group', () => ({
  CSSTransition: jest.fn(({ children }) => children),
}));