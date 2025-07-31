import React from 'react';
import Router from './routes/Router';
import AppHeader from './components/layout/AppHeader/AppHeader';
import Sidebar from './components/layout/Sidebar/Sidebar';
import MainContent from './components/layout/MainContent/MainContent';
import { useAuthStore } from './store/authSlice';
import { AppContainer, ContentWrapper } from './App.styles';
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle';
import { Stats } from '@/types/index';

// Пустая статистика для инициализации
const emptyStats: Stats = {
  total: 0,
  open: 0,
  resolved: 0,
  overdue: 0
};

function App() {
  const { isAuthenticated, user, login, register, logout } = useAuthStore();
  
  // Обработчики для AppHeader
  const handleLogin = () => {
    // Здесь может быть открытие модалки логина
    login('demo@example.com', 'demo123');
  };
  
  const handleRegister = () => {
    // Здесь может быть открытие модалки регистрации
    register('demo@example.com', 'demo123', 'Demo User', 'user', 'org1', 'dep1');
  };

  return (
    <AppContainer>
      <AppHeader 
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={logout}
      />
      <ContentWrapper>
        {isAuthenticated && (
          <Sidebar 
            stats={emptyStats} 
            onFilterChange={() => {}} // Добавлена заглушка
          />
        )}
        <MainContent>
          <Router />
        </MainContent>
      </ContentWrapper>
      <ThemeToggle />
    </AppContainer>
  );
}

export default App;