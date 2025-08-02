// src/pages/RegisterPage/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { register } from '@/store/authSlice';
import { isValidEmail, isValidPassword, passwordsMatch } from '@/utils/validation';
import { showNotification } from '@/store/uiSlice';
import AuthForm from '@/components/common/AuthForm/AuthForm';
import EmptyLayout from '@/components/layout/EmptyLayout';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { name, email, password, confirmPassword } = formData;
    
    // Валидация
    if (!name.trim()) {
      dispatch(showNotification({ 
        message: 'Имя обязательно', 
        type: 'error' 
      }));
      return;
    }
    
    if (!isValidEmail(email)) {
      dispatch(showNotification({ 
        message: 'Некорректный email', 
        type: 'error' 
      }));
      return;
    }
    
    if (!isValidPassword(password)) {
      dispatch(showNotification({ 
        message: 'Пароль должен содержать минимум 8 символов, буквы и цифры', 
        type: 'error' 
      }));
      return;
    }
    
    if (!passwordsMatch(password, confirmPassword)) {
      dispatch(showNotification({ 
        message: 'Пароли не совпадают', 
        type: 'error' 
      }));
      return;
    }

    setLoading(true);
    try {
      await dispatch(register({ name, email, password })).unwrap();
      dispatch(showNotification({ 
        message: 'Регистрация прошла успешно!', 
        type: 'success' 
      }));
      navigate('/');
    } catch (error: any) {
      dispatch(showNotification({ 
        message: error.message || 'Ошибка регистрации', 
        type: 'error' 
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmptyLayout>
      <AuthForm 
        type="register"
        onSubmit={handleSubmit}
        loading={loading}
      />
    </EmptyLayout>
  );
};

export default RegisterPage;