import { create } from 'zustand';

interface UIState {
  activeTab: string;
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'register';
  isTicketModalOpen: boolean;
  ticketModalMode: 'create' | 'edit';
  
  setActiveTab: (tab: string) => void;
  openAuthModal: (type: 'login' | 'register') => void;
  closeAuthModal: () => void;
  openTicketModal: (mode: 'create' | 'edit') => void;
  closeTicketModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'my-requests',
  isAuthModalOpen: false,
  authModalType: 'login',
  isTicketModalOpen: false,
  ticketModalMode: 'create',
  
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  openAuthModal: (type: 'login' | 'register') => set({ isAuthModalOpen: true, authModalType: type }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  openTicketModal: (mode: 'create' | 'edit') => set({ isTicketModalOpen: true, ticketModalMode: mode }),
  closeTicketModal: () => set({ isTicketModalOpen: false })
}));