// Обертка для работы с localStorage с поддержкой типов и обработкой ошибок
export const localStorageService = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Специализированные методы для работы с аутентификацией
export const authStorage = {
  getToken: (): string | null => localStorageService.get<string>('authToken'),
  setToken: (token: string): void => localStorageService.set('authToken', token),
  removeToken: (): void => localStorageService.remove('authToken'),
  
  getUser: (): User | null => localStorageService.get<User>('user'),
  setUser: (user: User): void => localStorageService.set('user', user),
  removeUser: (): void => localStorageService.remove('user'),
  
  clearAuthData: (): void => {
    authStorage.removeToken();
    authStorage.removeUser();
  }
};