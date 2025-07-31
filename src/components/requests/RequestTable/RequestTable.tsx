import React from 'react';
import { Ticket } from '@/types';
import styles from './RequestTable.module.css';

interface RequestTableProps {
  tickets: Ticket[];
  onRowClick?: (ticket: Ticket) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({ tickets, onRowClick = () => {} }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Заголовок</th>
          <th>Система</th>
          <th>Статус</th>
          <th>Приоритет</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr key={ticket.id} onClick={() => onRowClick(ticket)}>
            <td>{ticket.id}</td>
            <td>{ticket.title}</td>
            <td>{ticket.system}</td>
            <td>{ticket.status}</td>
            <td>{ticket.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestTable;