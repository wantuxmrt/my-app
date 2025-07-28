import React from 'react';
import styles from './RequestCard.module.css';
import { Ticket } from '@/types/app';

interface RequestCardProps {
  request: Ticket;
  onClick: () => void;
  className?: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onClick, className }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: Ticket['status']) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'in-progress': return 'В работе';
      case 'resolved': return 'Решен';
      case 'reopened': return 'Возвращен';
      case 'closed': return 'Закрыт';
      default: return status;
    }
  };

  const getPriorityText = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'critical': return 'Критический';
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  return (
    <div 
      className={`${styles.card} ${className || ''}`} 
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <div className={styles.requestId}>#TS-{request.id.toString().padStart(4, '0')}</div>
        <div className={`${styles.system} ${request.system === '1c' ? styles.system1c : styles.systemMis}`}>
          {request.system === '1c' ? '1С' : 'МИС'}
        </div>
      </div>
      
      <div className={styles.title}>{request.title}</div>
      
      <div className={styles.description}>
        {request.description.substring(0, 100)}
        {request.description.length > 100 && '...'}
      </div>
      
      <div className={styles.footer}>
        <div className={styles.date}>{formatDate(request.created)}</div>
        <div className={`${styles.status} ${styles[`status${request.status}`]} ${styles[`priority${request.priority}`]}`}>
          {getStatusText(request.status)}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;