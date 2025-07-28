// Общие типы для API
export type LoginFormData = {
  email: string;
  password: string;
};

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organization: string;
  department: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization: string;
  department: string;
  active: boolean;
  createdAt: string;
};

export type UserRole = 'user' | 'support' | 'admin' | 'manager';

export type Organization = {
  id: string;
  name: string;
};

export type Department = {
  id: string;
  name: string;
};

export type RequestStatus = 'new' | 'in-progress' | 'resolved' | 'reopened';
export type RequestPriority = 'low' | 'medium' | 'high' | 'critical';

export type RequestCategory = {
  id: string;
  name: string;
  icon: string;
  items: CategoryItem[];
};

export type CategoryItem = {
  id: string;
  name: string;
  icon: string;
  templateDescription?: string;
  subItems?: SubCategoryItem[];
};

export type SubCategoryItem = {
  id: string;
  name: string;
  autoTitle: string;
  templateDescription: string;
};

export type Request = {
  id: number;
  system: '1c' | 'mis';
  category: string;
  subcategory?: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: RequestPriority;
  created: string;
  userId: number;
  assignedTo?: number;
  comments: Comment[];
  attachments: string[];
};

export type Comment = {
  id: number;
  author: string;
  time: string;
  text: string;
};