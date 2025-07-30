import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { User, Ticket } from '@/types/app';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select/Select';
import RequestTable from '@/components/requests/RequestTable/RequestTable';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const { currentUser, logout } = useAppContext();
  const [users, setUsers] = useState<User[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewRequestsUserId, setViewRequestsUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsResponse = await fetch('/mockData/tickets.json');
        const ticketsData = await ticketsResponse.json();
        setTickets(ticketsData);
        
        const usersResponse = await fetch('/mockData/users.json');
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        if ((error as any).response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [logout]);

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setViewRequestsUserId(null);
  };

  const handleViewRequests = (userId: number) => {
    setViewRequestsUserId(userId);
    setEditUser(null);
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      setUsers(prev => prev.map(u => 
        u.id === user.id ? { ...u, active: !u.active } : u
      ));
    } catch (error) {
      console.error('Ошибка изменения статуса:', error);
      setUsers(prev => prev.map(u => 
        u.id === user.id ? { ...u, active: user.active } : u
      ));
    }
  };

  const handleSaveUser = () => {
    if (!editUser) return;
    
    try {
      setUsers(prev => prev.map(u => 
        u.id === editUser.id ? editUser : u
      ));
      setEditUser(null);
    } catch (error) {
      console.error('Ошибка сохранения пользователя:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm) || 
    user.email.toLowerCase().includes(searchTerm)
  );

  const userRequests = tickets.filter(t => t.userId === viewRequestsUserId);

  if (currentUser?.role !== 'admin') {
    return (
      <div className={styles.adminDenied}>
        <i className={`fas fa-ban ${styles.deniedIcon}`}></i>
        <h3>Доступ запрещен</h3>
        <p>У вас недостаточно прав для просмотра этого раздела</p>
      </div>
    );
  }

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  return (
    <div className={styles.adminPanel}>
      <div className={styles.section}>
        <h3>Управление запросами</h3>
        <RequestTable 
          requests={tickets} 
          onRowClick={() => {}} 
        />
      </div>

      <div className={styles.section}>
        <h3>Управление пользователями</h3>
        
        <div className={styles.searchBox}>
          <i className="fas fa-search"></i>
          <Input 
            type="text"
            placeholder="Поиск по пользователям..."
            value={searchTerm}
            onChange={handleUserSearch}
          />
        </div>
        
        {viewRequestsUserId && (
          <div className={styles.userRequestsSection}>
            <h4>Запросы пользователя</h4>
            <Button 
              variant="secondary"
              onClick={() => setViewRequestsUserId(null)}
              icon="arrow-left"
            >
              Назад
            </Button>
            <RequestTable 
              requests={userRequests} 
              onRowClick={() => {}} 
            />
          </div>
        )}
        
        {editUser ? (
          <div className={styles.editUserForm}>
            <h4>Редактирование пользователя</h4>
            <div className={styles.formGroup}>
              <label>Имя:</label>
              <Input 
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({...editUser, name: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <Input 
                type="email"
                value={editUser.email}
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label>Роль:</label>
              <Select 
                value={editUser.role}
                onChange={(value) => setEditUser({...editUser, role: value as any})}
                options={[
                  { value: 'user', label: 'Пользователь' },
                  { value: 'support', label: 'Поддержка' },
                  { value: 'admin', label: 'Администратор' },
                  { value: 'manager', label: 'Менеджер' },
                ]}
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button onClick={handleSaveUser}>Сохранить</Button>
              <Button variant="secondary" onClick={() => setEditUser(null)}>
                Отмена
              </Button>
            </div>
          </div>
        ) : !viewRequestsUserId && (
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? 'Администратор' : 
                     user.role === 'support' ? 'Поддержка' : 
                     user.role === 'manager' ? 'Менеджер' : 'Пользователь'}
                  </td>
                  <td className={user.active ? styles.active : styles.inactive}>
                    {user.active ? 'Активен' : 'Заблокирован'}
                  </td>
                  <td className={styles.actions}>
                    <Button 
                      size="small"
                      onClick={() => handleEditUser(user)}
                      icon="edit"
                    >
                      Редактировать
                    </Button>
                    <Button 
                      size="small"
                      variant="secondary"
                      onClick={() => handleViewRequests(user.id)}
                      icon="list"
                    >
                      Заявки
                    </Button>
                    <Button 
                      size="small"
                      variant={user.active ? 'error' : 'success'}
                      onClick={() => handleToggleUserStatus(user)}
                      icon={user.active ? 'lock' : 'unlock'}
                    >
                      {user.active ? 'Заблокировать' : 'Разблокировать'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;