import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TabsNavigation from './TabsNavigation';

test('renders all navigation tabs', () => {
  render(
    <MemoryRouter>
      <TabsNavigation />
    </MemoryRouter>
  );
  
  expect(screen.getByText('Главная')).toBeInTheDocument();
  expect(screen.getByText('Запросы')).toBeInTheDocument();
  expect(screen.getByText('Профиль')).toBeInTheDocument();
  expect(screen.getByText('Помощь')).toBeInTheDocument();
});

// Fix for isolatedModules
export {};