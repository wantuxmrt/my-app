// src/components/requests/RequestCard.tsx
import React from 'react';
import { Ticket, Priority, TicketSystem } from '@/types/app';
import styles from './RequestCard.module.css';

const RequestCard = ({ ticket }: { ticket: Ticket }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'new': return styles.statusNew;
      case 'in-progress': return styles.statusInProgress;
      case 'resolved': return styles.statusResolved;
      case 'reopened': return styles.statusReopened;
      default: return '';
    }
  };

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case 'low': return styles.priorityLow;
      case 'medium': return styles.priorityMedium;
      case 'high': return styles.priorityHigh;
      case 'critical': return styles.priorityCritical;
      default: return '';
    }
  };

  const getSystemClass = (system: TicketSystem) => {
    return system === '1c' ? styles.system1c : styles.systemMis;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.requestCard}>
      <div className={styles.cardHeader}>
        <div className={styles.requestId}>#TS-{ticket.id.toString().padStart(4, '0')}</div>
        <div className={`${styles.requestSystem} ${getSystemClass(ticket.system)}`}>
          {ticket.system === '1c' ? '1С' : 'МИС'}
        </div>
      </div>
      
      <div className={styles.requestTitle}>{ticket.title}</div>
      
      <div className={styles.requestDescription}>
        {ticket.description.substring(0, 100)}{ticket.description.length > 100 ? '...' : ''}
      </div>
      
      <div className={styles.cardFooter}>
        <div className={styles.requestDate}>
          {formatDate(ticket.created)}
        </div>
        <div className={`${styles.requestStatus} ${getStatusClass(ticket.status)} ${getPriorityClass(ticket.priority)}`}>
          {ticket.status === 'new' && 'Новый'}
          {ticket.status === 'in-progress' && 'В работе'}
          {ticket.status === 'resolved' && 'Решен'}
          {ticket.status === 'reopened' && 'Возвращен'}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;