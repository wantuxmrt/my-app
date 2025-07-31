import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { Stats, TicketSystem, TicketStatus, Priority } from '@/types/app';

interface SidebarProps {
  stats: Stats;
  onFilterChange: (filters: {
    system: TicketSystem | 'all';
    status: TicketStatus | 'all';
    priority: Priority | 'all';
    search: string;
  }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ stats, onFilterChange }) => {
  const [filters, setFilters] = useState({
    system: 'all' as TicketSystem | 'all',
    status: 'all' as TicketStatus | 'all',
    priority: 'all' as Priority | 'all',
    search: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filtersSection}>
        <div className={styles.sectionTitle}>
          <i className="fas fa-filter"></i> Фильтры
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Система</label>
          <select 
            className={styles.filterSelect}
            value={filters.system}
            onChange={(e) => handleFilterChange('system', e.target.value)}
          >
            <option value="all">Все системы</option>
            <option value="1c">1С</option>
            <option value="mis">МИС</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Статус</label>
          <select 
            className={styles.filterSelect}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="new">Новый</option>
            <option value="in-progress">В работе</option>
            <option value="resolved">Решен</option>
            <option value="reopened">Возвращен</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Приоритет</label>
          <select 
            className={styles.filterSelect}
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="all">Все приоритеты</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
            <option value="critical">Критический</option>
          </select>
        </div>
        
        <div className={styles.searchBox}>
          <i className={`fas fa-search ${styles.searchIcon}`}></i>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Поиск по запросам..." 
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        <button 
          className={styles.filterButton}
          onClick={() => onFilterChange(filters)}
        >
          Применить фильтры
        </button>
      </div>
      
      <div className={styles.filtersSection}>
        <div className={styles.sectionTitle}>
          <i className="fas fa-chart-pie"></i> Статистика
        </div>
        
        <div className={styles.statItem}>
          <div>Всего запросов: <strong>{stats.total}</strong></div>
          <div>Открытые: <strong className={styles.statusOpen}>{stats.open}</strong></div>
          <div>Решенные: <strong className={styles.statusResolved}>{stats.resolved}</strong></div>
          <div>Просроченные: <strong className={styles.statusOverdue}>{stats.overdue}</strong></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;