// my-app\src\components\common\sections\AdminPanel\AdminPanel.tsx
import React, { useEffect } from 'react';
import styles from './MainPage.module.css';
import { useUIStore, useRequestsStore, useAuthStore } from '../../store/store';
import AppHeader from '../../components/common/AppHeader/AppHeader';
import Sidebar from '../../components/common/Sidebar/Sidebar';
import MainContent from '../../components/common/MainContent/MainContent';
import RequestGrid from '../../components/requests/RequestGrid/RequestGrid';
import RequestTable from '../../components/requests/RequestTable/RequestTable';
import AuthModal from '../../components/auth/AuthModal/AuthModal';
import TicketModal from '../../components/requests/TicketModal/TicketModal';
import { TicketStatus, Priority, TicketSystem } from '../../types/app.d';

const MainPage: React.FC = () => {
  const { 
    activeTab, 
    isAuthModalOpen, 
    authModalType, 
    isTicketModalOpen,
    ticketModalMode,
    setActiveTab,
    openAuthModal,
    closeAuthModal,
    openTicketModal,
    closeTicketModal
  } = useUIStore();
  
  const { 
    tickets, 
    filteredTickets,
    stats,
    fetchTickets,
    filterTickets,
    setCurrentTicket,
    currentTicket,
    createTicket,
    updateTicket
  } = useRequestsStore();
  
  const { user, isAuthenticated, login, register, logout } = useAuthStore();
  
  // Загрузка данных при монтировании
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  
  // Фильтрация тикетов по вкладке
  const getTicketsForTab = () => {
    if (!user) return [];
    
    if (activeTab === 'my-requests') {
      return filteredTickets.filter(t => t.userId === user.id);
    }
    
    if (activeTab === 'moderation' && user.role === 'manager') {
      // Для менеджера показываем тикеты его отдела
      return filteredTickets.filter(t => {
        // В реальности нужно получить пользователя по userId
        // Здесь упрощенно: считаем, что отдел менеджера совпадает с отделом тикета
        return t.department === user.department;
      });
    }
    
    return filteredTickets;
  };
  
  const ticketsToShow = getTicketsForTab();
  
  // Обработчики UI
  const handleLoginClick = () => openAuthModal('login');
  const handleRegisterClick = () => openAuthModal('register');
  const handleCreateTicket = () => openTicketModal('create');
  
  // Обработка авторизации
  const handleLogin = (email: string, password: string) => {
    login(email, password);
    closeAuthModal();
  };
  
  const handleRegister = (
    email: string, 
    password: string, 
    name: string, 
    role: string, 
    organization: string, 
    department: string
  ) => {
    register(email, password, name, role, organization, department);
    closeAuthModal();
  };
  
  // Обработка тикетов
  const handleTicketCreate = (ticketData: any) => {
    if (ticketModalMode === 'create') {
      createTicket({
        ...ticketData,
        userId: user!.id,
        organization: user!.organization,
        department: user!.department,
        status: 'new' as TicketStatus,
        comments: [],
        attachments: []
      });
    } else {
      updateTicket(currentTicket!.id, ticketData);
    }
    closeTicketModal();
  };
  
  const handleTicketClick = (ticket: any) => {
    setCurrentTicket(ticket);
    openTicketModal('view');
  };

  return (
    <div className={styles.container}>
      <AppHeader 
        user={user} 
        onLogin={handleLoginClick} 
        onRegister={handleRegisterClick}
        onLogout={logout}
      />
      
      <div className={styles.tabsContainer}>
        {['my-requests', 'moderation', 'admin', 'new-request', 'profile', 'help'].map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'my-requests' && <><i className="fas fa-ticket-alt"></i> Мои запросы</>}
            {tab === 'moderation' && <><i className="fas fa-user-tie"></i> Модерирование</>}
            {tab === 'admin' && <><i className="fas fa-cog"></i> Администрирование</>}
            {tab === 'new-request' && <><i className="fas fa-plus-circle"></i> Создать запрос</>}
            {tab === 'profile' && <><i className="fas fa-user"></i> Профиль</>}
            {tab === 'help' && <><i className="fas fa-question-circle"></i> Помощь</>}
          </button>
        ))}
      </div>
      
      <div className={styles.content}>
        <Sidebar stats={stats} />
        
        <MainContent>
          {activeTab === 'my-requests' && (
            <>
              <div className={styles.controls}>
                <div className={styles.viewToggle}>
                  <button 
                    className={`${styles.viewButton} ${styles.active}`}
                    onClick={() => {}}
                  >
                    <i className="fas fa-th"></i> Плитки
                  </button>
                  <button 
                    className={styles.viewButton}
                    onClick={() => {}}
                  >
                    <i className="fas fa-list"></i> Список
                  </button>
                </div>
                
                <button 
                  className={styles.createButton}
                  onClick={handleCreateTicket}
                >
                  <i className="fas fa-plus"></i> Создать запрос
                </button>
              </div>
              
              {ticketsToShow.length > 0 ? (
                <RequestGrid 
                  tickets={ticketsToShow} 
                  onTicketClick={handleTicketClick} 
                />
              ) : (
                <div className={styles.emptyState}>
                  <i className="fas fa-inbox"></i>
                  <p>Нет запросов по выбранным фильтрам</p>
                  <button 
                    className={styles.createButton}
                    onClick={handleCreateTicket}
                  >
                    Создать первый запрос
                  </button>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'moderation' && (
            <div>Панель модерирования (в разработке)</div>
          )}
          
          {activeTab === 'admin' && (
            <div>Панель администратора (в разработке)</div>
          )}
          
          {activeTab === 'new-request' && (
            <div>Форма создания запроса (в разработке)</div>
          )}
          
          {activeTab === 'profile' && (
            <div>Профиль пользователя (в разработке)</div>
          )}
          
          {activeTab === 'help' && (
            <div>Раздел помощи (в разработке)</div>
          )}
        </MainContent>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        type={authModalType}
        onClose={closeAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      
      <TicketModal 
        isOpen={isTicketModalOpen}
        mode={ticketModalMode}
        ticket={currentTicket}
        onClose={closeTicketModal}
        onSubmit={handleTicketCreate}
      />
    </div>
  );
};

export default MainPage;