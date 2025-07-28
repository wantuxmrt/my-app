import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Worker для браузерной среды (development)
export const worker = setupWorker(...handlers);

// Активация в development режиме
if (process.env.NODE_ENV === 'development') {
  worker.start({ onUnhandledRequest: 'bypass' });
}