// src/types/app.d.ts
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
  comments: Comment[];
  attachments: string[];
}

export interface Comment {
  author: string;
  time: string;
  text: string;
}

export interface ProblemCategory {
  name: string;
  icon: string;
  items: {
    name: string;
    icon: string;
    templateDescription?: string;
    subItems?: {
      name: string;
      autoTitle?: string;
      templateDescription?: string;
    }[];
  }[];
}

export interface HelpData {
  about: string;
  contacts: Contact[];
  faq: FAQItem[];
}

export interface Contact {
  type: string;
  icon: string;
  phone: string;
  email: string;
  workingHours: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}