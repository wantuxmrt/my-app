// src/contexts/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Ticket, Comment, ProblemCategory } from '@/types/app';

interface AppState {
  currentUser: User | null;
  tickets: Ticket[];
  users: User[];
  editingTicketId: number | null;
  categories: Record<string, ProblemCategory> | null;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: Role,
    organization: string,
    department: string
  ) => void;
  createRequest: (request: Omit<Ticket, 'id'>) => void;
  updateRequest: (request: Ticket) => void;
  deleteRequest: (id: number) => void;
  updateUser: (user: User) => void;
  setEditingTicket: (id: number | null) => void;
  addComment: (ticketId: number, comment: Comment) => void;
}

const defaultState: AppContextType = {
  currentUser: null,
  tickets: [],
  users: [],
  editingTicketId: null,
  categories: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  createRequest: () => {},
  updateRequest: () => {},
  deleteRequest: () => {},
  updateUser: () => {},
  setEditingTicket: () => {},
  addComment: () => {},
};

const AppContext = createContext<AppContextType>(defaultState);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    tickets: [],
    users: [],
    editingTicketId: null,
    categories: null,
  });

  // Загрузка начальных данных
  useEffect(() => {
    const loadData = async () => {
      try {
        // Загрузка пользователей
        const usersResponse = await fetch('/mockData/users.json');
        const usersData = await usersResponse.json();
        
        // Загрузка тикетов
        const ticketsResponse = await fetch('/mockData/tickets.json');
        const ticketsData = await ticketsResponse.json();
        
        // Загрузка категорий
        const categoriesResponse = await fetch('/mockData/categories.json');
        const categoriesData = await categoriesResponse.json();
        
        // Проверка авторизованного пользователя в localStorage
        const savedUser = localStorage.getItem('currentUser');
        const currentUser = savedUser 
          ? usersData.find((u: User) => u.email === JSON.parse(savedUser).email) 
          : null;
        
        setState({
          currentUser,
          tickets: ticketsData,
          users: usersData,
          editingTicketId: null,
          categories: categoriesData,
        });
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    loadData();
  }, []);

  // Сохранение пользователя при изменении
  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [state.currentUser]);

  const login = (email: string, password: string) => {
    const user = state.users.find(u => 
      u.email === email && u.password === password && u.active
    );
    
    if (user) {
      setState(prev => ({ ...prev, currentUser: user }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const register = (
    name: string,
    email: string,
    password: string,
    role: Role,
    organization: string,
    department: string
  ) => {
    const newUser: User = {
      id: state.users.length + 1,
      name,
      email,
      password,
      role,
      avatar: name.length > 1 ? 
        name[0].toUpperCase() + name[1].toUpperCase() : 
        name[0].toUpperCase(),
      active: true,
      organization,
      department,
    };
    
    setState(prev => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUser: newUser,
    }));
    
    return true;
  };

  const createRequest = (request: Omit<Ticket, 'id'>) => {
    const newTicket: Ticket = {
      ...request,
      id: Date.now(),
      created: new Date().toISOString(),
      comments: [],
      attachments: [],
    };
    
    setState(prev => ({
      ...prev,
      tickets: [...prev.tickets, newTicket],
    }));
  };

  const updateRequest = (request: Ticket) => {
    setState(prev => ({
      ...prev,
      tickets: prev.tickets.map(t => 
        t.id === request.id ? request : t
      ),
    }));
  };

  const deleteRequest = (id: number) => {
    setState(prev => ({
      ...prev,
      tickets: prev.tickets.filter(t => t.id !== id),
    }));
  };

  const updateUser = (user: User) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => 
        u.id === user.id ? user : u
      ),
      currentUser: prev.currentUser?.id === user.id ? user : prev.currentUser,
    }));
  };

  const setEditingTicket = (id: number | null) => {
    setState(prev => ({ ...prev, editingTicketId: id }));
  };

  const addComment = (ticketId: number, comment: Comment) => {
    setState(prev => ({
      ...prev,
      tickets: prev.tickets.map(t => 
        t.id === ticketId 
          ? { ...t, comments: [...t.comments, comment] } 
          : t
      ),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser: state.currentUser,
        tickets: state.tickets,
        users: state.users,
        editingTicketId: state.editingTicketId,
        categories: state.categories,
        login,
        logout,
        register,
        createRequest,
        updateRequest,
        deleteRequest,
        updateUser,
        setEditingTicket,
        addComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);