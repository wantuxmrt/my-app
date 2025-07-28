import React from 'react';
import styles from './UserInfo.module.css';
import Button from '../common/Button/Button';

interface UserInfoProps {
  name: string;
  role: string;
  avatar?: string;
  onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ 
  name, 
  role, 
  avatar,
  onLogout 
}) => {
  const getRoleClass = () => {
    switch(role) {
      case 'admin': return styles.roleAdmin;
      case 'support': return styles.roleSupport;
      case 'manager': return styles.roleManager;
      default: return styles.roleUser;
    }
  };

  const getRoleLabel = () => {
    switch(role) {
      case 'admin': return 'Администратор';
      case 'support': return 'Поддержка';
      case 'manager': return 'Менеджер';
      default: return 'Пользователь';
    }
  };

  return (
    <div className={styles.userInfo}>
      {avatar ? (
        <img 
          src={avatar} 
          alt={`Аватар ${name}`} 
          className={styles.userAvatar} 
        />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className={styles.userDetails}>
        <div className={styles.userName}>{name}</div>
        <div className={`${styles.userRole} ${getRoleClass()}`}>
          {getRoleLabel()}
        </div>
      </div>
      <button 
        onClick={onLogout}
        aria-label="Выйти из системы"
        className={styles.logoutButton}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8V6C14 4.89543 13.1046 4 12 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H12C13.1046 20 14 19.1046 14 18V16" stroke="#ff6b6b" strokeWidth="2"/>
          <path d="M21 12H9M21 12L17 8M21 12L17 16" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default UserInfo;