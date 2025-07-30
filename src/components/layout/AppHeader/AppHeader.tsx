// src/components/layout/AppHeader.tsx
import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import styles from './AppHeader.module.css';
import { User } from '@/types/app';

const AppHeader = () => {
  const { currentUser, login, logout } = useAppContext();

  const getRoleClass = (role: string) => {
    switch (role) {
      case 'admin': return styles.roleAdmin;
      case 'support': return styles.roleSupport;
      case 'manager': return styles.roleManager;
      default: return styles.roleUser;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'support': return 'Поддержка';
      case 'manager': return 'Менеджер';
      default: return 'Пользователь';
    }
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.logo}>Поддержка 1С/МИС</div>
      
      {currentUser ? (
        <div className={styles.userInfo}>
          <div className={styles.userName}>{currentUser.name}</div>
          <div className={`${styles.userRole} ${getRoleClass(currentUser.role)}`}>
            {getRoleText(currentUser.role)}
          </div>
          <div className={styles.userAvatar}>
            {currentUser.avatar}
          </div>
          <button 
            className={styles.logoutButton}
            onClick={logout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <button 
            className={styles.authButton}
            onClick={() => login('demo@example.com', 'demo123')}
          >
            <i className="fas fa-sign-in-alt"></i> Вход
          </button>
          <button 
            className={styles.authButton}
            onClick={() => login('demo@example.com', 'demo123')}
          >
            <i className="fas fa-user-plus"></i> Регистрация
          </button>
        </div>
      )}
    </header>
  );
};

export default AppHeader;