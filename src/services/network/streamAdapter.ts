// streamAdapter.ts
import { webSocketService } from './websocket';
import { store } from '@/store';
import { addTicketUpdate } from '@/store/realtimeSlice';

export class StreamAdapter {
  static init(token: string) {
    webSocketService.connect(token);
    
    webSocketService.on('ticket:update', (ticket: Ticket) => {
      store.dispatch(addTicketUpdate(ticket));
    });

    webSocketService.on('comment:create', (comment: Comment) => {
      // Handle new comment
    });

    webSocketService.on('user:online', (count: number) => {
      // Update online users count
    });
  }

  static sendTicketUpdate(ticket: Ticket) {
    return webSocketService.send('ticket:update', ticket);
  }

  static sendComment(comment: Comment) {
    return webSocketService.send('comment:create', comment);
  }

  static disconnect() {
    webSocketService.disconnect();
  }
}