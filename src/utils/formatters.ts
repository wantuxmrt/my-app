/**
 * Форматирует статус заявки в читаемый вид
 * @param status - Статус заявки
 * @returns Отформатированная строка статуса
 */
export const formatStatus = (status: string): string => {
  switch (status) {
    case 'new':
      return 'Новый';
    case 'in-progress':
      return 'В работе';
    case 'resolved':
      return 'Решен';
    case 'reopened':
      return 'Возвращен';
    default:
      return status;
  }
};

/**
 * Форматирует приоритет заявки в читаемый вид
 * @param priority - Приоритет заявки
 * @returns Отформатированная строка приоритета
 */
export const formatPriority = (priority: string): string => {
  switch (priority) {
    case 'low':
      return 'Низкий';
    case 'medium':
      return 'Средний';
    case 'high':
      return 'Высокий';
    case 'critical':
      return 'Критический';
    default:
      return priority;
  }
};

/**
 * Форматирует роль пользователя в читаемый вид
 * @param role - Роль пользователя
 * @returns Отформатированная строка роли
 */
export const formatRole = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Администратор';
    case 'support':
      return 'Поддержка';
    case 'manager':
      return 'Менеджер';
    case 'user':
      return 'Пользователь';
    default:
      return role;
  }
};