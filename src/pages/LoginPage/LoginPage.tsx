import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import TabsNavigation from '@/components/common/TabsNavigation/TabsNavigation';
import styles from './LoginPage.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, register } from '@/store/authSlice';
import { Role } from '@/types/zzzOLD_types/app';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  
  const [activeType, setActiveType] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as Role,
    organization: 'org1',
    department: 'dep1'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (activeType === 'login') {
        await dispatch(login({ 
          email: formData.email, 
          password: formData.password 
        })).unwrap();
      } else {
        await dispatch(register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          organization: formData.organization,
          department: formData.department
        })).unwrap();
      }
    } catch (err) {
      // Ошибка уже обработана в слайсе
    }
  };

  return (
    <div className={styles.loginPage}>
      <AppHeader />
      <TabsNavigation 
        activeTab="login" 
        onTabChange={() => {}} 
        tabs={[
          { id: 'my-requests', label: 'Мои запросы', icon: 'ticket-alt' },
          { id: 'moderation', label: 'Модерирование', icon: 'user-tie' },
          { id: 'admin', label: 'Администрирование', icon: 'cog' },
          { id: 'new-request', label: 'Создать запрос', icon: 'plus-circle' },
          { id: 'profile', label: 'Профиль', icon: 'user' },
          { id: 'help', label: 'Помощь', icon: 'question-circle' },
        ]}
      />
      
      <div className={styles.contentContainer}>
        <div className={styles.authContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeType === 'login' ? styles.active : ''}`}
              onClick={() => setActiveType('login')}
              disabled={loading}
            >
              Вход
            </button>
            <button
              className={`${styles.tab} ${activeType === 'register' ? styles.active : ''}`}
              onClick={() => setActiveType('register')}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            {activeType === 'register' && (
              <div className={styles.formGroup}>
                <label>Имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Пароль</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            {activeType === 'register' && (
              <>
                <div className={styles.formGroup}>
                  <label>Роль</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="user">Пользователь</option>
                    <option value="support">Поддержка</option>
                    <option value="admin">Администратор</option>
                    <option value="manager">Менеджер</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Организация</label>
                  <select
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="org1">Организация 1</option>
                    <option value="org2">Организация 2</option>
                    <option value="org3">Организация 3</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Отдел</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="dep1">Отдел поддержки</option>
                    <option value="dep2">Бухгалтерия</option>
                    <option value="dep3">ИТ отдел</option>
                    <option value="dep4">Отдел продаж</option>
                  </select>
                </div>
              </>
            )}
            
            {error && (
              <div className={styles.error}>
                {typeof error === 'string' 
                  ? error 
                  : 'Произошла ошибка при выполнении операции'}
              </div>
            )}
            
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <span>Обработка...</span>
              ) : activeType === 'login' ? (
                'Войти'
              ) : (
                'Зарегистрироваться'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;