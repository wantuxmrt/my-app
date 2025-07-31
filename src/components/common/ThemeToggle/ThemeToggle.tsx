import React from 'react';
import styles from './ThemeToggle.module.css';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <i className={`fas fa-${themeName === 'light' ? 'moon' : 'sun'}`} />
    </button>
  );
};

export default ThemeToggle;