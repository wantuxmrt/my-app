import React from 'react';
import styles from './AppHeader.module.css';

const AppHeader: React.FC = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.logo}>Логотип</div>
      <nav className={styles.navigation}>
        <a href="/" className={styles.navLink}>Главная</a>
        <a href="/requests" className={styles.navLink}>Запросы</a>
        <a href="/help" className={styles.navLink}>Помощь</a>
      </nav>
      <div className={styles.userSection}>
        <button className={styles.authButton}>Войти</button>
      </div>
    </header>
  );
};

export default AppHeader;