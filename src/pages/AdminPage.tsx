import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AdminPanel } from '@/components/sections'; // Исправленный импорт
import { ModerationPanel } from '@/components/sections'; // Исправленный импорт
import styles from './AdminPage.module.css';
import { useNavigate } from 'react-router-dom'; // Добавим редирект

const AdminPage = () => {
  const { user, isAuthenticated, checkPermission } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Редирект на страницу входа
      return;
    }
    
    if (!checkPermission('admin')) {
      navigate('/', { state: { error: 'Доступ запрещен' } }); // Редирект с сообщением
    }
  }, [isAuthenticated, checkPermission, navigate]);

  if (!user || !checkPermission('admin')) {
    return (
      <div className={styles.loading}>
        Проверка прав доступа...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Панель администратора</h1>
      
      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Управление пользователями</h2>
          <AdminPanel />
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Модерация заявок</h2>
          <ModerationPanel />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;