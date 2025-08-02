import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  it('renders without crashing', () => {
    render(<AppHeader 
        user={null} 
        onLogin={() => {}} 
        onRegister={() => {}} 
        onLogout={() => {}} />);
    expect(screen.getByText('Логотип')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(<AppHeader 
        user={null} 
        onLogin={() => {}} 
        onRegister={() => {}} 
        onLogout={() => {}} />);
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Запросы')).toBeInTheDocument();
    expect(screen.getByText('Помощь')).toBeInTheDocument();
  });
  // Дополнительные тесты
});