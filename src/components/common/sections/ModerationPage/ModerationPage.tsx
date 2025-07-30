import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import RequestTable from '@/components/requests/RequestTable/RequestTable';
import Button from '@/components/common/Button/Button';
import styles from './ModerationPanel.module.css';
import { User, Ticket } from '@/types/app';

const ModerationPanel = () => {
  const { currentUser } = useAppContext();
  const [users, setUsers] = useState<User[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [departmentRequests, setDepartmentRequests] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('/mockData/users.json');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const ticketsResponse = await fetch('/mockData/tickets.json');
        const ticketsData = await ticketsResponse.json();
        setTickets(ticketsData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser && tickets.length > 0 && users.length > 0) {
      const usersInDept = users.filter(
        u => u.organization === currentUser.organization && 
             u.department === currentUser.department
      );
      
      const userIds = usersInDept.map(u => u.id);
      const requests = tickets.filter(t => userIds.includes(t.userId));
      setDepartmentRequests(requests);
    }
  }, [currentUser, tickets, users]);

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

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
          onClick={() => window.location.reload()}
          icon="sync"
        >
          Обновить
        </Button>
      </div>
      
      <RequestTable 
        requests={departmentRequests} 
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