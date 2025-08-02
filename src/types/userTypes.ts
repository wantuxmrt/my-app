// types/userTypes.ts
export type Role = 'admin' | 'manager' | 'user' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  organization?: string;
  department?: string;
  avatarUrl?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  role: Role;
  organization?: string;
  department?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: Role;
  organization?: string;
  department?: string;
  avatarUrl?: string;
  isActive?: boolean;
}

export interface Organization {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  organizationId: string;
}