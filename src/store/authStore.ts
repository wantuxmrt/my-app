import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types/app.d';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: Role,
    organization: string,
    department: string
  ) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        const mockUsers: User[] = [
          {
            id: 1,
            name: "Иван Петров",
            email: "admin@mrtexpert.ru",
            role: "admin",
            avatar: "ИП",
            organization: "org1",
            department: "dep1",
            active: true
          },
          {
            id: 2,
            name: "Мария Сидорова",
            email: "support@mrtexpert.ru",
            role: "support",
            avatar: "МС",
            organization: "org1",
            department: "dep1",
            active: true
          }
        ];
        
        const user = mockUsers.find(u => u.email === email);
        if (!user) throw new Error("Неверные учетные данные");
        
        set({ user, isAuthenticated: true });
      },
      
      register: async (
        email: string, 
        password: string, 
        name: string, 
        role: Role, 
        organization: string, 
        department: string
      ) => {
        const newUser: User = {
          id: Date.now(),
          name,
          email,
          role,
          avatar: name.slice(0, 2).toUpperCase(),
          organization,
          department,
          active: true
        };
        
        set({ user: newUser, isAuthenticated: true });
      },
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      updateUser: (userData: Partial<User>) => 
        set(state => ({
          user: state.user ? { ...state.user, ...userData } : null
        }))
    }),
    {
      name: 'auth-storage',
      partialize: (state: AuthState) => ({ user: state.user })
    }
  )
);

