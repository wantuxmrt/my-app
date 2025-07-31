import { User, AuthResponse } from '@/types';

// Моки для тестирования и разработки
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Иван Петров",
    email: "admin@mrtexpert.ru",
    role: "admin",
    avatar: "ИП",
    organization: "org1",
    department: "dep1",
    position: "Главный администратор",
    active: true
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "support@mrtexpert.ru",
    role: "support",
    avatar: "МС",
    organization: "org1",
    department: "dep1",
    position: "Специалист поддержки",
    active: true
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "user@mrtexpert.ru",
    role: "user",
    avatar: "АИ",
    organization: "org1",
    department: "dep2",
    position: "Бухгалтер",
    active: true
  }
];

export const mockAuthResponse: AuthResponse = {
  user: mockUsers[0],
  token: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token'
};

export const mockRefreshResponse = {
  token: 'new-mock-jwt-token',
  refreshToken: 'new-mock-refresh-token'
};