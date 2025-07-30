// src/components/auth/AuthModal.tsx
import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import styles from './AuthModal.module.css';

type AuthType = 'login' | 'register';

const AuthModal = () => {
  const { login, register } = useAppContext();
  const [activeType, setActiveType] = useState<AuthType>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('user');
  const [organization, setOrganization] = useState('org1');
  const [department, setDepartment] = useState('dep1');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (activeType === 'login') {
        const success = login(email, password);
        if (!success) {
          setError('Неверные учетные данные');
        }
      } else {
        register(name, email, password, role, organization, department);
      }
    } catch (err) {
      setError('Ошибка при выполнении операции');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{activeType === 'login' ? 'Вход в систему' : 'Регистрация'}</h3>
        </div>
        
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
  );
};

export default AuthModal;