import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.message}>
          Запрашиваемая страница не существует или была перемещена
        </p>
        
        <div className={styles.actions}>
          <button 
            onClick={() => navigate(-1)}
            className={styles.buttonSecondary}
          >
            Назад
          </button>
          <button 
            onClick={() => navigate('/')}
            className={styles.buttonPrimary}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;