import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Сервер для Node среды (тестирование)
export const server = setupServer(...handlers);