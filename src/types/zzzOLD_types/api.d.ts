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
  organization?: string;
  department?: string;
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