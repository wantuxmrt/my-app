import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/app';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const defaultState: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultState);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = async (email: string, password: string) => {
    // Заглушка для логина
    if (email === 'admin@example.com' && password === 'admin123') {
      setState({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
          avatar: '',
          active: true,
          organization: '', // Добавлено
          department: '',   // Добавлено
          password: ''      // Добавлено
        }
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);