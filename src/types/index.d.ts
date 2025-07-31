// types/index.d.ts

// ===================== Общие типы приложения =====================
export type Role = 'admin' | 'support' | 'user' | 'manager';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type TicketStatus = 'new' | 'in-progress' | 'resolved' | 'reopened' | 'closed';
export type TicketSystem = '1c' | 'mis';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  password?: string;
  active: boolean;
  organization: string;
  department: string;
  position?: string;
}

export interface Ticket {
  id: number;
  system: TicketSystem;
  category: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  created: string;
  userId: number;
  assignedTo?: number | null;
  organization: string;
  department: string;
  comments: Comment[];
  attachments: string[];
  subcategory?: string;
}

export interface Comment {
  id?: number;
  author: string;
  userId?: number;
  text: string;
  time: string;
}

export interface Stats {
  total: number;
  open: number;
  resolved: number;
  overdue: number;
}

export interface ProblemCategory {
  id: string;
  name: string;
}

// ===================== Типы форм =====================
export interface RequestFormData {
  title: string;
  description: string;
  attachments: string[];
  files?: File[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  organization: string;
  department: string;
}

// ===================== Типы администрирования =====================
export type ServerStatus = 
  | 'running' 
  | 'stopped' 
  | 'warning' 
  | 'error' 
  | 'maintenance' 
  | 'unknown';

export type ServerType = 
  | 'frontend' 
  | 'backend' 
  | 'database';

export type ServerAction = 
  | 'start' 
  | 'stop' 
  | 'restart' 
  | 'maintenance' 
  | 'emergency-restart';

export interface Server {
  id: string;
  name: string;
  type: ServerType;
  status: ServerStatus;
  cpu: number;
  memory: number;
  uptime: string;
  version: string;
}

// ===================== Типы компонентов =====================
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  active?: boolean;
  onClick: (value: string) => void;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  error?: string;
}

export interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface AuthModalProps {
  type: 'login' | 'register';
  onClose: () => void;
  onSubmit: (data: any) => void;
  error?: string;
}

export interface UserInfoProps {
  user: {
    name: string;
    role: Role;
    avatar: string;
  };
  onLogout: () => void;
}

export interface RequestCardProps {
  ticket: Ticket;
  onClick: () => void;
}

export interface RequestTableProps {
  tickets: Ticket[];
  onRowClick: (ticket: Ticket) => void;
}

export interface RequestFormProps {
  initialData?: {
    system: TicketSystem;
    priority: Priority;
    category: string;
    subcategory?: string;
    title: string;
    description: string;
    attachments: string[];
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export interface AdminPanelProps {
  users: User[];
  tickets: Ticket[];
  onUserEdit: (user: User) => void;
  onUserBlock: (userId: number, active: boolean) => void;
  onViewUserRequests: (userId: number) => void;
}

export interface CreateRequestProps {
  step: number;
  onSystemSelect: (system: TicketSystem) => void;
  onPrioritySelect: (priority: Priority) => void;
  onCategorySelect: (category: string, subcategory?: string, template?: string) => void;
  onDetailsSubmit: (data: { title: string; description: string; attachments: string[] }) => void;
  onBack: () => void;
  initialData?: any;
}

export interface HelpSectionProps {
  onBack: () => void;
}

export interface ModerationPanelProps {
  tickets: Ticket[];
  onTicketClick: (ticketId: number) => void;
}

export interface ProfileSectionProps {
  user: User;
  stats: {
    total: number;
    open: number;
    resolved: number;
  };
  onUpdateProfile: (data: any) => void;
  onCreateRequest: () => void;
  onViewRequests: () => void;
  onLogout: () => void;
}

export interface AppHeaderProps {
  logo: string;
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

// ===================== Типы маршрутизации =====================
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  roles?: Role[];
  isPrivate?: boolean;
  isGuestOnly?: boolean;
}

export interface PrivateRouteProps {
  roles?: Role[];
  children: React.ReactNode;
}

export interface GuestRouteProps {
  children: React.ReactNode;
}

// ===================== Типы состояния хранилища =====================
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

export interface RootState {
  auth: AuthState;
  tickets: TicketsState;
  ui: UIState;
}

// ===================== Типы темы =====================
export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  bgColor: string;
  panelBg: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  success: string;
  warning: string;
  error: string;
  bubbleUser: string;
  bubbleBot: string;
  editColor: string;
  shadowColor: string;
  borderColor: string;
  placeholder: string;
  disabled: string;
  hover: string;
  focus: string;
  adminColor: string;
  supportColor: string;
  userColor: string;
  managerColor: string;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// ===================== Декларация для styled-components =====================
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: Theme['colors'];
    shadows: Theme['shadows'];
    breakpoints: Theme['breakpoints'];
  }
}