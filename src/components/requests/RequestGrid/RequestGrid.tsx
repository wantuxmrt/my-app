import React from 'react';
import { Ticket } from '@/types';
import styles from './RequestGrid.module.css';

interface RequestGridProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const RequestGrid: React.FC<RequestGridProps> = ({ tickets, onTicketClick }) => {
  return <div className={styles.grid}>{/* Реализация */}</div>;
};

export default RequestGrid;