// types/ticketTypes.ts
import { User } from './userTypes';

export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Comment {
  id: string;
  text: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee?: User | null;
  reporter: User;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  comments: Comment[];
  attachments: Attachment[];
  relatedTickets: string[];
  customFields: Record<string, any>;
}

export interface TicketFilter {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignee?: string;
  reporter?: string;
  organization?: string;
  department?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}