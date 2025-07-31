import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeTab: string;
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'register';
  isTicketModalOpen: boolean;
  ticketModalMode: 'create' | 'edit' | 'view';
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
    openAuthModal: (state, action: PayloadAction<'login' | 'register'>) => {
      state.isAuthModalOpen = true;
      state.authModalType = action.payload;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    openTicketModal: (state, action: PayloadAction<'create' | 'edit'>) => {
      state.isTicketModalOpen = true;
      state.ticketModalMode = action.payload;
    },
    closeTicketModal: (state) => {
      state.isTicketModalOpen = false;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
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
} = uiSlice.actions;

export default uiSlice.reducer;