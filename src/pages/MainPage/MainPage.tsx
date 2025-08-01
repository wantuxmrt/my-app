import React, { useEffect } from 'react';
import { 
  useUIStore, 
  useRequestsStore, 
  useAuthStore 
} from '@/store';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import MainContent from '@/components/layout/MainContent/MainContent';
import RequestGrid from '@/components/requests/RequestGrid/RequestGrid';
import RequestTable from '@/components/requests/RequestTable/RequestTable';
import AuthModal from '@/components/auth/AuthModal/AuthModal';
import CreateRequestModal from '@/components/requests/CreateRequestModal/CreateRequestModal';
import TicketModal from '@/components/requests/TicketModal/TicketModal';
import Button from '@/components/common/Button/Button';
import styles from './MainPage.module.css';
import { TicketStatus, Priority } from '@/types/zzzOLD_types/app';

const MainPage: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab,
    isAuthModalOpen,
    authModalType,
    isTicketModalOpen,
    ticketModalMode,
    isCreateRequestModalOpen,
    viewMode,
    setViewMode,
    openAuthModal,
    closeAuthModal,
    openTicketModal,
    closeTicketModal,
    openCreateRequestModal,
    closeCreateRequestModal
  } = useUIStore();
  
  const { 
    tickets, 
    filteredTickets,
    stats,
    fetchTickets,
    setCurrentTicket,
    currentTicket,
    createTicket,
    updateTicket,
    filterTickets
  } = useRequestsStore();
  
  const { user, isAuthenticated, login, register, logout } = useAuthStore();
  
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  
  const getTicketsForTab = () => {
    if (!user) return [];
  
    if (activeTab === 'my-requests') {
      return filteredTickets.filter(t => t.userId === user.id);
    }
  
    if (activeTab === 'moderation' && user.role === 'manager') {
      return filteredTickets.filter(t => t.department === user.department);
    }
  
    return filteredTickets;
  };
  
  const ticketsToShow = getTicketsForTab();
  
  const handleLoginClick = () => openAuthModal('login');
  const handleRegisterClick = () => openAuthModal('register');
  const handleCreateTicket = () => openCreateRequestModal();
  
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
    openTicketModal('edit');
  };

  const handleFilterChange = (filters: {
    system: string;
    status: TicketStatus | 'all';
    priority: Priority | 'all';
    search: string;
  }) => {
    filterTickets(filters);
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
        {['my-requests', 'moderation', 'admin', 'profile', 'help'].map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'my-requests' && <><i className="fas fa-ticket-alt"></i> Мои запросы</>}
            {tab === 'moderation' && <><i className="fas fa-user-tie"></i> Модерирование</>}
            {tab === 'admin' && <><i className="fas fa-cog"></i> Администрирование</>}
            {tab === 'profile' && <><i className="fas fa-user"></i> Профиль</>}
            {tab === 'help' && <><i className="fas fa-question-circle"></i> Помощь</>}
          </button>
        ))}
      </div>
      
      <div className={styles.content}>
        {isAuthenticated && (
          <Sidebar 
            stats={stats} 
            onFilterChange={handleFilterChange} 
          />
        )}
        
        <MainContent>
          {activeTab === 'my-requests' && (
            <>
              <div className={styles.controls}>
                <div className={styles.viewToggle}>
                  <button 
                    className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <i className="fas fa-th"></i> Плитки
                  </button>
                  <button 
                    className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <i className="fas fa-list"></i> Список
                  </button>
                </div>
                
                <Button 
                  variant="primary"
                  icon="plus"
                  onClick={handleCreateTicket}
                  className={styles.createButton}
                >
                  Создать запрос
                </Button>
              </div>
              
              {ticketsToShow.length > 0 ? (
                viewMode === 'grid' ? (
                  <RequestGrid 
                    tickets={ticketsToShow} 
                    onTicketClick={handleTicketClick} 
                  />
                ) : (
                  <RequestTable 
                    tickets={ticketsToShow} 
                    onRowClick={handleTicketClick}
                  />
                )
              ) : (
                <div className={styles.emptyState}>
                  <i className="fas fa-inbox"></i>
                  <p>Нет запросов по выбранным фильтрам</p>
                  <Button 
                    variant="primary"
                    icon="plus"
                    onClick={handleCreateTicket}
                  >
                    Создать первый запрос
                  </Button>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'moderation' && (
            <div className={styles.sectionPlaceholder}>
              <i className="fas fa-user-tie fa-2x"></i>
              <p>Панель модерирования</p>
            </div>
          )}
          
          {activeTab === 'admin' && (
            <div className={styles.sectionPlaceholder}>
              <i className="fas fa-cog fa-2x"></i>
              <p>Панель администратора</p>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className={styles.sectionPlaceholder}>
              <i className="fas fa-user fa-2x"></i>
              <p>Профиль пользователя</p>
            </div>
          )}
          
          {activeTab === 'help' && (
            <div className={styles.sectionPlaceholder}>
              <i className="fas fa-question-circle fa-2x"></i>
              <p>Раздел помощи</p>
            </div>
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
      
      <CreateRequestModal 
        isOpen={isCreateRequestModalOpen}
        onClose={closeCreateRequestModal}
        onSubmit={handleTicketCreate}
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