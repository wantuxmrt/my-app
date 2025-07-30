import React from 'react';
import styles from './CreateRequest.module.css';

interface CreateRequestProps {
  onCreateClick: () => void;
}

const CreateRequest: React.FC<CreateRequestProps> = ({ onCreateClick }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Создать запрос</h3>
      <p className={styles.description}>
        Не нашли решение вашей проблемы? Создайте новый запрос в службу поддержки
      </p>
      <button 
        className={styles.createButton}
        onClick={onCreateClick}
      >
        <i className="fas fa-plus-circle"></i> Создать запрос
      </button>
    </div>
  );
};

export default CreateRequest;