// Обертка для работы с sessionStorage
export const sessionStorageService = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting sessionStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }
};

// Специализированные методы для временных данных
export const tempStorage = {
  getRedirectUrl: (): string | null => sessionStorageService.get<string>('redirectUrl'),
  setRedirectUrl: (url: string): void => sessionStorageService.set('redirectUrl', url),
  removeRedirectUrl: (): void => sessionStorageService.remove('redirectUrl'),
  
  getFormData: <T>(key: string): T | null => sessionStorageService.get<T>(key),
  setFormData: <T>(key: string, data: T): void => sessionStorageService.set(key, data),
  removeFormData: (key: string): void => sessionStorageService.remove(key)
};