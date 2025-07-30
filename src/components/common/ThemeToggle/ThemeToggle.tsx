import React from 'react';
import { useTheme } from '../../../themes/ThemeProvider';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Переключить тему">
      <i className={`fas fa-${themeName === 'light' ? 'moon' : 'sun'}`}></i>
    </button>
  );
};

export default ThemeToggle;
