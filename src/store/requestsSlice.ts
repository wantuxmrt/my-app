import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticket, TicketStatus, Priority, Stats } from '@/types';

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
  stats: {
    total: 0,
    open: 0,
    resolved: 0,
    overdue: 0
  },
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
    filterTickets: (state, action: PayloadAction<{
      system: string;
      status: TicketStatus | 'all';
      priority: Priority | 'all';
      search: string;
    }>) => {
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

export const fetchTickets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchTicketsStart());
    
    // Заглушка - в реальном приложении здесь будет вызов API
    const mockTickets: Ticket[] = [
      {
        id: 1,
        system: '1c',
        category: 'Ошибка',
        title: 'Не работает печать документов',
        description: 'При попытке печати возникает ошибка',
        status: 'new',
        priority: 'high',
        created: '2023-05-12T14:30:00',
        userId: 1,
        organization: 'org1',
        department: 'dep1',
        comments: [],
        attachments: [],
        assignedTo: null
      },
      {
        id: 2,
        system: 'mis',
        category: 'Вопрос',
        title: 'Консультация по настройке',
        description: 'Нужна помощь в настройке модуля',
        status: 'in-progress',
        priority: 'medium',
        created: '2023-05-11T09:15:00',
        userId: 2,
        organization: 'org1',
        department: 'dep2',
        comments: [],
        attachments: [],
        assignedTo: null
      }
    ];
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch(fetchTicketsSuccess(mockTickets));
    dispatch(calculateStats());
  } catch (error: any) {
    dispatch(fetchTicketsFailure(error.message));
  }
};

export const createTicket = (ticket: Omit<Ticket, 'id'>) => 
  async (dispatch: AppDispatch) => {
    try {
      dispatch(createTicketStart());
      
      const newTicket: Ticket = {
        ...ticket,
        id: Date.now(),
        created: new Date().toISOString(),
        status: 'new'
      };
      
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(createTicketSuccess(newTicket));
      dispatch(calculateStats());
    } catch (error: any) {
      dispatch(createTicketFailure(error.message));
    }
  };

export const updateTicket = (id: number, updates: Partial<Ticket>) => 
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(updateTicketStart());
      
      const state = getState();
      const ticket = state.requests.tickets.find(t => t.id === id);
      
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      
      const updatedTicket = { ...ticket, ...updates };
      
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(updateTicketSuccess(updatedTicket));
      dispatch(calculateStats());
    } catch (error: any) {
      dispatch(updateTicketFailure(error.message));
    }
  };

export default requestsSlice.reducer;