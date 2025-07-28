// Моки для аутентификации
export const mockLogin = async (credentials: any) => {
  return Promise.resolve({ token: 'mock-token', user: { id: 1, name: 'Test User' } });
};

export const mockLogout = async () => {
  return Promise.resolve();
};

export {};