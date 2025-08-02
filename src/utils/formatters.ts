// formatters.ts
/**
 * Форматирует статус заявки
 * @param status - Статус заявки
 * @returns Отформатированный статус
 */
export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'open': 'Открыт',
    'pending': 'В ожидании',
    'resolved': 'Решен',
    'closed': 'Закрыт',
    'new': 'Новый',
    'in-progress': 'В работе',
    'reopened': 'Переоткрыт'
  };
  
  return statusMap[status] || status;
};

/**
 * Форматирует приоритет заявки
 * @param priority - Приоритет заявки
 * @returns Отформатированный приоритет
 */
export const formatPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    'low': 'Низкий',
    'medium': 'Средний',
    'high': 'Высокий',
    'critical': 'Критический'
  };
  
  return priorityMap[priority] || priority;
};

/**
 * Форматирует роль пользователя
 * @param role - Роль пользователя
 * @returns Отформатированная роль
 */
export const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    'admin': 'Администратор',
    'manager': 'Менеджер',
    'user': 'Пользователь',
    'support': 'Поддержка',
    'guest': 'Гость'
  };
  
  return roleMap[role] || role;
};

/**
 * Сокращает длинный текст
 * @param text - Исходный текст
 * @param maxLength - Максимальная длина
 * @returns Сокращенный текст
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Форматирует число как строку с разделителями
 * @param num - Число
 * @returns Отформатированная строка
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};