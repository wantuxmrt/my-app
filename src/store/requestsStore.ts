// src/store/requestsStore.ts
import { create } from 'zustand';
import { Ticket, TicketStatus, Priority } from '../types/app.d';

interface Stats {
  total: number;
  open: number;
  resolved: number;
  overdue: number;
}

interface RequestsState {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  currentTicket: Ticket | null;
  stats: Stats;
  fetchTickets: () => void;
  filterTickets: () => void;
  setCurrentTicket: (ticket: Ticket | null) => void;
  createTicket: (ticket: Omit<Ticket, 'id'>) => void;
  updateTicket: (id: number, updates: Partial<Ticket>) => void;
  calculateStats: () => void;
}

export const useRequestsStore = create<RequestsState>((set, get) => ({
  tickets: [],
  filteredTickets: [],
  currentTicket: null,
  stats: {
    total: 0,
    open: 0,
    resolved: 0,
    overdue: 0
  },
  
  fetchTickets: () => {
    // Заглушка - в реальном приложении здесь будет вызов API
    const mockTickets: Ticket[] = [
      {
        id: 1,
        system: '1c',
        category: 'Ошибка',
        title: 'Не работает печать документов',
        description: 'При попытке печати возникает ошибка',
        status: 'new' as TicketStatus,
        priority: 'high' as Priority,
        created: '2023-05-12T14:30:00',
        userId: 1,
        organization: 'org1',
        department: 'dep1',
        comments: [],
        attachments: []
      },
      {
        id: 2,
        system: 'mis',
        category: 'Вопрос',
        title: 'Консультация по настройке',
        description: 'Нужна помощь в настройке модуля',
        status: 'in-progress' as TicketStatus,
        priority: 'medium' as Priority,
        created: '2023-05-11T09:15:00',
        userId: 2,
        organization: 'org1',
        department: 'dep2',
        comments: [],
        attachments: []
      }
    ];
    
    set({ 
      tickets: mockTickets,
      filteredTickets: mockTickets
    });
    get().calculateStats();
  },
  
  filterTickets: () => {
    // Фильтрация будет реализована позже
    set({ filteredTickets: get().tickets });
  },
  
  setCurrentTicket: (ticket) => set({ currentTicket: ticket }),
  
  createTicket: (ticket) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Date.now(),
      created: new Date().toISOString(),
      status: 'new' as TicketStatus
    };
    
    set(state => ({
      tickets: [...state.tickets, newTicket],
      filteredTickets: [...state.filteredTickets, newTicket]
    }));
    get().calculateStats();
  },
  
  updateTicket: (id, updates) => {
    set(state => ({
      tickets: state.tickets.map(t => 
        t.id === id ? { ...t, ...updates } : t
      ),
      filteredTickets: state.filteredTickets.map(t => 
        t.id === id ? { ...t, ...updates } : t
      )
    }));
    get().calculateStats();
  },
  
  calculateStats: () => {
    const tickets = get().tickets;
    set({
      stats: {
        total: tickets.length,
        open: tickets.filter(t => t.status !== 'resolved').length,
        resolved: tickets.filter(t => t.status === 'resolved').length,
        overdue: tickets.filter(t => t.status === 'reopened').length
      }
    });
  }
}));