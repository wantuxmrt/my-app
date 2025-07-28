import { http, HttpResponse } from 'msw';
import { mockUsers, mockTickets } from './mockData';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const handlers = [
  // Аутентификация
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const data = await request.json() as any;
    const user = mockUsers.find(u => 
      u.email === data.email && u.password === data.password
    );
    
    if (!user) {
      return HttpResponse.json(
        { message: 'Неверные учетные данные' },
        { status: 401 }
      );
    }

    return HttpResponse.json({ 
      user, 
      token: 'mock-access-token' 
    });
  }),

  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    const data = await request.json() as any;
    
    if (mockUsers.some(u => u.email === data.email)) {
      return HttpResponse.json(
        { message: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      name: data.email.split('@')[0],
      email: data.email,
      role: data.role,
      avatar: data.email[0].toUpperCase(),
      password: data.password,
      active: true,
      organization: data.organization,
      department: data.department
    };

    mockUsers.push(newUser);
    
    return HttpResponse.json({ user: newUser }, { status: 201 });
  }),

  http.post(`${API_URL}/auth/logout`, () => {
    return HttpResponse.json({ message: 'Успешный выход' });
  }),

  // Запросы
  http.get(`${API_URL}/requests`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');
    const system = url.searchParams.get('system');
    
    let filteredTickets = [...mockTickets];
    
    if (status && status !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.status === status);
    }
    
    if (priority && priority !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.priority === priority);
    }
    
    if (system && system !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.system === system);
    }
    
    return HttpResponse.json(filteredTickets);
  }),

  http.get(`${API_URL}/requests/:id`, ({ params }) => {
    const id = Number(params.id);
    const ticket = mockTickets.find(t => t.id === id);
    
    if (!ticket) {
      return HttpResponse.json(
        { message: 'Запрос не найден' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(ticket);
  }),

  http.post(`${API_URL}/requests`, async ({ request }) => {
    const data = await request.json() as any;
    const newTicket = {
      ...data,
      id: Math.max(...mockTickets.map(t => t.id)) + 1,
      created: new Date().toISOString(),
      status: 'new',
      comments: [],
    };
    
    mockTickets.push(newTicket);
    
    return HttpResponse.json(newTicket, { status: 201 });
  }),

  http.patch(`${API_URL}/requests/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const updates = await request.json() as any;
    
    const index = mockTickets.findIndex(t => t.id === id);
    
    if (index === -1) {
      return HttpResponse.json(
        { message: 'Запрос не найден' },
        { status: 404 }
      );
    }
    
    mockTickets[index] = { ...mockTickets[index], ...updates };
    
    return HttpResponse.json(mockTickets[index]);
  }),

  // Пользователи
  http.get(`${API_URL}/users`, () => {
    return HttpResponse.json(mockUsers);
  }),

  http.get(`${API_URL}/users/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return HttpResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(user);
  }),

  http.patch(`${API_URL}/users/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const updates = await request.json() as any;
    
    const index = mockUsers.findIndex(u => u.id === id);
    
    if (index === -1) {
      return HttpResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    
    mockUsers[index] = { ...mockUsers[index], ...updates };
    
    return HttpResponse.json(mockUsers[index]);
  }),
];