// Файл: src/components/layout/AppLayout.tsx
import React from 'react';
import AppHeader from '../common/AppHeader/AppHeader'; // Исправленный путь
import TabsNavigation from '../common/TabsNavigation/TabsNavigation'; // Исправленный путь
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideTabs = ['/admin', '/moderation'].includes(location.pathname);

  return (
    <div className="app-layout">
      <AppHeader />
      {!hideTabs && <TabsNavigation />}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;