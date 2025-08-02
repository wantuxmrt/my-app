// statsUtils.ts
import { Ticket } from '@/types/ticketTypes';

/**
 * Рассчитывает статистику по тикетам
 * @param tickets - Массив тикетов
 * @returns Статистика
 */
export const calculateTicketStats = (tickets: Ticket[]) => {
  return {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length,
    highPriority: tickets.filter(t => t.priority === 'high').length,
    criticalPriority: tickets.filter(t => t.priority === 'critical').length,
    overdue: tickets.filter(t => {
      if (!t.dueDate) return false;
      const due = new Date(t.dueDate);
      return due < new Date() && !['resolved', 'closed'].includes(t.status);
    }).length
  };
};

/**
 * Рассчитывает процент завершения
 * @param total - Общее количество
 * @param completed - Завершенное количество
 * @returns Процент завершения
 */
export const calculateCompletionPercentage = (
  total: number, 
  completed: number
): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Рассчитывает среднее время решения
 * @param tickets - Массив тикетов
 * @returns Среднее время в часах
 */
export const calculateAverageResolutionTime = (tickets: Ticket[]): number => {
  const resolvedTickets = tickets.filter(t => 
    t.status === 'resolved' && t.createdAt && t.updatedAt
  );
  
  if (resolvedTickets.length === 0) return 0;
  
  const totalHours = resolvedTickets.reduce((sum, ticket) => {
    const created = new Date(ticket.createdAt);
    const resolved = new Date(ticket.updatedAt);
    const hours = (resolved.getTime() - created.getTime()) / (1000 * 60 * 60);
    return sum + hours;
  }, 0);
  
  return Math.round(totalHours / resolvedTickets.length);
};