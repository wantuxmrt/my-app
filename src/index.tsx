import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import App from './App';
import './assets/styles/global.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './themes/ThemeProvider';

// Исправление ошибки типов для react-dom/client
declare module 'react-dom/client' {
  function createRoot(container: Element | DocumentFragment, options?: RootOptions): Root;
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();