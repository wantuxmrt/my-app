// src/store/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '@/types/themeTypes';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  id?: string;
  timeout?: number;
}

interface UIState {
  theme: Theme;
  isSidebarOpen: boolean;
  notifications: Notification[];
  modals: {
    [key: string]: boolean;
  };
}

// Попытка получить тему из localStorage
const savedTheme = localStorage.getItem('theme') as Theme | null;

const initialState: UIState = {
  theme: savedTheme || 'light',
  isSidebarOpen: true,
  notifications: [],
  modals: {}
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    showNotification(state, action: PayloadAction<Notification>) {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timeout: action.payload.timeout || 5000
      };
      state.notifications.push(notification);
    },
    hideNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      );
    },
    openModal(state, action: PayloadAction<string>) {
      state.modals[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<string>) {
      state.modals[action.payload] = false;
    },
    toggleModal(state, action: PayloadAction<string>) {
      state.modals[action.payload] = !state.modals[action.payload];
    }
  }
});

export const { 
  toggleTheme, 
  setTheme, 
  toggleSidebar, 
  showNotification, 
  hideNotification,
  openModal,
  closeModal,
  toggleModal
} = uiSlice.actions;

// Экспортируем thunk для автоматического скрытия уведомлений
export const showTimedNotification = (notification: Notification) => (dispatch: any) => {
  const id = Date.now().toString();
  dispatch(showNotification({ ...notification, id }));
  
  if (notification.timeout !== 0) {
    setTimeout(() => {
      dispatch(hideNotification(id));
    }, notification.timeout || 5000);
  }
};

export default uiSlice.reducer;