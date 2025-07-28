import { Role, TicketStatus, Priority, TicketSystem } from './app';

// Common Props
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

// Auth Components
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

// Request Components
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

// Section Components
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