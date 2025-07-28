import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api/authAPI';
import { User, Role } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  // Проверка аутентификации при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          setLoading(true);
          // Исправлено: заменили verifyToken на getCurrentUser
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        } catch (err) {
          localStorage.removeItem('authToken');
        } finally {
          setLoading(false);
          setIsInitialized(true);
        }
      } else {
        setIsInitialized(true);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await authAPI.login({ email, password });
        setUser(response.user);
        localStorage.setItem('authToken', response.token);
        navigate('/');
        return true;
      } catch (err) {
        setError('Неверные учетные данные');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: Role,
      organization: string,
      department: string
    ) => {
      setLoading(true);
      setError(null);
      
      try {
        const userData = await authAPI.register({ 
          name,
          email, 
          password, 
          role, 
          organization, 
          department 
        });
        setUser(userData);
        navigate('/');
        return true;
      } catch (err: any) {
        setError(err.message || 'Ошибка регистрации');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    authAPI.logout();
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const checkPermission = useCallback((requiredRole: Role): boolean => {
    return user?.role === requiredRole;
  }, [user]);

  return {
    isAuthenticated: !!user,
    userRole: user?.role || null,
    userName: user?.name || '',
    userId: user?.id || 0,
    login,
    logout,
    user,
    loading: loading || !isInitialized,
    error,
    register,
    checkPermission,
    isInitialized
  };
};