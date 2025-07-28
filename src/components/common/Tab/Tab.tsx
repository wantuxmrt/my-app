import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Tab.module.css';

export interface TabProps {
  label: string;
  path?: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  exact?: boolean;
}

const Tab: React.FC<TabProps> = ({ 
  label, 
  path, 
  active = false, 
  onClick, 
  icon,
  exact = false
}) => {
  // Для навигационных табов используем NavLink
  if (path) {
    return (
      <NavLink
        to={path}
        end={exact}
        className={({ isActive }) => 
          `${styles.tab} ${isActive ? styles.active : ''}`
        }
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {label}
      </NavLink>
    );
  }

  // Для обычных табов (без навигации)
  return (
    <div
      className={`${styles.tab} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </div>
  );
};

export default Tab;