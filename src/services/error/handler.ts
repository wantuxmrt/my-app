// handler.ts
import { analytics } from '../analytics/tracker';

export const errorHandler = {
  handle(error: any, context = '') {
    console.error(`[${context}]`, error);
    
    const errorInfo = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    };
    
    analytics.track('error_occurred', errorInfo);
    
    // TODO: Send error to server
  }
};