// Экспорт API сервисов
export * as authAPI from './api/authAPI';
export * as requestsAPI from './api/requestsAPI';
export * as usersAPI from './api/usersAPI';
export { api, ApiError } from './api';

// Экспорт моков для разработки
export * as mock from './mock';

// Экспорт сервисов хранилища
export * as storage from './storage';