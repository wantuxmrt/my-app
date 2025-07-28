import React, { useCallback } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import RequestTable from '../../requests/RequestTable/RequestTable';
import Button from '../../common/Button/Button';
import styles from './ModerationPanel.module.css';
import { User, Ticket } from '@/types/app';

const ModerationPanel = () => {
  const { currentUser, users, requests: tickets } = useAppContext();
  const [departmentRequests, setDepartmentRequests] = React.useState<Ticket[]>([]);

  // Get users in same organization
  const getUsersInSameOrganization = useCallback(() => {
    if (!currentUser?.organization) return [];
    return users.filter(user => user.organization === currentUser.organization);
  }, [currentUser, users]);

  // Load department requests
  const loadDepartmentRequests = useCallback(() => {
    if (!currentUser) return;
    
    const usersInDept = getUsersInSameOrganization();
    const userIds = usersInDept.map(u => u.id);
    const requests = tickets.filter(t => userIds.includes(t.userId));
    
    setDepartmentRequests(requests as Ticket[]);
  }, [currentUser, tickets, getUsersInSameOrganization]);

  React.useEffect(() => {
    loadDepartmentRequests();
  }, [loadDepartmentRequests]);

  if (currentUser?.role !== 'manager') {
    return (
      <div className={styles.accessDenied}>
        <i className="fas fa-ban"></i>
        <h3>Доступ запрещен</h3>
        <p>Только менеджеры имеют доступ к этому разделу</p>
      </div>
    );
  }

  return (
    <div className={styles.moderationPanel}>
      <div className={styles.header}>
        <h2>
          <i className="fas fa-user-tie"></i> Панель модерации
        </h2>
        <p>
          Запросы сотрудников вашего отдела: {currentUser.department}
        </p>
      </div>
      
      <div className={styles.controls}>
        <Button 
          onClick={loadDepartmentRequests}
          icon="sync"
        >
          Обновить
        </Button>
      </div>
      
      <RequestTable 
        requests={departmentRequests as Ticket[]} 
        onRowClick={(request) => console.log('Request clicked', request)} 
      />
      
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h4>Всего запросов</h4>
          <p>{departmentRequests.length}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Открытые</h4>
          <p>{departmentRequests.filter(r => r.status !== 'resolved').length}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Срочные</h4>
          <p>{departmentRequests.filter(r => r.priority === 'critical' || r.priority === 'high').length}</p>
        </div>
      </div>
    </div>
  );
};

export default ModerationPanel;