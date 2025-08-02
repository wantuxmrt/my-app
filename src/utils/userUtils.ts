// userUtils.ts
import { User, Role } from '@/types/userTypes';

/**
 * Форматирует полное имя пользователя
 * @param user - Объект пользователя
 * @returns Полное имя
 */
export const formatFullName = (user: User): string => {
  return user.name;
};

/**
 * Проверяет, имеет ли пользователь роль
 * @param user - Пользователь
 * @param roles - Проверяемые роли
 * @returns true, если пользователь имеет одну из ролей
 */
export const hasRole = (user: User | null, roles: Role[]): boolean => {
  if (!user) return false;
  return roles.includes(user.role);
};

/**
 * Получает инициалы пользователя
 * @param user - Пользователь
 * @returns Инициалы
 */
export const getInitials = (user: User): string => {
  const names = user.name.split(' ');
  return names
    .map(name => name[0])
    .join('')
    .toUpperCase();
};

/**
 * Фильтрует пользователей по организации
 * @param users - Массив пользователей
 * @param organization - Организация
 * @returns Отфильтрованные пользователи
 */
export const filterUsersByOrganization = (
  users: User[],
  organization: string
): User[] => {
  return users.filter(user => 
    user.organization === organization
  );
};

/**
 * Проверяет, является ли пользователь администратором
 * @param user - Пользователь
 * @returns true, если пользователь администратор
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, ['admin']);
};