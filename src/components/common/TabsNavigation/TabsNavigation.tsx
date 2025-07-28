import React from 'react';
import Tab from '../Tab/Tab';
import styles from './TabsNavigation.module.css';

const TabsNavigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <Tab label="Главная" path="/" exact />
      <Tab label="Запросы" path="/requests" />
      <Tab label="Профиль" path="/profile" />
      <Tab label="Помощь" path="/help" />
    </nav>
  );
};

export default TabsNavigation;