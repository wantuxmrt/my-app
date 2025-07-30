// src/components/requests/RequestGrid.tsx
import React from 'react';
import RequestCard from './RequestCard';
import { Ticket } from '@/types/app';
import styles from './RequestGrid.module.css';

const RequestGrid = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div className={styles.requestsGrid}>
      {tickets.map(ticket => (
        <RequestCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default RequestGrid;