import 'styled-components';
import { Theme } from './themeTypes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: Theme['colors'];
    shadows: Theme['shadows'];
    breakpoints: Theme['breakpoints'];
  }
}