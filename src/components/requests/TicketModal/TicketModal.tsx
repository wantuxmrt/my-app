// src/components/requests/TicketModal/TicketModal.tsx
import React, { useState } from 'react';
import styles from './TicketModal.module.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

interface TicketModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view';
  ticket: any;
  onClose: () => void;
  onSubmit: (ticket: any) => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ 
  isOpen, 
  mode, 
  ticket: initialTicket, 
  onClose, 
  onSubmit 
}) => {
  const [ticket, setTicket] = useState(initialTicket || {
    system: '1c',
    priority: 'medium',
    title: '',
    description: ''
  });
  
  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setTicket({ ...ticket, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(ticket);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>
            {mode === 'create' && 'Создать запрос'}
            {mode === 'edit' && 'Редактировать запрос'}
            {mode === 'view' && 'Просмотр запроса'}
          </h3>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label>Система</label>
            <Select
              value={ticket.system}
              onChange={value => handleChange('system', value)}
              disabled={mode === 'view'}
              options={[
                { value: '1c', label: '1С' },
                { value: 'mis', label: 'МИС' },
              ]}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Приоритет</label>
            <Select
              value={ticket.priority}
              onChange={value => handleChange('priority', value)}
              disabled={mode === 'view'}
              options={[
                { value: 'low', label: 'Низкий' },
                { value: 'medium', label: 'Средний' },
                { value: 'high', label: 'Высокий' },
                { value: 'critical', label: 'Критический' },
              ]}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Заголовок</label>
            <Input
              value={ticket.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Краткое описание проблемы"
              disabled={mode === 'view'}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Описание</label>
            <textarea
              className={styles.textarea}
              value={ticket.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Подробное описание проблемы"
              rows={5}
              disabled={mode === 'view'}
            />
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          {mode !== 'view' && (
            <Button variant="primary" onClick={handleSubmit}>
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketModal;