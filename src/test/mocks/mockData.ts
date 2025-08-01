import { User, Ticket } from '@/types/zzzOLD_types/index';

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Иван Петров",
    email: "admin@mrtexpert.ru",
    role: "admin",
    avatar: "ИП",
    password: "admin123",
    active: true,
    organization: "org1",
    department: "dep1"
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "support@mrtexpert.ru",
    role: "support",
    avatar: "МС",
    password: "support123",
    active: true,
    organization: "org1",
    department: "dep1"
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "user@mrtexpert.ru",
    role: "user",
    avatar: "АИ",
    password: "user123",
    active: true,
    organization: "org1",
    department: "dep2"
  },
  {
    id: 4,
    name: "Ольга Николаева",
    email: "manager@mrtexpert.ru",
    role: "manager",
    avatar: "ОН",
    password: "manager123",
    active: true,
    organization: "org1",
    department: "dep3"
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 1,
    system: '1c',
    category: 'Ошибки > Не работает',
    title: 'Ошибка при проведении документа',
    description: 'При попытке провести документ "Поступление товаров" возникает ошибка "Недостаточно прав". Проблема проявляется только у пользователя Иванова.',
    status: 'in-progress',
    priority: 'high',
    created: '2023-05-12T14:30:00',
    userId: 3,
    assignedTo: 2,
    organization: 'org1', // Добавлено
    department: 'dep2',   // Добавлено
    comments: [
      // ... без изменений ...
    ],
    attachments: []
  },
  {
    id: 2,
    system: 'mis',
    category: 'Производительность > Формирование отчетов',
    title: 'Медленное формирование отчетов',
    description: 'Формирование ежедневного отчета занимает более 20 минут. Необходимо оптимизировать запросы к базе данных.',
    status: 'resolved',
    priority: 'medium',
    created: '2023-05-11T09:15:00',
    userId: 1,
    assignedTo: 2,
    organization: 'org1', // Добавлено
    department: 'dep1',   // Добавлено
    comments: [
      // ... без изменений ...
    ],
    attachments: []
  },
  {
    id: 3,
    system: '1c',
    category: 'Настройки > Доступ к базе',
    title: 'Нет доступа к базе',
    description: 'После обновления платформы пользователи не могут подключиться к базе. Ошибка: "Сервер баз данных не обнаружен".',
    status: 'new',
    priority: 'critical',
    created: '2023-05-10T16:45:00',
    userId: 2,
    assignedTo: null,
    organization: 'org1', // Добавлено
    department: 'dep1',   // Добавлено
    comments: [],
    attachments: []
  }
];