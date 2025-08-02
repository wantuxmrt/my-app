// requestsAPI.ts
import api from './gateway';
import { Ticket, TicketStatus, TicketPriority, Comment, Attachment, TicketFilter } from '@/types/ticketTypes';
import { ReportField } from '@/types/reportFieldTypes';

export const requestsAPI = {
  fetchTickets: (params?: TicketFilter): Promise<Ticket[]> => {
    return api.get('/tickets', { params });
  },

  fetchTicketById: (id: string): Promise<Ticket> => {
    return api.get(`/tickets/${id}`);
  },

  createTicket: (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
    return api.post('/tickets', ticketData);
  },

  updateTicket: (id: string, updates: Partial<Ticket>): Promise<Ticket> => {
    return api.put(`/tickets/${id}`, updates);
  },

  deleteTicket: (id: string): Promise<void> => {
    return api.delete(`/tickets/${id}`);
  },

  addComment: (ticketId: string, commentData: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
    return api.post(`/tickets/${ticketId}/comments`, commentData);
  },

  updateComment: (ticketId: string, commentId: string, updates: Partial<Comment>): Promise<Comment> => {
    return api.put(`/tickets/${ticketId}/comments/${commentId}`, updates);
  },

  deleteComment: (ticketId: string, commentId: string): Promise<void> => {
    return api.delete(`/tickets/${ticketId}/comments/${commentId}`);
  },

  addAttachment: (ticketId: string, file: FormData): Promise<Attachment> => {
    return api.post(`/tickets/${ticketId}/attachments`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deleteAttachment: (ticketId: string, attachmentId: string): Promise<void> => {
    return api.delete(`/tickets/${ticketId}/attachments/${attachmentId}`);
  },

  // Report Fields API
  fetchReportFields: (): Promise<ReportField[]> => {
    return api.get('/report-fields');
  },

  createReportField: (fieldData: Omit<ReportField, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReportField> => {
    return api.post('/report-fields', fieldData);
  },

  updateReportField: (id: string, updates: Partial<ReportField>): Promise<ReportField> => {
    return api.put(`/report-fields/${id}`, updates);
  },

  deleteReportField: (id: string): Promise<void> => {
    return api.delete(`/report-fields/${id}`);
  },

  fetchFieldRelations: (): Promise<FieldRelationship[]> => {
    return api.get('/report-fields/relations');
  }
};