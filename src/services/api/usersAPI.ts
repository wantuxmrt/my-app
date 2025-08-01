// src/services/api/usersAPI.ts
import Request from './request';
import { API_BASE_URL, API_TIMEOUT } from './configsAPI';
import type { User, Role, UpdateUserPayload } from '@/types/zzzOLD_types';

const api = new Request({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

const userAPI = {
  /**
   * Получение текущего аутентифицированного пользователя
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/me');
      return response;
    } catch (error: any) {
      console.error('Ошибка получения текущего пользователя:', error.message);
      throw new Error('Не удалось получить данные пользователя');
    }
  },

  /**
   * Регистрация нового пользователя
   */
  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
    organization: string;
    department: string;
  }): Promise<User> => {
    try {
      const response = await api.post<User>('/auth/register', data);
      return response;
    } catch (error: any) {
      console.error('Ошибка регистрации:', error.response?.data || error.message);
      
      // Обработка специфичных ошибок
      if (error.response?.status === 409) {
        throw new Error('Пользователь с таким email уже существует');
      }
      throw new Error('Ошибка регистрации. Пожалуйста, попробуйте позже');
    }
  },

  /**
   * Аутентификация пользователя
   */
  login: async (credentials: { email: string; password: string }): Promise<{ user: User; token: string }> => {
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
      return response;
    } catch (error: any) {
      console.error('Ошибка входа:', error.response?.data || error.message);
      
      // Специфичные ошибки
      if (error.response?.status === 401) {
        throw new Error('Неверные учетные данные');
      }
      if (error.response?.status === 403) {
        throw new Error('Учетная запись заблокирована');
      }
      throw new Error('Ошибка входа. Пожалуйста, попробуйте позже');
    }
  },

  /**
   * Выход из системы
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error: any) {
      console.error('Ошибка выхода:', error.message);
      throw new Error('Не удалось завершить сеанс');
    }
  },

  /**
   * Обновление данных пользователя
   */
  updateUser: async (userId: number, updates: UpdateUserPayload): Promise<User> => {
    try {
      const response = await api.patch<User>(`/users/${userId}`, updates);
      return response;
    } catch (error: any) {
      console.error('Ошибка обновления пользователя:', error.response?.data || error.message);
      
      if (error.response?.status === 404) {
        throw new Error('Пользователь не найден');
      }
      throw new Error('Не удалось обновить данные пользователя');
    }
  },

  /**
   * Запрос на сброс пароля
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error: any) {
      console.error('Ошибка запроса сброса пароля:', error.message);
      throw new Error('Не удалось отправить запрос на сброс пароля');
    }
  },

  /**
   * Сброс пароля
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error: any) {
      console.error('Ошибка сброса пароля:', error.message);
      
      if (error.response?.status === 400) {
        throw new Error('Неверный или просроченный токен');
      }
      throw new Error('Не удалось сбросить пароль');
    }
  },

  /**
   * Получение списка пользователей (для администраторов)
   */
  getUsers: async (params?: { organization?: string }): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users', { params });
      return response;
    } catch (error: any) {
      console.error('Ошибка получения списка пользователей:', error.message);
      throw new Error('Не удалось загрузить список пользователей');
    }
  },

  /**
   * Блокировка/разблокировка пользователя
   */
  toggleUserStatus: async (userId: number, active: boolean): Promise<User> => {
    try {
        const response = await api.patch<User>(`/users/${userId}/status`, { active });
        return response;
      } catch (error: any) {
        console.error('Ошибка изменения статуса пользователя:', error.message);
        throw new Error('Не удалось изменить статус пользователя');
    }
  }
};

/**
   * Получение пользователя по ID
   */
  getUserById: async (userId: number): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/${userId}`);
      return response;
    } catch (error: any) {
      console.error('Ошибка получения пользователя по ID:', error.message);
      if (error.response?.status === 404) {
        throw new Error('Пользователь не найден');
      }
      throw new Error('Не удалось загрузить данные пользователя');
    }
  },

  /**
   * Получение списка организаций
   */
  getOrganizations: async (): Promise<Organization[]> => {
    try {
      const response = await api.get<Organization[]>('/organizations');
      return response;
    } catch (error: any) {
      console.error('Ошибка получения организаций:', error.message);
      throw new Error('Не удалось загрузить список организаций');
    }
  },

  /**
   * Получение списка отделов
   */
  getDepartments: async (): Promise<Department[]> => {
    try {
      const response = await api.get<Department[]>('/departments');
      return response;
    } catch (error: any) {
      console.error('Ошибка получения отделов:', error.message);
      throw new Error('Не удалось загрузить список отделов');
    }
  },

  /**
   * Создание новой организации
   */
  createOrganization: async (orgData: Omit<Organization, 'id'>): Promise<Organization> => {
    try {
      const response = await api.post<Organization>('/organizations', orgData);
      return response;
    } catch (error: any) {
      console.error('Ошибка создания организации:', error.message);
      throw new Error('Не удалось создать организацию');
    }
  },

  /**
   * Создание нового отдела
   */
  createDepartment: async (deptData: Omit<Department, 'id'>): Promise<Department> => {
    try {
      const response = await api.post<Department>('/departments', deptData);
      return response;
    } catch (error: any) {
      console.error('Ошибка создания отдела:', error.message);
      throw new Error('Не удалось создать отдел');
    }
  },
};

export default userAPI;