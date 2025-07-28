import React from 'react';
import styles from './RequestTable.module.css';
import { Ticket } from '@/types/app';

interface RequestTableProps {
  requests: Ticket[];
  onRowClick: (request: Ticket) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({ requests, onRowClick }) => {
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
    <table className={styles.table}>
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
        {requests.map(request => (
          <tr 
            key={request.id} 
            className={styles.row}
            onClick={() => onRowClick(request)}
          >
            <td>#TS-{request.id.toString().padStart(4, '0')}</td>
            <td>{request.title}</td>
            <td>
              <span className={`${styles.system} ${request.system === '1c' ? styles.system1c : styles.systemMis}`}>
                {request.system === '1c' ? '1С' : 'МИС'}
              </span>
            </td>
            <td>
              <span className={`${styles.status} ${styles[`status${request.status}`]}`}>
                {getStatusText(request.status)}
              </span>
            </td>
            <td>
              <span className={`${styles.priority} ${styles[`priority${request.priority}`]}`}>
                {getPriorityText(request.priority)}
              </span>
            </td>
            <td>{formatDate(request.created)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestTable;