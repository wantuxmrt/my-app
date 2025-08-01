// src/components/requests/RequestGrid.tsx
import React from 'react';
import { Ticket } from '@/types/zzzOLD_types';
import RequestCard from './RequestCard';
import styles from './RequestGrid.module.css';

interface RequestGridProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const RequestGrid: React.FC<RequestGridProps> = ({ tickets, onTicketClick }) => {
  return (
    <div className={styles.grid}>
      {tickets.map(ticket => (
        <div key={ticket.id} className={styles.gridItem}>
          <RequestCard 
            ticket={ticket} 
            onClick={() => onTicketClick(ticket)} 
          />
        </div>
      ))}
    </div>
  );
};

export default RequestGrid;