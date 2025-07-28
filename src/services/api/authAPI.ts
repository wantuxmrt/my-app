import api from './axios';
import { LoginFormData, RegistrationFormData, User } from '../types';

export const authAPI = {
  login: async (credentials: LoginFormData): Promise<{ user: User; token: string }> => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error('Неверные учетные данные');
    }
  },

  register: async (userData: RegistrationFormData): Promise<User> => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Ошибка регистрации';
      throw new Error(message);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  refreshToken: async (): Promise<{ token: string }> => {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка обновления токена');
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка получения данных пользователя');
    }
  },
};