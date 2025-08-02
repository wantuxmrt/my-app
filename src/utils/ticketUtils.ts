// ticketUtils.ts
import { Ticket, TicketStatus, TicketPriority } from '@/types/ticketTypes';

/**
 * Фильтрует тикеты по статусу
 * @param tickets - Массив тикетов
 * @param status - Статус для фильтрации
 * @returns Отфильтрованные тикеты
 */
export const filterTicketsByStatus = (
  tickets: Ticket[], 
  status: TicketStatus
): Ticket[] => {
  return tickets.filter(ticket => ticket.status === status);
};

/**
 * Фильтрует тикеты по приоритету
 * @param tickets - Массив тикетов
 * @param priority - Приоритет для фильтрации
 * @returns Отфильтрованные тикеты
 */
export const filterTicketsByPriority = (
  tickets: Ticket[], 
  priority: TicketPriority
): Ticket[] => {
  return tickets.filter(ticket => ticket.priority === priority);
};

/**
 * Сортирует тикеты по дате создания
 * @param tickets - Массив тикетов
 * @param ascending - По возрастанию
 * @returns Отсортированные тикеты
 */
export const sortTicketsByDate = (
  tickets: Ticket[], 
  ascending = true
): Ticket[] => {
  return [...tickets].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Находит тикеты, назначенные пользователю
 * @param tickets - Массив тикетов
 * @param userId - ID пользователя
 * @returns Назначенные тикеты
 */
export const findTicketsAssignedToUser = (
  tickets: Ticket[], 
  userId: string
): Ticket[] => {
  return tickets.filter(ticket => 
    ticket.assignee && ticket.assignee.id === userId
  );
};

/**
 * Проверяет, может ли пользователь редактировать тикет
 * @param ticket - Тикет
 * @param userId - ID пользователя
 * @param userRole - Роль пользователя
 * @returns true, если пользователь может редактировать
 */
export const canUserEditTicket = (
  ticket: Ticket,
  userId: string,
  userRole: string
): boolean => {
  if (userRole === 'admin' || userRole === 'manager') return true;
  return ticket.reporter.id === userId || 
         (ticket.assignee && ticket.assignee.id === userId);
};