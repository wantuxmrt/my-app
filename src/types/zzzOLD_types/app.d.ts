export type Role = 'admin' | 'support' | 'user' | 'manager';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type TicketStatus = 'new' | 'in-progress' | 'resolved' | 'reopened' | 'closed';
export type TicketSystem = '1c' | 'mis';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  password?: string;
  active: boolean;
  organization: string;
  department: string;
}

export interface Ticket {
  id: number;
  system: TicketSystem;
  category: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created: string;
  userId: number;
  assignedTo: number | null;
  organization: string;
  department: string;
  comments: {
    author: string;
    time: string;
    text: string;
  }[];
  attachments: string[];
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

// API типы
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

export interface ProblemCategory {
  id: string;
  name: string;
}