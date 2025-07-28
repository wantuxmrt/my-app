import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import UserInfo from '@/components/auth/UserInfo';
import ProfileSection from '@/components/sections/ProfileSection/ProfileSection';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Редирект или обработка неавторизованного доступа
    }
  }, [isAuthenticated]);

  if (!user) {
    return <div className={styles.loading}>Загрузка профиля...</div>;
  }

  const handleProfileUpdate = () => {
    console.log('Профиль обновлен');
    // Здесь можно добавить логику обновления данных
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Мой профиль</h1>
        <button 
          onClick={logout}
          className={styles.logoutButton}
        >
          Выйти
        </button>
      </header>

      <div className={styles.content}>
        <section className={styles.userSection}>
          <UserInfo 
            name={user.name}
            role={user.role}
            avatar={user.avatar}
            onLogout={logout}
          />
        </section>
        
        <section className={styles.profileSection}>
          <ProfileSection onUpdate={handleProfileUpdate} />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;