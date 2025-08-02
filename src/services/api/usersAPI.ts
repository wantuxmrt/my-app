// usersAPI.ts
import api from './gateway';
import { User, Role, UpdateUserPayload } from '@/types/userTypes';

export const usersAPI = {
  getUsers: (params?: { organization?: string }): Promise<User[]> => {
    return api.get('/users', { params });
  },

  getUserById: (userId: string): Promise<User> => {
    return api.get(`/users/${userId}`);
  },

  updateUser: (userId: string, updates: UpdateUserPayload): Promise<User> => {
    return api.patch(`/users/${userId}`, updates);
  },

  deleteUser: (userId: string): Promise<void> => {
    return api.delete(`/users/${userId}`);
  },

  toggleUserStatus: (userId: string, active: boolean): Promise<User> => {
    return api.patch(`/users/${userId}/status`, { active });
  },

  getOrganizations: (): Promise<Organization[]> => {
    return api.get('/organizations');
  },

  getDepartments: (): Promise<Department[]> => {
    return api.get('/departments');
  },

  createOrganization: (orgData: Omit<Organization, 'id'>): Promise<Organization> => {
    return api.post('/organizations', orgData);
  },

  createDepartment: (deptData: Omit<Department, 'id'>): Promise<Department> => {
    return api.post('/departments', deptData);
  }
};