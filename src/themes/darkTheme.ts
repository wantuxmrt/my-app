import { Theme } from './themeTypes';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: '#121212',
    bgColor: '#1e1e1e',
    panelBg: '#252525',
    primary: '#90caf9',
    secondary: '#f48fb1',
    accent: '#a5d6a7',
    text: '#e0e0e0',
    success: '#81c784',
    warning: '#ffb74d',
    error: '#e57373',
    bubbleUser: '#424242',
    bubbleBot: '#2d2d5a',
    editColor: '#fff176',
    shadowColor: 'rgba(0,0,0,0.5)',
    borderColor: '#444444',
    placeholder: '#757575',
    disabled: '#616161',
    hover: '#2d2d2d',
    focus: '#37474f',
    adminColor: '#ff79a8',
    supportColor: '#7c4dff',
    userColor: '#26c6da',
    managerColor: '#76ff03',
  },
  shadows: {
    small: '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.7)',
    medium: '0 3px 6px rgba(0,0,0,0.7), 0 3px 6px rgba(0,0,0,0.8)',
    large: '0 10px 20px rgba(0,0,0,0.8), 0 6px 6px rgba(0,0,0,0.9)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};