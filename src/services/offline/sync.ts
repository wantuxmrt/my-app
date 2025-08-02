// sync.ts
import { CacheService } from './cache';
import { requestsAPI } from '../api/requestsAPI';

const SYNC_QUEUE_KEY = 'sync-queue';

export const SyncService = {
  async init() {
    if (!navigator.onLine) return;
    
    const queue = await this.getQueue();
    if (queue.length > 0) {
      await this.processQueue(queue);
    }
  },

  async addToQueue(action: 'create' | 'update' | 'delete', entity: string, data: any) {
    const queue = await this.getQueue();
    queue.push({
      action,
      entity,
      data,
      timestamp: Date.now()
    });
    await CacheService.set(SYNC_QUEUE_KEY, queue);
  },

  async getQueue(): Promise<SyncItem[]> {
    return (await CacheService.get<SyncItem[]>(SYNC_QUEUE_KEY)) || [];
  },

  async processQueue(queue: SyncItem[]) {
    for (const item of queue) {
      try {
        switch (item.entity) {
          case 'ticket':
            await this.syncTicket(item);
            break;
          case 'comment':
            await this.syncComment(item);
            break;
        }
        await this.removeFromQueue(item);
      } catch (error) {
        console.error('Sync failed:', error);
        break;
      }
    }
  },

  async syncTicket(item: SyncItem) {
    switch (item.action) {
      case 'create':
        await requestsAPI.createTicket(item.data);
        break;
      case 'update':
        await requestsAPI.updateTicket(item.data.id, item.data);
        break;
      case 'delete':
        await requestsAPI.deleteTicket(item.data.id);
        break;
    }
  },

  async syncComment(item: SyncItem) {
    switch (item.action) {
      case 'create':
        await requestsAPI.addComment(item.data.ticketId, item.data);
        break;
      case 'update':
        await requestsAPI.updateComment(
          item.data.ticketId, 
          item.data.id, 
          item.data
        );
        break;
      case 'delete':
        await requestsAPI.deleteComment(
          item.data.ticketId, 
          item.data.id
        );
        break;
    }
  },

  async removeFromQueue(item: SyncItem) {
    const queue = await this.getQueue();
    const newQueue = queue.filter(
      q => q.timestamp !== item.timestamp
    );
    await CacheService.set(SYNC_QUEUE_KEY, newQueue);
  }
};

interface SyncItem {
  action: 'create' | 'update' | 'delete';
  entity: string;
  data: any;
  timestamp: number;
}