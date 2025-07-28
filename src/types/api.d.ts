// Добавляем экспорт для RequestFormData
export interface RequestFormData {
  title: string;
  description: string;
  attachments: string[];
  // Добавляем опциональное поле для файлов
  files?: File[]; 
}

// Дополнительные типы для API
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

export interface Request {
  id: number;
  system: string;
  category: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created: string;
  userId: number;
  assignedTo?: number;
  comments: Comment[];
  attachments: Attachment[];
}

export interface Comment {
  id: number;
  userId: number;
  text: string;
  timestamp: string;
}

export interface Attachment {
  id: number;
  filename: string;
  url: string;
}

type RequestStatus = 'new' | 'in_progress' | 'resolved' | 'closed' | 'reopened';
type RequestPriority = 'low' | 'medium' | 'high' | 'critical';
type RequestCategory = 'bug' | 'feature' | 'question' | 'other';

export interface Organization {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}