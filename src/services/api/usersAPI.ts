import api from './axios';
import { 
  User, 
  Role, 
  Organization, 
  Department,
  PaginatedResponse
} from '@/types';

export const usersAPI = {
  getAllUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: Role;
    search?: string;
  }): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>('/users', { params });
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data;
  },

  updateUser: async (id: number, updates: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, updates);
    return response.data;
  },

  updateUserRole: async (id: number, role: Role): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}/role`, { role });
    return response.data;
  },

  toggleUserStatus: async (id: number, active: boolean): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}/status`, { active });
    return response.data;
  },

  getOrganizations: async (): Promise<Organization[]> => {
    const response = await api.get<Organization[]>('/organizations');
    return response.data;
  },

  getDepartments: async (): Promise<Department[]> => {
    const response = await api.get<Department[]>('/departments');
    return response.data;
  },

  searchUsers: async (query: string): Promise<User[]> => {
    const response = await api.get<User[]>('/users/search', { params: { query } });
    return response.data;
  },

  getUserActivity: async (userId: number): Promise<{
    lastLogin: string;
    ticketCount: number;
    recentTickets: Ticket[];
  }> => {
    const response = await api.get(`/users/${userId}/activity`);
    return response.data;
  },
};