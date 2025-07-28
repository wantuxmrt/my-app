import api from './axios';
import { Request, RequestStatus, RequestPriority, RequestCategory } from '../types';

export const requestsAPI = {
  getAllRequests: async (): Promise<Request[]> => {
    try {
      const response = await api.get('/requests');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки запросов');
    }
  },

  getUserRequests: async (userId: number): Promise<Request[]> => {
    try {
      const response = await api.get(`/users/${userId}/requests`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки запросов пользователя');
    }
  },

  getRequestById: async (id: number): Promise<Request> => {
    try {
      const response = await api.get(`/requests/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки запроса');
    }
  },

  createRequest: async (requestData: Omit<Request, 'id' | 'created' | 'status'>): Promise<Request> => {
    try {
      const response = await api.post('/requests', requestData);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка создания запроса');
    }
  },

  updateRequest: async (id: number, updates: Partial<Request>): Promise<Request> => {
    try {
      const response = await api.patch(`/requests/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка обновления запроса');
    }
  },

  changeRequestStatus: async (id: number, status: RequestStatus): Promise<Request> => {
    try {
      const response = await api.patch(`/requests/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка изменения статуса');
    }
  },

  assignRequest: async (id: number, assigneeId: number): Promise<Request> => {
    try {
      const response = await api.patch(`/requests/${id}/assign`, { assigneeId });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка назначения исполнителя');
    }
  },

  addComment: async (requestId: number, comment: string): Promise<Request> => {
    try {
      const response = await api.post(`/requests/${requestId}/comments`, { text: comment });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка добавления комментария');
    }
  },

  getCategories: async (system: '1c' | 'mis'): Promise<RequestCategory[]> => {
    try {
      const response = await api.get(`/requests/categories?system=${system}`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка загрузки категорий');
    }
  },
};