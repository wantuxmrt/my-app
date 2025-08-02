// test/mocks/handlers.ts
import { rest } from 'msw';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export default [
  // Авторизация
  rest.post(`${API_BASE}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.json({
        user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
        token: 'test-token'
      })
    );
  }),

  // Регистрация
  rest.post(`${API_BASE}/auth/register`, (req, res, ctx) => {
    return res(
      ctx.json({
        user: { id: '2', name: 'New User', email: 'new@example.com', role: 'user' },
        token: 'new-user-token'
      })
    );
  }),

  // Текущий пользователь
  rest.get(`${API_BASE}/auth/me`, (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (authHeader === 'Bearer test-token') {
      return res(
        ctx.json({ id: '1', name: 'Test User', email: 'test@example.com', role: 'user' })
      );
    }
    return res(ctx.status(401));
  }),

  // Получение тикетов
  rest.get(`${API_BASE}/tickets`, (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', title: 'Test Ticket', status: 'open' },
        { id: '2', title: 'Another Ticket', status: 'closed' }
      ])
    );
  }),

  // Обработка ошибок
  rest.post(`${API_BASE}/auth/error`, (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: 'Invalid credentials' })
    );
  }),
];