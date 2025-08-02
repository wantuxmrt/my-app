// authAPI.ts
import api from './gateway';
import { LoginFormData, RegistrationFormData, User, AuthResponse } from '@/types/userTypes';

export const authAPI = {
  login: (credentials: LoginFormData): Promise<AuthResponse> => {
    return api.post('/auth/login', credentials);
  },

  register: (userData: RegistrationFormData): Promise<AuthResponse> => {
    return api.post('/auth/register', userData);
  },

  logout: (): Promise<void> => {
    return api.post('/auth/logout');
  },

  refreshToken: (): Promise<{ accessToken: string }> => {
    return api.post('/auth/refresh');
  },

  getCurrentUser: (): Promise<User> => {
    return api.get('/auth/me');
  },

  verifyEmail: (token: string): Promise<void> => {
    return api.post('/auth/verify-email', { token });
  },

  requestPasswordReset: (email: string): Promise<void> => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: (token: string, newPassword: string): Promise<void> => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  updateProfile: (userData: Partial<User>): Promise<User> => {
    return api.patch('/auth/profile', userData);
  }
};