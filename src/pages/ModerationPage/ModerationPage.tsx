import React, { useEffect, useState, useCallback } from 'react';
import { useAuthStore, useRequestsStore } from '@/store';
import RequestTable from '@/components/requests/RequestTable/RequestTable';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select/Select';
import styles from './ModerationPage.module.css';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import MainContent from '@/components/layout/MainContent/MainContent';
import { Priority, TicketStatus } from '@/types/zzzOLD_types/app';
import { formatDate } from '@/utils/dateUtils';
import TicketModal from '@/components/requests/TicketModal/TicketModal';
import { Ticket } from '@/types/zzzOLD_types/app';

const ModerationPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    tickets, 
    filteredTickets, 
    filterTickets, 
    fetchTickets,
    updateTicket,
    setCurrentTicket
  } = useRequestsStore();
  
  const [departmentRequests, setDepartmentRequests] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState({
    system: 'all',
    status: 'all' as TicketStatus | 'all',
    priority: 'all' as Priority | 'all',
    search: ''
  });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Загрузка данных
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await fetchTickets();
      } catch (err) {
        setError('Не удалось загрузить запросы');
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [fetchTickets]);

  // Фильтрация запросов по отделу менеджера
  useEffect(() => {
    if (user && tickets.length > 0) {
      const requests = tickets.filter(t => 
        t.department === user.department && 
        t.organization === user.organization
      );
      
      setDepartmentRequests(requests);
    }
  }, [user, tickets]);

  // Применение фильтров
  const applyFilters = useCallback(() => {
    if (!user) return;

    filterTickets({
      ...filters,
      // Добавляем фильтр по отделу и организации
      department: user.department,
      organization: user.organization
    });
  }, [filters, user, filterTickets]);

  // Автоматическое применение фильтров при изменении
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Обработчики фильтров
  const handleSystemFilterChange = (value: string) => {
    setFilters(prev => ({...prev, system: value}));
  };

  const handleStatusFilterChange = (value: string) => {
    setFilters(prev => ({...prev, status: value as TicketStatus}));
  };

  const handlePriorityFilterChange = (value: string) => {
    setFilters(prev => ({...prev, priority: value as Priority}));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({...prev, search: e.target.value}));
  };

  const handleResetFilters = () => {
    setFilters({
      system: 'all',
      status: 'all',
      priority: 'all',
      search: ''
    });
  };

  // Обновление статуса тикета
  const handleStatusUpdate = (ticketId: number, newStatus: TicketStatus) => {
    updateTicket(ticketId, { status: newStatus });
  };

  // Открытие деталей тикета
  const handleOpenTicketDetails = (ticket: Ticket) => {
    setCurrentTicket(ticket);
    setSelectedTicket(ticket);
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setSelectedTicket(null);
    setCurrentTicket(null);
  };

  // Обновление тикета в модалке
  const handleTicketUpdateInModal = (updatedTicket: Ticket) => {
    updateTicket(updatedTicket.id, updatedTicket);
    setSelectedTicket(updatedTicket);
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

  // Статистика
  const stats = {
    total: departmentRequests.length,
    open: departmentRequests.filter(t => t.status !== 'resolved').length,
    urgent: departmentRequests.filter(t => 
      t.priority === 'critical' || t.priority === 'high'
    ).length,
    overdue: departmentRequests.filter(t => 
      t.status === 'in-progress' && 
      new Date(t.created) < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    ).length
  };

  // Опции для фильтров
  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'new', label: 'Новый' },
    { value: 'in-progress', label: 'В работе' },
    { value: 'resolved', label: 'Решен' }
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

          {error && (
            <div className={styles.errorAlert}>
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <div className={styles.controls}>
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <label>Система</label>
                <Select
                  value={filters.system}
                  onChange={handleSystemFilterChange}
                  options={systemOptions}
                  disabled={isLoading}
                />
              </div>
              
              <div className={styles.filterGroup}>
                <label>Статус</label>
                <Select
                  value={filters.status}
                  onChange={handleStatusFilterChange}
                  options={statusOptions}
                  disabled={isLoading}
                />
              </div>
              
              <div className={styles.filterGroup}>
                <label>Приоритет</label>
                <Select
                  value={filters.priority}
                  onChange={handlePriorityFilterChange}
                  options={priorityOptions}
                  disabled={isLoading}
                />
              </div>
              
              <div className={styles.searchBox}>
                <Input
                  type="text"
                  value={filters.search}
                  onChange={handleSearchChange}
                  placeholder="Поиск по запросам..."
                  icon="search"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className={styles.actions}>
              <Button 
                onClick={handleResetFilters}
                variant="secondary"
                icon="filter"
                disabled={isLoading}
              >
                Сбросить фильтры
              </Button>
              <Button 
                onClick={() => fetchTickets()}
                icon="sync"
                loading={isLoading}
                disabled={isLoading}
              >
                Обновить
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className={styles.loading}>
              <i className="fas fa-spinner fa-spin"></i> Загрузка запросов...
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className={styles.emptyState}>
              <i className="fas fa-inbox"></i>
              <h3>Нет запросов</h3>
              <p>В вашем отделе пока нет запросов по выбранным фильтрам</p>
            </div>
          ) : (
            <>
              <RequestTable 
                tickets={filteredTickets} 
                onRowClick={handleOpenTicketDetails}
                showDepartment={false}
                showActions={true}
                onStatusChange={handleStatusUpdate}
              />
              
              <div className={styles.stats}>
                <div className={styles.statCard}>
                  <h4>Всего запросов</h4>
                  <p>{stats.total}</p>
                </div>
                <div className={styles.statCard}>
                  <h4>Открытые</h4>
                  <p>{stats.open}</p>
                </div>
                <div className={styles.statCard}>
                  <h4>Срочные</h4>
                  <p>{stats.urgent}</p>
                </div>
                <div className={styles.statCard}>
                  <h4>Просроченные</h4>
                  <p>{stats.overdue}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </MainContent>
      
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={handleCloseModal}
          onUpdate={handleTicketUpdateInModal}
          mode="moderation"
        />
      )}
    </div>
  );
};

export default ModerationPage;