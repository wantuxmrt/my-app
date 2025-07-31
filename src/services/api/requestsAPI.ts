import api from './axios';
import { 
  Ticket, 
  TicketStatus, 
  Priority, 
  Comment, 
  ProblemCategory,
  CreateTicketData,
  UpdateTicketData
} from '@/types';

export const requestsAPI = {
  getAllTickets: async (params?: {
    status?: TicketStatus | 'all';
    priority?: Priority | 'all';
    system?: '1c' | 'mis' | 'all';
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ tickets: Ticket[]; total: number }> => {
    const response = await api.get<{ tickets: Ticket[]; total: number }>('/tickets', { params });
    return response.data;
  },

  getUserTickets: async (userId: number): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>(`/users/${userId}/tickets`);
    return response.data;
  },

  getTicketById: async (id: number): Promise<Ticket> => {
    const response = await api.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  createTicket: async (ticketData: CreateTicketData): Promise<Ticket> => {
    const response = await api.post<Ticket>('/tickets', ticketData);
    return response.data;
  },

  updateTicket: async (id: number, updates: UpdateTicketData): Promise<Ticket> => {
    const response = await api.patch<Ticket>(`/tickets/${id}`, updates);
    return response.data;
  },

  changeTicketStatus: async (id: number, status: TicketStatus): Promise<Ticket> => {
    const response = await api.patch<Ticket>(`/tickets/${id}/status`, { status });
    return response.data;
  },

  assignTicket: async (id: number, assigneeId: number): Promise<Ticket> => {
    const response = await api.patch<Ticket>(`/tickets/${id}/assign`, { assigneeId });
    return response.data;
  },

  addComment: async (ticketId: number, comment: string): Promise<Comment> => {
    const response = await api.post<Comment>(`/tickets/${ticketId}/comments`, { text: comment });
    return response.data;
  },

  getCategories: async (system: '1c' | 'mis'): Promise<ProblemCategory[]> => {
    const response = await api.get<ProblemCategory[]>(`/tickets/categories?system=${system}`);
    return response.data;
  },

  getTicketStats: async (): Promise<{
    total: number;
    open: number;
    resolved: number;
    overdue: number;
  }> => {
    const response = await api.get('/tickets/stats');
    return response.data;
  },

  uploadAttachment: async (ticketId: number, file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<{ url: string }>(
      `/tickets/${ticketId}/attachments`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    return response.data;
  },
};