import React, { useState, useEffect } from 'react';
import AppHeader from './AppHeader/AppHeader';
import Sidebar from './Sidebar/Sidebar';
import TabsNavigation from '@/components/common/TabsNavigation/TabsNavigation';
import { useLocation } from 'react-router-dom';
import { Stats, Ticket, User } from '@/types/app';
import { mockTickets, mockUsers } from '@/test/mocks/mockData';
import { calculateStats } from '@/utils/statsUtils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideTabs = ['/admin', '/moderation'].includes(location.pathname);
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    open: 0,
    resolved: 0,
    overdue: 0
  });

  // Имитация загрузки данных
  useEffect(() => {
    // Загрузка тикетов
    setTickets(mockTickets);
    
    // Загрузка текущего пользователя (в реальном приложении из API/стора)
    setUser(mockUsers[0]);
    
    // Имитация задержки сети
    const timer = setTimeout(() => {
      const calculatedStats = calculateStats(mockTickets);
      setStats(calculatedStats);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    console.log('Login initiated');
    // В реальном приложении здесь будет вызов API
    setUser(mockUsers[0]);
  };

  const handleRegister = () => {
    console.log('Register initiated');
    // В реальном приложении здесь будет вызов API
    setUser(mockUsers[0]);
  };

  const handleLogout = () => {
    console.log('Logout initiated');
    setUser(null);
  };

  return (
    <div id="wrapper" className="white">
      <AppHeader 
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      
      {!hideTabs && <TabsNavigation activeTab="my-requests" onTabChange={() => {}} />}

      <div id="main" className="clearfix">
        <div id="left-column">
          <Sidebar 
            stats={stats} 
            onFilterChange={() => console.log('Filter changed')}
          />
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