import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthModalType = 'login' | 'register';
type TicketModalMode = 'create' | 'edit' | 'view';

interface UIState {
  activeTab: string;
  isAuthModalOpen: boolean;
  authModalType: AuthModalType;
  isTicketModalOpen: boolean;
  ticketModalMode: TicketModalMode;
  viewMode: 'grid' | 'list';
}

const initialState: UIState = {
  activeTab: 'my-requests',
  isAuthModalOpen: false,
  authModalType: 'login',
  isTicketModalOpen: false,
  ticketModalMode: 'create',
  viewMode: 'grid',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    openAuthModal: (state, action: PayloadAction<AuthModalType>) => {
      state.isAuthModalOpen = true;
      state.authModalType = action.payload;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    openTicketModal: (state, action: PayloadAction<TicketModalMode>) => {
      state.isTicketModalOpen = true;
      state.ticketModalMode = action.payload;
    },
    closeTicketModal: (state) => {
      state.isTicketModalOpen = false;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    // Добавлен экшен для смены типа модалки без открытия/закрытия
    setAuthModalType: (state, action: PayloadAction<AuthModalType>) => {
      state.authModalType = action.payload;
    },
  },
});

export const {
  setActiveTab,
  openAuthModal,
  closeAuthModal,
  openTicketModal,
  closeTicketModal,
  setViewMode,
  setAuthModalType, // Экспортируем новый экшен
} = uiSlice.actions;

export default uiSlice.reducer;