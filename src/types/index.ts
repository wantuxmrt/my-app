export * from './app';
export type Role = 'admin' | 'support' | 'manager' | 'user';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type TicketSystem = '1c' | 'mis';
export type TicketStatus = 'new' | 'in-progress' | 'resolved' | 'closed'| 'reopened';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'support' | 'user' | 'manager';
  avatar: string;
  password?: string;        // Сделано необязательным
  active: boolean;
  organization?: string;    // Сделано необязательным
  department?: string;      // Сделано необязательным
}

export interface Comment {
  author: string;
  text: string;
  time: string;
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
  assignedTo?: number;
  comments: Comment[];
  attachments: string[];
  subcategory?: string;
}