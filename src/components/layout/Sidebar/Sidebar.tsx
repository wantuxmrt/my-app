// src/components/layout/Sidebar.tsx
import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { tickets } = useAppContext();
  
  // Статистика
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status !== 'resolved').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    overdue: tickets.filter(t => t.status === 'reopened').length,
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filtersSection}>
        <div className={styles.sectionTitle}>
          <i className="fas fa-filter"></i> Фильтры
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Система</label>
          <select className={styles.filterSelect}>
            <option value="all">Все системы</option>
            <option value="1c">1С</option>
            <option value="mis">МИС</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Статус</label>
          <select className={styles.filterSelect}>
            <option value="all">Все статусы</option>
            <option value="new">Новый</option>
            <option value="in-progress">В работе</option>
            <option value="resolved">Решен</option>
            <option value="reopened">Возвращен</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Приоритет</label>
          <select className={styles.filterSelect}>
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
          />
        </div>
        
        <button className={styles.filterButton}>
          Применить фильтры
        </button>
        
        <div className={styles.viewToggle}>
          <button className={`${styles.viewButton} ${styles.active}`}>
            <i className="fas fa-th"></i>
          </button>
          <button className={styles.viewButton}>
            <i className="fas fa-list"></i>
          </button>
        </div>
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