import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select/Select';
import styles from './ProfileSection.module.css';
import { User, Ticket } from '@/types/app';

interface ProfileSectionProps {
  onUpdate: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onUpdate }) => {
  const { currentUser, requests: tickets, updateUser } = useAppContext();
  const [userData, setUserData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [stats, setStats] = useState({
    totalRequests: 0,
    openRequests: 0,
    resolvedRequests: 0,
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUserData({ ...currentUser });
      
      // Calculate statistics
      const userRequests = tickets.filter((t: Ticket) => t.userId === currentUser.id);
      setStats({
        totalRequests: userRequests.length,
        openRequests: userRequests.filter((r: Ticket) => r.status !== 'resolved').length,
        resolvedRequests: userRequests.filter((r: Ticket) => r.status === 'resolved').length,
      });
    }
  }, [currentUser, tickets]);

  const handleInputChange = (field: keyof User, value: string) => {
    if (userData) {
      setUserData({ ...userData, [field]: value });
    }
  };

  const handleSave = () => {
    if (userData) {
      updateUser(userData);
      setPassword('');
      onUpdate();
    }
    setEditMode(false);
  };

  if (!currentUser || !userData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.profileSection}>
      <div className={styles.header}>
        <h2>
          <i className="fas fa-user-circle"></i> Профиль
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
            {userData.avatar ? (
              <img src={userData.avatar} alt="Аватар" />
            ) : (
              <i className="fas fa-user"></i>
            )}
          </div>
          <div className={styles.userStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.totalRequests}</span>
              <span className={styles.statLabel}>Всего запросов</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.openRequests}</span>
              <span className={styles.statLabel}>Открытые</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.resolvedRequests}</span>
              <span className={styles.statLabel}>Решено</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.formGroup}>
            <label>Имя</label>
            {editMode ? (
              <Input
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Имя"
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            {editMode ? (
              <Input
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email"
                type="email"
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Должность</label>
            {editMode ? (
              <Input
                value={userData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Должность"
              />
            ) : (
              <p>{userData.position || 'Не указано'}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Организация</label>
            {editMode ? (
              <Select
                value={userData.organization || ''}
                onChange={(value) => handleInputChange('organization', value)}
                options={[
                  { value: 'org1', label: 'Организация 1' },
                  { value: 'org2', label: 'Организация 2' },
                ]}
              />
            ) : (
              <p>{userData.organization || 'Не указано'}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Отдел</label>
            {editMode ? (
              <Select
                value={userData.department || ''}
                onChange={(value) => handleInputChange('department', value)}
                options={[
                  { value: 'dep1', label: 'Отдел поддержки' },
                  { value: 'dep2', label: 'Бухгалтерия' },
                ]}
              />
            ) : (
              <p>{userData.department || 'Не указано'}</p>
            )}
          </div>

          {editMode && (
            <div className={styles.formGroup}>
              <label>Новый пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Оставьте пустым, чтобы не менять"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;