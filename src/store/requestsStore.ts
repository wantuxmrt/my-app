import { create } from 'zustand';
import { Ticket, TicketStatus, Priority, TicketSystem } from '../types/app.d';

interface RequestsState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  filters: {
    system: TicketSystem | 'all';
    status: TicketStatus | 'all';
    priority: Priority | 'all';
    search: string;
  };
  viewMode: 'grid' | 'list';
  
  fetchTickets: () => Promise<void>;
  createTicket: (ticket: Omit<Ticket, 'id' | 'created'>) => Promise<Ticket>;
  updateTicket: (id: number, updates: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: number) => Promise<void>;
  selectTicket: (ticket: Ticket | null) => void;
  setFilters: (filters: Partial<RequestsState['filters']>) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  addComment: (ticketId: number, text: string, author: string) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  tickets: [],
  selectedTicket: null,
  filters: {
    system: 'all',
    status: 'all',
    priority: 'all',
    search: ''
  },
  viewMode: 'grid',
  
  fetchTickets: async () => {
    const mockTickets: Ticket[] = [/* ... */];
    set({ tickets: mockTickets });
  },
  
  createTicket: async (ticket: Omit<Ticket, 'id' | 'created'>) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Date.now(),
      created: new Date().toISOString(),
      status: 'new'
    };
    
    set(state => ({ tickets: [...state.tickets, newTicket] }));
    return newTicket;
  },
  
  updateTicket: async (id: number, updates: Partial<Ticket>) => {
    set(state => ({
      tickets: state.tickets.map(ticket => 
        ticket.id === id ? { ...ticket, ...updates } : ticket
      )
    }));
  },
  
  deleteTicket: async (id: number) => {
    set(state => ({ tickets: state.tickets.filter(ticket => ticket.id !== id) }));
  },
  
  selectTicket: (ticket: Ticket | null) => set({ selectedTicket: ticket }),
  
  setFilters: (filters: Partial<RequestsState['filters']>) => 
    set(state => ({ filters: { ...state.filters, ...filters } })),
  
  setViewMode: (mode: 'grid' | 'list') => set({ viewMode: mode }),
  
  addComment: (ticketId: number, text: string, author: string) => {
    set(state => ({
      tickets: state.tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            comments: [
              ...ticket.comments, 
              { author, text, time: new Date().toISOString() }
            ]
          };
        }
        return ticket;
      })
    }));
  }
}));