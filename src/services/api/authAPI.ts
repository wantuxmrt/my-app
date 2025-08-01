// /my-app/src/services/api/authsAPI.ts
import api from './api_old_test/axiosAPI';
import { 
  LoginFormData, 
  RegistrationFormData, 
  User,
  AuthResponse,
  RefreshTokenResponse
} from '@/types/zzzOLD_types';

export const authAPI = {
  login: async (credentials: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegistrationFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh');
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ verified: boolean }> => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    await api.post('/auth/request-password-reset', { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.patch<User>('/auth/profile', userData);
    return response.data;
  },
};