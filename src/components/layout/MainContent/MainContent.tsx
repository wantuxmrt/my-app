import React from 'react';
import styles from './MainContent.module.css';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.mainContent}>{children}</div>;
};

export default MainContent;