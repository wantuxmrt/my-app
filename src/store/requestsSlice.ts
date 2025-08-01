import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Ticket, TicketStatus, Priority, Stats } from '@/types/zzzOLD_types';
import type { RootState } from '@/store/index';

interface RequestsState {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  currentTicket: Ticket | null;
  stats: Stats;
  loading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  tickets: [],
  filteredTickets: [],
  currentTicket: null,
  stats: { total: 0, open: 0, resolved: 0, overdue: 0 },
  loading: false,
  error: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    fetchTicketsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTicketsSuccess: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
      state.filteredTickets = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTicketsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    filterTickets: (
      state,
      action: PayloadAction<{
        system: string;
        status: TicketStatus | 'all';
        priority: Priority | 'all';
        search: string;
      }>
    ) => {
      const { system, status, priority, search } = action.payload;
      
      state.filteredTickets = state.tickets.filter(ticket => {
        const matchesSystem = system === 'all' || ticket.system === system;
        const matchesStatus = status === 'all' || ticket.status === status;
        const matchesPriority = priority === 'all' || ticket.priority === priority;
        const matchesSearch = search === '' || 
          ticket.title.toLowerCase().includes(search.toLowerCase()) ||
          ticket.description.toLowerCase().includes(search.toLowerCase());
          
        return matchesSystem && matchesStatus && matchesPriority && matchesSearch;
      });
    },
    setCurrentTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.currentTicket = action.payload;
    },
    createTicketStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTicketSuccess: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
      state.filteredTickets.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTicketFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTicketStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTicketSuccess: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
        state.filteredTickets = [...state.tickets];
      }
      
      if (state.currentTicket?.id === action.payload.id) {
        state.currentTicket = action.payload;
      }
      
      state.loading = false;
      state.error = null;
    },
    updateTicketFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    calculateStats: (state) => {
      state.stats = {
        total: state.tickets.length,
        open: state.tickets.filter(t => t.status !== 'resolved').length,
        resolved: state.tickets.filter(t => t.status === 'resolved').length,
        overdue: state.tickets.filter(t => t.status === 'reopened').length
      };
    },
  },
});

// Селекторы
export const selectFilteredTickets = (state: RootState) => 
  state.requests.filteredTickets;

export const selectStats = (state: RootState) => 
  state.requests.stats;

export const selectCurrentTicket = (state: RootState) => 
  state.requests.currentTicket;

export const selectLoading = (state: RootState) => 
  state.requests.loading;

export const {
  filterTickets,
  setCurrentTicket,
  calculateStats,
  fetchTicketsStart,
  fetchTicketsSuccess,
  fetchTicketsFailure,
  createTicketStart,
  createTicketSuccess,
  createTicketFailure,
  updateTicketStart,
  updateTicketSuccess,
  updateTicketFailure,
} = requestsSlice.actions;

export default requestsSlice.reducer;