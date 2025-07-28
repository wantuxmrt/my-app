import { User, Ticket, Stats, AppState } from './app';

// Auth Store
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string };

// Tickets Store
export interface TicketsState {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  currentTicket: Ticket | null;
  stats: Stats;
  loading: boolean;
  error: string | null;
}

export type TicketsAction =
  | { type: 'FETCH_TICKETS_REQUEST' }
  | { type: 'FETCH_TICKETS_SUCCESS'; payload: Ticket[] }
  | { type: 'FETCH_TICKETS_FAILURE'; payload: string }
  | { type: 'CREATE_TICKET_REQUEST' }
  | { type: 'CREATE_TICKET_SUCCESS'; payload: Ticket }
  | { type: 'CREATE_TICKET_FAILURE'; payload: string }
  | { type: 'UPDATE_TICKET_REQUEST' }
  | { type: 'UPDATE_TICKET_SUCCESS'; payload: Ticket }
  | { type: 'UPDATE_TICKET_FAILURE'; payload: string }
  | { type: 'SET_CURRENT_TICKET'; payload: Ticket | null }
  | { type: 'FILTER_TICKETS'; payload: Ticket[] };

// UI Store
export interface UIState {
  currentTab: string;
  viewMode: 'grid' | 'list';
  modal: {
    type: 'login' | 'register' | null;
    open: boolean;
  };
}

export type UIAction =
  | { type: 'SET_CURRENT_TAB'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: 'grid' | 'list' }
  | { type: 'OPEN_MODAL'; payload: 'login' | 'register' }
  | { type: 'CLOSE_MODAL' };

// Root Store
export interface RootState {
  auth: AuthState;
  tickets: TicketsState;
  ui: UIState;
}