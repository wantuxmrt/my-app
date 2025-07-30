// src/components/requests/RequestTable.tsx
import React from 'react';
import { Ticket, Priority, TicketSystem } from '@/types/app';
import styles from './RequestTable.module.css';

const RequestTable = ({ tickets }: { tickets: Ticket[] }) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <table className={styles.requestsTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Заголовок</th>
          <th>Система</th>
          <th>Статус</th>
          <th>Приоритет</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr key={ticket.id}>
            <td>#TS-{ticket.id.toString().padStart(4, '0')}</td>
            <td>{ticket.title}</td>
            <td>
              <span className={`${styles.requestSystem} ${ticket.system === '1c' ? styles.system1c : styles.systemMis}`}>
                {ticket.system === '1c' ? '1С' : 'МИС'}
              </span>
            </td>
            <td>
              <span className={`${styles.tableStatus} ${getStatusClass(ticket.status)}`}>
                {ticket.status === 'new' && 'Новый'}
                {ticket.status === 'in-progress' && 'В работе'}
                {ticket.status === 'resolved' && 'Решен'}
                {ticket.status === 'reopened' && 'Возвращен'}
              </span>
            </td>
            <td>
              <span className={`${styles.tableStatus} ${getPriorityClass(ticket.priority)}`}>
                {ticket.priority === 'low' && 'Низкий'}
                {ticket.priority === 'medium' && 'Средний'}
                {ticket.priority === 'high' && 'Высокий'}
                {ticket.priority === 'critical' && 'Критический'}
              </span>
            </td>
            <td>{formatDate(ticket.created)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestTable;