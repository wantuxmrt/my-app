import api from './axios';
import { User, UserRole, Organization, Department } from '../types';

export const usersAPI = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки пользователей');
    }
  },

  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки пользователя');
    }
  },

  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка создания пользователя');
    }
  },

  updateUser: async (id: number, updates: Partial<User>): Promise<User> => {
    try {
      const response = await api.patch(`/users/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка обновления пользователя');
    }
  },

  updateUserRole: async (id: number, role: UserRole): Promise<User> => {
    try {
      const response = await api.patch(`/users/${id}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка изменения роли');
    }
  },

  toggleUserStatus: async (id: number, active: boolean): Promise<User> => {
    try {
      const response = await api.patch(`/users/${id}/status`, { active });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка изменения статуса');
    }
  },

  getOrganizations: async (): Promise<Organization[]> => {
    try {
      const response = await api.get('/organizations');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки организаций');
    }
  },

  getDepartments: async (): Promise<Department[]> => {
    try {
      const response = await api.get('/departments');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки отделов');
    }
  },

  searchUsers: async (query: string): Promise<User[]> => {
    try {
      const response = await api.get('/users/search', { params: { query } });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка поиска пользователей');
    }
  },
};