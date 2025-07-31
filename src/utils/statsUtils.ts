// Определяем типы, так как нет доступа к '@/types/app'
interface Ticket {
  status: string;
  priority: string;
}

interface Stats {
  total: number;
  open: number;
  resolved: number;
  overdue: number;
}

export const calculateStats = (tickets: Ticket[]): Stats => {
  return {
    total: tickets.length,
    open: tickets.filter(t => t.status !== 'resolved').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    overdue: tickets.filter(t => 
      t.status === 'new' || t.status === 'in-progress'
    ).length
  };
};

// Для будущей интеграции с API
export const fetchStats = async (): Promise<Stats> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: 24,
        open: 12,
        resolved: 8,
        overdue: 4
      });
    }, 500);
  });
};

/**
 * Рассчитывает процент завершенных задач
 * @param total - Общее количество задач
 * @param completed - Количество завершенных задач
 * @returns Процент завершения
 */
export const calculateCompletionPercentage = (
  total: number, 
  completed: number
): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};