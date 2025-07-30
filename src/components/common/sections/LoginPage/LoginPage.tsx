import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    role: string,
    organization: string,
    department: string,
    name: string
  ) => {
    try {
      await register(
        name,
        email,
        password,
        role as any, // Приведение типа, так как Role - enum
        organization,
        department
      );
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      
      <div className={styles.modalWrapper}>
        <AuthModal 
          isOpen={true}
          onClose={() => navigate('/')}
          onLogin={handleLogin} 
          onRegister={handleRegister} 
        />
      </div>
    </div>
  );
};

export default LoginPage;