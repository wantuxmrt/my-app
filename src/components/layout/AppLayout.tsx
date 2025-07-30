import React from 'react';
import AppHeader from './AppHeader/AppHeader';
import Sidebar from './Sidebar/Sidebar';
import TabsNavigation from '../common/TabsNavigation/TabsNavigation';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideTabs = ['/admin', '/moderation'].includes(location.pathname);

  return (
    <div id="wrapper" className="white">
      <AppHeader />

      {!hideTabs && <TabsNavigation />}

      <div id="main" className="clearfix">
        <div id="left-column">
          <Sidebar />
          {/* Сюда можно рендерить Sidebar */}
        </div>
        <div id="content">
          {children}
        </div>
      </div>

      <div id="footer">
        <p>&copy; 2025 My App</p>
      </div>
    </div>
  );
};

export default AppLayout;
