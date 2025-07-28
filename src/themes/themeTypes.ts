export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  bgColor: string;
  panelBg: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  success: string;
  warning: string;
  error: string;
  bubbleUser: string;
  bubbleBot: string;
  editColor: string;
  shadowColor: string;
  borderColor: string;
  placeholder: string;
  disabled: string;
  hover: string;
  focus: string;
  adminColor: string;
  supportColor: string;
  userColor: string;
  managerColor: string;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}