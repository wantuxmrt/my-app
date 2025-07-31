import React, { useEffect } from 'react';
import { useAuthStore, useRequestsStore } from '@/store';
import RequestTable from '@/components/requests/RequestTable/RequestTable';
import Button from '@/components/common/Button/Button';
import styles from './ModerationPage.module.css';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import MainContent from '@/components/layout/MainContent/MainContent';
import { Priority } from '@/types/app';

const ModerationPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    tickets, 
    filteredTickets, 
    filterTickets, 
    fetchTickets 
  } = useRequestsStore();
  
  const [departmentRequests, setDepartmentRequests] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (user && tickets.length > 0) {
      // Фильтрация запросов по отделу менеджера
      const requests = tickets.filter(t => 
        t.department === user.department && 
        t.organization === user.organization
      );
      setDepartmentRequests(requests);
    }
  }, [user, tickets]);

  const handleFilterChange = () => {
    filterTickets({
      system: 'all',
      status: 'all',
      priority: 'all',
      search: ''
    });
  };

  if (!user || user.role !== 'manager') {
    return (
      <div className={styles.moderationPage}>
        <AppHeader />
        <MainContent>
          <div className={styles.accessDenied}>
            <i className="fas fa-ban"></i>
            <h3>Доступ запрещен</h3>
            <p>Только менеджеры имеют доступ к этому разделу</p>
          </div>
        </MainContent>
      </div>
    );
  }

  return (
    <div className={styles.moderationPage}>
      <AppHeader />
      <MainContent>
        <div className={styles.moderationPanel}>
          <div className={styles.header}>
            <h2>
              <i className="fas fa-user-tie"></i> Панель модерации
            </h2>
            <p>
              Запросы сотрудников вашего отдела: {user.department}
            </p>
          </div>
          
          <div className={styles.controls}>
            <Button 
              onClick={handleFilterChange}
              icon="sync"
            >
              Обновить
            </Button>
          </div>
          
          <RequestTable 
            tickets={departmentRequests} 
            onRowClick={(ticket) => console.log('Ticket clicked', ticket)}
          />
          
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h4>Всего запросов</h4>
              <p>{departmentRequests.length}</p>
            </div>
            <div className={styles.statCard}>
              <h4>Открытые</h4>
              <p>{departmentRequests.filter(t => t.status !== 'resolved').length}</p>
            </div>
            <div className={styles.statCard}>
              <h4>Срочные</h4>
              <p>{departmentRequests.filter(t => 
                t.priority === 'critical' || t.priority === 'high'
              ).length}</p>
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default ModerationPage;