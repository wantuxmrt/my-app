import React from 'react';
import styles from './AppHeader.module.css';
import { User } from '@/types/app';

interface AppHeaderProps {
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  user, 
  onLogin, 
  onRegister, 
  onLogout 
}) => {
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
      <div className={styles.logo}>Ассистент</div>
      
      {user ? (
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.name}</div>
          <div className={`${styles.userRole} ${getRoleClass(user.role)}`}>
            {getRoleText(user.role)}
          </div>
          <div className={styles.userAvatar}>
            {user.avatar}
          </div>
          <button 
            className={styles.logoutButton}
            onClick={onLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <button 
            className={styles.authButton}
            onClick={onLogin}
          >
            <i className="fas fa-sign-in-alt"></i> Вход
          </button>
          <button 
            className={styles.authButton}
            onClick={onRegister}
          >
            <i className="fas fa-user-plus"></i> Регистрация
          </button>
        </div>
      )}
    </header>
  );
};

export default AppHeader;