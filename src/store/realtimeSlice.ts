// realtimeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticket } from '@/types/ticketTypes';

interface RealtimeState {
  onlineUsers: number;
  ticketUpdates: Ticket[];
  lastUpdate: number | null;
}

const initialState: RealtimeState = {
  onlineUsers: 0,
  ticketUpdates: [],
  lastUpdate: null
};

const realtimeSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    setOnlineUsers(state, action: PayloadAction<number>) {
      state.onlineUsers = action.payload;
    },
    addTicketUpdate(state, action: PayloadAction<Ticket>) {
      state.ticketUpdates.push(action.payload);
      state.lastUpdate = Date.now();
    },
    clearTicketUpdates(state) {
      state.ticketUpdates = [];
      state.lastUpdate = null;
    },
    applyTicketUpdates(state) {
      state.ticketUpdates = [];
      state.lastUpdate = null;
    }
  }
});

export const { 
  setOnlineUsers, 
  addTicketUpdate, 
  clearTicketUpdates,
  applyTicketUpdates
} = realtimeSlice.actions;
export default realtimeSlice.reducer;