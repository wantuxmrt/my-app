// requestsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { requestsAPI } from '@/services/api/requestsAPI';
import { Ticket, TicketStatus, TicketPriority, TicketFilter } from '@/types/ticketTypes';

interface RequestsState {
  tickets: Ticket[];
  currentTicket: Ticket | null;
  loading: boolean;
  error: string | null;
  stats: {
    open: number;
    closed: number;
    inProgress: number;
    highPriority: number;
  };
  filters: TicketFilter;
}

const initialState: RequestsState = {
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
  stats: {
    open: 0,
    closed: 0,
    inProgress: 0,
    highPriority: 0
  },
  filters: {
    status: undefined,
    priority: undefined,
    assignee: undefined
  }
};

export const fetchTickets = createAsyncThunk(
  'requests/fetchTickets',
  async (params: TicketFilter = {}, { rejectWithValue }) => {
    try {
      const tickets = await requestsAPI.fetchTickets(params);
      return tickets;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  'requests/fetchTicketById',
  async (id: string, { rejectWithValue }) => {
    try {
      const ticket = await requestsAPI.fetchTicketById(id);
      return ticket;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewTicket = createAsyncThunk(
  'requests/createNewTicket',
  async (ticketData: Omit<Ticket, 'id'>, { rejectWithValue }) => {
    try {
      const ticket = await requestsAPI.createTicket(ticketData);
      return ticket;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<TicketFilter>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentTicket(state) {
      state.currentTicket = null;
    },
    updateTicketInList(state, action: PayloadAction<Ticket>) {
      state.tickets = state.tickets.map(ticket => 
        ticket.id === action.payload.id ? action.payload : ticket
      );
    },
    addTicketToList(state, action: PayloadAction<Ticket>) {
      state.tickets.unshift(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.loading = false;
        state.tickets = action.payload;
        
        // Calculate stats
        state.stats = {
          open: action.payload.filter(t => t.status === 'open').length,
          closed: action.payload.filter(t => t.status === 'closed').length,
          inProgress: action.payload.filter(t => t.status === 'pending').length,
          highPriority: action.payload.filter(t => t.priority === 'high').length
        };
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketById.fulfilled, (state, action: PayloadAction<Ticket>) => {
        state.loading = false;
        state.currentTicket = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTicket.fulfilled, (state, action: PayloadAction<Ticket>) => {
        state.loading = false;
        state.tickets.unshift(action.payload);
      })
      .addCase(createNewTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { 
  setFilters, 
  clearCurrentTicket, 
  updateTicketInList,
  addTicketToList
} = requestsSlice.actions;
export default requestsSlice.reducer;