import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchUsers, 
  updateUser, 
  toggleUserStatus 
} from '@/store/usersSlice';
import { 
  fetchTickets, 
  updateTicket 
} from '@/store/requestsSlice';
import { formatDate } from '@/utils/dateUtils';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select/Select';
import RequestTable from '@/components/requests/RequestTable/RequestTable';
import styles from './AdminPanel.module.css';
import { 
  Ticket, 
  Priority, 
  TicketStatus, 
  Role,
  User
} from '@/types/zzzOLD_types/app';

const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Получение данных из Redux store
  const { user } = useAppSelector(state => state.auth);
  const { users, loading: usersLoading } = useAppSelector(state => state.users);
  const { 
    tickets: allTickets, 
    loading: ticketsLoading 
  } = useAppSelector(state => state.requests);
  
  // Локальное состояние компонента
  const [adminUserEdit, setAdminUserEdit] = useState<User | null>(null);
  const [adminViewUser, setAdminViewUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    system: 'all',
    status: 'all' as TicketStatus | 'all',
    priority: 'all' as Priority | 'all',
    search: ''
  });

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTickets());
  }, [dispatch]);

  // Проверка прав доступа
  if (user?.role !== 'admin') {
    return (
      <div className={styles.adminPanel}>
        <div className={styles.accessDenied}>
          <i className="fas fa-ban"></i>
          <h3>Доступ запрещен</h3>
          <p>У вас недостаточно прав для доступа к этому разделу</p>
        </div>
      </div>
    );
  }

  // Фильтрация запросов
  const filteredTickets = allTickets.filter(ticket => {
    if (filters.system !== 'all' && ticket.system !== filters.system) return false;
    if (filters.status !== 'all' && ticket.status !== filters.status) return false;
    if (filters.priority !== 'all' && ticket.priority !== filters.priority) return false;
    if (filters.search) {
      const searchText = filters.search.toLowerCase();
      if (!ticket.title.toLowerCase().includes(searchText) &&
          !ticket.description.toLowerCase().includes(searchText)) {
        return false;
      }
    }
    return true;
  });

  // Обработчики фильтров
  const handleSystemFilterChange = (value: string) => {
    setFilters({...filters, system: value});
  };

  const handleStatusFilterChange = (value: string) => {
    setFilters({...filters, status: value as TicketStatus});
  };

  const handlePriorityFilterChange = (value: string) => {
    setFilters({...filters, priority: value as Priority});
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({...filters, search: e.target.value});
  };

  // Обновление данных запроса
  const handleTicketUpdate = (ticketId: number, field: string, value: any) => {
    dispatch(updateTicket({ 
      id: ticketId, 
      updates: { [field]: value } 
    }));
  };

  // Функции для рендеринга подразделов
  const renderUserTable = () => {
    const filteredUsers = users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className={styles.userManagement}>
        <h3>Управление пользователями</h3>
        <div className={styles.userSearchBox}>
          <Input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск по пользователям..."
            icon="search"
            disabled={usersLoading}
          />
        </div>
        <div className={styles.tableContainer}>
          <RequestTable
            columns={[
              { header: 'Имя', accessor: 'name' },
              { header: 'Email', accessor: 'email' },
              { 
                header: 'Роль', 
                accessor: 'role',
                render: (value) => (
                  value === 'admin' ? 'Администратор' : 
                  value === 'support' ? 'Поддержка' : 
                  value === 'manager' ? 'Менеджер' : 'Пользователь'
                )
              },
              { header: 'Организация', accessor: 'organization' },
              { header: 'Отдел', accessor: 'department' },
              { 
                header: 'Статус', 
                accessor: 'active',
                render: (value) => (
                  <span className={`${styles.userStatus} ${value ? styles.active : styles.inactive}`}>
                    {value ? 'Активен' : 'Заблокирован'}
                  </span>
                )
              },
              {
                header: 'Действия',
                accessor: 'id',
                render: (id, row) => (
                  <div className={styles.actionsCell}>
                    <Button 
                      variant="secondary" 
                      size="small"
                      icon="pen"
                      onClick={() => setAdminUserEdit(row as User)}
                      disabled={usersLoading}
                    >
                      Редактировать
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="small"
                      icon="list"
                      onClick={() => setAdminViewUser(row as User)}
                      disabled={usersLoading}
                    >
                      Заявки
                    </Button>
                    {row.active ? (
                      <Button 
                        variant="warning" 
                        size="small"
                        icon="lock"
                        onClick={() => dispatch(toggleUserStatus({ userId: id, active: false }))}
                        disabled={usersLoading}
                      >
                        Заблокировать
                      </Button>
                    ) : (
                      <Button 
                        variant="success" 
                        size="small"
                        icon="unlock"
                        onClick={() => dispatch(toggleUserStatus({ userId: id, active: true }))}
                        disabled={usersLoading}
                      >
                        Разблокировать
                      </Button>
                    )}
                  </div>
                )
              }
            ]}
            data={filteredUsers}
            emptyMessage="Пользователи не найдены"
            loading={usersLoading}
          />
        </div>
      </div>
    );
  };

  const renderUserEditForm = () => {
    if (!adminUserEdit) return null;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await dispatch(updateUser({
        id: adminUserEdit.id,
        updates: {
          name: adminUserEdit.name,
          email: adminUserEdit.email,
          role: adminUserEdit.role,
          organization: adminUserEdit.organization,
          department: adminUserEdit.department,
          active: adminUserEdit.active
        }
      }));
      setAdminUserEdit(null);
    };

    return (
      <div className={styles.userEditForm}>
        <div className={styles.adminEditTitle}>Редактирование пользователя</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Имя:</label>
            <Input 
              type="text"
              value={adminUserEdit.name}
              onChange={(e) => setAdminUserEdit({...adminUserEdit, name: e.target.value})}
              required
              disabled={usersLoading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Email:</label>
            <Input 
              type="email"
              value={adminUserEdit.email}
              onChange={(e) => setAdminUserEdit({...adminUserEdit, email: e.target.value})}
              required
              disabled={usersLoading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Роль:</label>
            <Select
              value={adminUserEdit.role}
              onChange={(value) => setAdminUserEdit({...adminUserEdit, role: value as Role})}
              options={[
                { value: 'user', label: 'Пользователь' },
                { value: 'support', label: 'Поддержка' },
                { value: 'admin', label: 'Администратор' },
                { value: 'manager', label: 'Менеджер' }
              ]}
              disabled={usersLoading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Организация:</label>
            <Select
              value={adminUserEdit.organization}
              onChange={(value) => setAdminUserEdit({...adminUserEdit, organization: value})}
              options={[
                { value: 'org1', label: 'Организация 1' },
                { value: 'org2', label: 'Организация 2' },
                { value: 'org3', label: 'Организация 3' }
              ]}
              disabled={usersLoading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Отдел:</label>
            <Select
              value={adminUserEdit.department}
              onChange={(value) => setAdminUserEdit({...adminUserEdit, department: value})}
              options={[
                { value: 'dep1', label: 'Отдел поддержки' },
                { value: 'dep2', label: 'Бухгалтерия' },
                { value: 'dep3', label: 'ИТ отдел' },
                { value: 'dep4', label: 'Отдел продаж' }
              ]}
              disabled={usersLoading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Статус:</label>
            <Select
              value={adminUserEdit.active ? 'true' : 'false'}
              onChange={(value) => setAdminUserEdit({
                ...adminUserEdit, 
                active: value === 'true'
              })}
              options={[
                { value: 'true', label: 'Активен' },
                { value: 'false', label: 'Заблокирован' }
              ]}
              disabled={usersLoading}
            />
          </div>
          
          <div className={styles.formActions}>
            <Button 
              type="submit"
              variant="primary"
              icon="save"
              disabled={usersLoading}
              loading={usersLoading}
            >
              Сохранить изменения
            </Button>
            <Button 
              variant="secondary"
              icon="times"
              onClick={() => setAdminUserEdit(null)}
              disabled={usersLoading}
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const renderUserRequests = () => {
    if (!adminViewUser) return null;

    const userTickets = allTickets.filter(t => t.userId === adminViewUser.id);

    return (
      <div className={styles.userRequests}>
        <div className={styles.adminEditTitle}>Заявки пользователя "{adminViewUser.name}"</div>
        <div className={styles.tableContainer}>
          <RequestTable
            columns={[
              { header: 'ID', accessor: 'id', width: '80px' },
              { header: 'Заголовок', accessor: 'title' },
              { 
                header: 'Система', 
                accessor: 'system',
                render: (value) => value === '1c' ? '1С' : 'МИС'
              },
              { 
                header: 'Статус', 
                accessor: 'status',
                render: (value) => (
                  <span className={`status-${value}`}>
                    {value === 'new' ? 'Новый' : 
                     value === 'in-progress' ? 'В работе' : 
                     value === 'resolved' ? 'Решен' : 'Возвращен'}
                  </span>
                )
              },
              { 
                header: 'Приоритет', 
                accessor: 'priority',
                render: (value) => (
                  <span className={`priority-${value}`}>
                    {value === 'low' ? 'Низкий' : 
                     value === 'medium' ? 'Средний' : 
                     value === 'high' ? 'Высокий' : 'Критический'}
                  </span>
                )
              },
              { 
                header: 'Дата создания', 
                accessor: 'created',
                render: (value) => formatDate(value)
              }
            ]}
            data={userTickets}
            emptyMessage="Нет запросов у этого пользователя"
            loading={ticketsLoading}
          />
        </div>
        <Button 
          variant="secondary"
          icon="arrow-left"
          onClick={() => setAdminViewUser(null)}
          className={styles.backButton}
        >
          Закрыть
        </Button>
      </div>
    );
  };

  const renderRequestsManagement = () => {
    const statusOptions = [
      { value: 'all', label: 'Все статусы' },
      { value: 'new', label: 'Новый' },
      { value: 'in-progress', label: 'В работе' },
      { value: 'resolved', label: 'Решен' },
      { value: 'reopened', label: 'Возвращен' }
    ];

    const priorityOptions = [
      { value: 'all', label: 'Все приоритеты' },
      { value: 'low', label: 'Низкий' },
      { value: 'medium', label: 'Средний' },
      { value: 'high', label: 'Высокий' },
      { value: 'critical', label: 'Критический' }
    ];

    const systemOptions = [
      { value: 'all', label: 'Все системы' },
      { value: '1c', label: '1С' },
      { value: 'mis', label: 'МИС' }
    ];

    return (
      <div className={styles.requestsManagement}>
        <h3>Управление запросами</h3>
        
        <div className={styles.adminFilters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Система</label>
            <Select
              value={filters.system}
              onChange={handleSystemFilterChange}
              options={systemOptions}
              disabled={ticketsLoading}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Статус</label>
            <Select
              value={filters.status}
              onChange={handleStatusFilterChange}
              options={statusOptions}
              disabled={ticketsLoading}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Приоритет</label>
            <Select
              value={filters.priority}
              onChange={handlePriorityFilterChange}
              options={priorityOptions}
              disabled={ticketsLoading}
            />
          </div>
          
          <div className={styles.searchBox}>
            <Input 
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Поиск по запросам..."
              icon="search"
              disabled={ticketsLoading}
            />
          </div>
        </div>
        
        <div className={styles.tableContainer}>
          <RequestTable
            columns={[
              { header: 'ID', accessor: 'id', width: '80px' },
              { header: 'Заголовок', accessor: 'title' },
              { 
                header: 'Система', 
                accessor: 'system',
                render: (value) => value === '1c' ? '1С' : 'МИС'
              },
              { 
                header: 'Статус', 
                accessor: 'status',
                render: (value, row) => (
                  <Select
                    value={value}
                    onChange={(val) => handleTicketUpdate(row.id, 'status', val)}
                    options={statusOptions.filter(opt => opt.value !== 'all')}
                    small
                    disabled={ticketsLoading}
                  />
                )
              },
              { 
                header: 'Приоритет', 
                accessor: 'priority',
                render: (value, row) => (
                  <Select
                    value={value}
                    onChange={(val) => handleTicketUpdate(row.id, 'priority', val)}
                    options={priorityOptions.filter(opt => opt.value !== 'all')}
                    small
                    disabled={ticketsLoading}
                  />
                )
              },
              { 
                header: 'Дата создания', 
                accessor: 'created',
                render: (value) => formatDate(value)
              },
              {
                header: 'Автор',
                accessor: 'userId',
                render: (value) => {
                  const author = users.find(u => u.id === value);
                  return author ? author.name : 'Неизвестно';
                }
              }
            ]}
            data={filteredTickets}
            emptyMessage="Нет запросов по выбранным фильтрам"
            loading={ticketsLoading}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.adminPanel}>
      <h2><i className="fas fa-cog"></i> Администрирование</h2>

      {adminUserEdit ? renderUserEditForm() : 
       adminViewUser ? renderUserRequests() : 
       (
         <>
           {renderRequestsManagement()}
           {renderUserTable()}
         </>
       )}
    </div>
  );
};

export default AdminPanel;