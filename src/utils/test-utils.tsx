// test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { configureStore } from '@reduxjs/toolkit';
import { storeReducer } from '@/store/store';
import type { PreloadedState } from '@reduxjs/toolkit';

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// Создаем кастомный рендер для тестов
const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: storeReducer,
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Реэкспорт всех методов
export * from '@testing-library/react';
// Экспорт кастомного рендера
export { customRender as render };

/**
 * Генерирует тестовые данные
 * @param count - Количество элементов
 * @param generator - Функция генерации
 * @returns Массив данных
 */
export const generateTestData = <T,>(
  count: number, 
  generator: (index: number) => T
): T[] => {
  return Array.from({ length: count }, (_, i) => generator(i));
};