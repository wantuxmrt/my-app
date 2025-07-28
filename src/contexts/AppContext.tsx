import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Priority, TicketSystem, Ticket, User } from '@/types/app';
import { useAuth } from '../hooks/useAuth'; // Используем новый AuthContext

interface AppState {
  currentUser: User | null;
  requests: Ticket[];
  users: User[];
  editingTicketId: number | null;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createRequest: (request: Omit<Ticket, 'id'>) => void;
  updateRequest: (request: Ticket) => void;
  deleteRequest: (id: number) => void;
  updateUser: (user: User) => void;
  setEditingTicket: (id: number | null) => void;
}

const defaultState: AppContextType = {
  currentUser: null,
  requests: [],
  users: [],
  editingTicketId: null,
  login: async () => false,
  logout: () => {},
  createRequest: () => {},
  updateRequest: () => {},
  deleteRequest: () => {},
  updateUser: () => {},
  setEditingTicket: () => {},
};

const AppContext = createContext<AppContextType>(defaultState);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    requests: [],
    users: [],
    editingTicketId: null,
  });

  const { login: authLogin, logout: authLogout } = useAuth();

  const login = useCallback(async (email: string, password: string) => {
    const success = await authLogin(email, password);
    if (success) {
      setState(prev => ({ 
        ...prev, 
        currentUser: { 
          id: 1, 
          name: 'User', 
          email: 'user@example.com', 
          role: 'user',
          avatar: '',
          active: true,
          organization: '', // Добавлено
          department: '',   // Добавлено
          password: ''      // Добавлено
        } 
      }));
    }
    return success;
  }, [authLogin]);

  const logout = useCallback(() => {
    authLogout();
    setState(prev => ({ ...prev, currentUser: null }));
  }, [authLogout]);

  const createRequest = useCallback((request: Omit<Ticket, 'id'>) => {
    const newRequest: Ticket = {
      ...request,
      id: Date.now(),
      created: new Date().toISOString(),
      status: 'new',
      comments: [],
      attachments: [],
      assignedTo: null, // Добавлено поле assignedTo
    };
    setState(prev => ({
      ...prev,
      requests: [...prev.requests, newRequest],
    }));
  }, []);

  const updateRequest = useCallback((request: Ticket) => {
    setState(prev => ({
      ...prev,
      requests: prev.requests.map(req => 
        req.id === request.id ? request : req
      ),
    }));
  }, []);

  const deleteRequest = useCallback((id: number) => {
    setState(prev => ({
      ...prev,
      requests: prev.requests.filter(req => req.id !== id),
    }));
  }, []);

  const updateUser = useCallback((user: User) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => 
        u.id === user.id ? user : u
      ),
      currentUser: prev.currentUser?.id === user.id ? user : prev.currentUser
    }));
  }, []);

  const setEditingTicket = useCallback((id: number | null) => {
    setState(prev => ({ ...prev, editingTicketId: id }));
  }, []);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      users: [
        { 
          id: 1, 
          name: 'Admin', 
          role: 'admin', 
          email: 'admin@example.com',
          avatar: '', // Добавлено поле avatar
          active: true, 
          organization: '', // Добавлено
          department: '',   // Добавлено
          password: ''      // Добавлено
        },
        { 
          id: 2, 
          name: 'User', 
          role: 'user', 
          email: 'user@example.com',
          avatar: '', // Добавлено поле avatar
          active: true, 
          organization: '', // Добавлено
          department: '',   // Добавлено
          password: ''      // Добавлено
        },
      ],
      requests: [
        {
          id: 1,
          system: '1c',
          priority: 'high',
          category: 'Ошибка',
          title: 'Проблема с отчетом',
          description: 'Не формируется отчет по продажам',
          status: 'new',
          created: new Date().toISOString(),
          userId: 2,
          assignedTo: null, // Добавлено поле assignedTo
          comments: [],
          attachments: [],
        }
      ]
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        createRequest,
        updateRequest,
        deleteRequest,
        updateUser,
        setEditingTicket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);