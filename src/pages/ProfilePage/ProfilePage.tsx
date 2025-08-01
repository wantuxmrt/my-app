import React, { useState, useEffect } from 'react';
import { useAuthStore, useRequestsStore } from '@/store';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select/Select';
import styles from './ProfilePage.module.css';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import MainContent from '@/components/layout/MainContent/MainContent';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { tickets } = useRequestsStore();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [department, setDepartment] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setOrganization(user.organization);
      setDepartment(user.department);
      
      // Calculate user stats
      const userTickets = tickets.filter(t => t.userId === user.id);
      setStats({
        total: userTickets.length,
        open: userTickets.filter(t => t.status !== 'resolved').length,
        resolved: userTickets.filter(t => t.status === 'resolved').length
      });
    }
  }, [user, tickets]);

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        name,
        email,
        organization,
        department,
        password: newPassword || user.password
      });
      setEditMode(false);
    }
  };

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <AppHeader />
        <MainContent>
          <div className={styles.notAuthenticated}>
            <i className="fas fa-exclamation-circle"></i>
            <p>Для просмотра профиля необходимо авторизоваться</p>
          </div>
        </MainContent>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <AppHeader />
      <MainContent>
        <div className={styles.profileContainer}>
          <div className={styles.header}>
            <h2>
              <i className="fas fa-user-circle"></i> Профиль пользователя
            </h2>
            <Button 
              variant={editMode ? 'success' : 'primary'}
              icon={editMode ? 'save' : 'edit'}
              onClick={editMode ? handleSave : () => setEditMode(true)}
            >
              {editMode ? 'Сохранить' : 'Редактировать'}
            </Button>
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {user.avatar || user.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userStats}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{stats.total}</div>
                  <div className={styles.statLabel}>Всего запросов</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{stats.open}</div>
                  <div className={styles.statLabel}>Открытые</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{stats.resolved}</div>
                  <div className={styles.statLabel}>Решено</div>
                </div>
              </div>
            </div>

            <div className={styles.detailsSection}>
              <div className={styles.formGroup}>
                <label>Имя</label>
                {editMode ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                  />
                ) : (
                  <p>{name}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                {editMode ? (
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                  />
                ) : (
                  <p>{email}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Роль</label>
                <p>
                  {user.role === 'admin' ? 'Администратор' : 
                   user.role === 'support' ? 'Поддержка' : 
                   user.role === 'manager' ? 'Менеджер' : 'Пользователь'}
                </p>
              </div>

              <div className={styles.formGroup}>
                <label>Организация</label>
                {editMode ? (
                  <Select
                    value={organization}
                    onChange={(value) => setOrganization(value)}
                    options={[
                      { value: 'org1', label: 'Организация 1' },
                      { value: 'org2', label: 'Организация 2' },
                      { value: 'org3', label: 'Организация 3' },
                    ]}
                  />
                ) : (
                  <p>{organization}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Отдел</label>
                {editMode ? (
                  <Select
                    value={department}
                    onChange={(value) => setDepartment(value)}
                    options={[
                      { value: 'dep1', label: 'Отдел поддержки' },
                      { value: 'dep2', label: 'Бухгалтерия' },
                      { value: 'dep3', label: 'ИТ отдел' },
                      { value: 'dep4', label: 'Отдел продаж' },
                    ]}
                  />
                ) : (
                  <p>{department}</p>
                )}
              </div>

              {editMode && (
                <div className={styles.formGroup}>
                  <label>Новый пароль</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Оставьте пустым, чтобы не менять"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default ProfilePage;