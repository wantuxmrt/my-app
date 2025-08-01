import { Ticket, TicketStatus, Priority, Comment } from '@/types/zzzOLD_types';

export const mockTickets: Ticket[] = [
  {
    id: 1,
    system: '1c',
    category: 'Ошибка',
    title: 'Не работает печать документов',
    description: 'При попытке печати возникает ошибка',
    status: 'new' as TicketStatus,
    priority: 'high' as Priority,
    created: '2023-05-12T14:30:00',
    userId: 1,
    assignedTo: null,
    organization: 'org1',
    department: 'dep1',
    comments: [],
    attachments: []
  },
  {
    id: 2,
    system: 'mis',
    category: 'Вопрос',
    title: 'Консультация по настройке',
    description: 'Нужна помощь в настройке модуля',
    status: 'in-progress' as TicketStatus,
    priority: 'medium' as Priority,
    created: '2023-05-11T09:15:00',
    userId: 2,
    assignedTo: 2,
    organization: 'org1',
    department: 'dep2',
    comments: [
      {
        id: 1,
        author: 'Мария Сидорова',
        userId: 2,
        text: 'Начал работу над запросом',
        time: '2023-05-11T10:30:00'
      }
    ],
    attachments: ['manual.pdf']
  }
];

export const mockComments: Comment[] = [
  {
    id: 1,
    author: 'Иван Петров',
    userId: 1,
    text: 'Проблема актуальна?',
    time: '2023-05-12T15:00:00'
  },
  {
    id: 2,
    author: 'Алексей Иванов',
    userId: 3,
    text: 'Да, все еще не работает',
    time: '2023-05-12T15:30:00'
  }
];

export const mockStats = {
  total: 24,
  open: 12,
  resolved: 8,
  overdue: 4
};