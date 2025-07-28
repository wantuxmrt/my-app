import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AppProvider } from '../contexts/AppContext';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../themes/ThemeProvider';

// Обертка для тестов с провайдерами
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AppProvider>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

// Кастомный рендер для тестов
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Реэкспорт всех методов из testing-library/react
export * from '@testing-library/react';
// Экспорт кастомного рендера
export { customRender as render };