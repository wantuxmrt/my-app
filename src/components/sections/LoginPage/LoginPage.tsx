import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import TabsNavigation from '@/components/common/TabsNavigation/TabsNavigation';
import styles from './LoginPage.module.css';
import { useAuthStore } from '@/store/authStore';
import { Role } from '@/types/app';

const LoginPage: React.FC = () => {
  const { login, register } = useAuthStore();
  const [activeType, setActiveType] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('user');
  const [organization, setOrganization] = useState('org1');
  const [department, setDepartment] = useState('dep1');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (activeType === 'login') {
        login(email, password);
      } else {
        register(email, password, name, role, organization, department);
      }
    } catch (err) {
      setError('Ошибка при выполнении операции');
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
            >
              Вход
            </button>
            <button
              className={`${styles.tab} ${activeType === 'register' ? styles.active : ''}`}
              onClick={() => setActiveType('register')}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {activeType === 'register' && (
              <>
                <div className={styles.formGroup}>
                  <label>Роль</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
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
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  >
                    <option value="org1">Организация 1</option>
                    <option value="org2">Организация 2</option>
                    <option value="org3">Организация 3</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Отдел</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="dep1">Отдел поддержки</option>
                    <option value="dep2">Бухгалтерия</option>
                    <option value="dep3">ИТ отдел</option>
                    <option value="dep4">Отдел продаж</option>
                  </select>
                </div>
              </>
            )}
            
            {error && <div className={styles.error}>{error}</div>}
            
            <button type="submit" className={styles.submitButton}>
              {activeType === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;