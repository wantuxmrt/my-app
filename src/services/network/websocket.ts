// websocket.ts
import { WS_BASE_URL } from '../api/config';
import { Ticket, Comment } from '@/types/ticketTypes';

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private listeners: Record<string, Function[]> = {
    'ticket:update': [],
    'ticket:create': [],
    'comment:create': [],
    'user:online': [],
    'error': []
  };

  connect(token: string) {
    if (this.socket) this.disconnect();

    this.socket = new WebSocket(`${WS_BASE_URL}?token=${token}`);
    
    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.event, data.payload);
      } catch (error) {
        this.emit('error', { error: 'Invalid message format' });
      }
    };

    this.socket.onerror = (error) => {
      this.emit('error', { error: error });
    };

    this.socket.onclose = (event) => {
      if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect(token);
        }, this.reconnectInterval);
      }
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  on(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  off(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, payload: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(payload));
    }
  }

  send(event: string, data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event, data }));
      return true;
    }
    return false;
  }
}

export const webSocketService = new WebSocketService();