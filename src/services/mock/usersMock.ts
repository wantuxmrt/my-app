import { User, Organization, Department } from '@/types';

export const mockOrganizations: Organization[] = [
  { id: 'org1', name: 'Организация 1' },
  { id: 'org2', name: 'Организация 2' },
  { id: 'org3', name: 'Организация 3' }
];

export const mockDepartments: Department[] = [
  { id: 'dep1', name: 'Отдел поддержки' },
  { id: 'dep2', name: 'Бухгалтерия' },
  { id: 'dep3', name: 'ИТ отдел' },
  { id: 'dep4', name: 'Отдел продаж' }
];

export const mockUserActivity = {
  lastLogin: '2023-05-15T14:30:00',
  ticketCount: 5,
  recentTickets: [
    {
      id: 1,
      title: 'Проблема с доступом',
      status: 'resolved',
      created: '2023-05-10T09:00:00'
    },
    {
      id: 2,
      title: 'Вопрос по отчету',
      status: 'in-progress',
      created: '2023-05-12T11:30:00'
    }
  ]
};