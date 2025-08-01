import React from 'react';
import styles from './Input.module.css';
import { IconName } from '@/types/zzzOLD_types/icons';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: IconName;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  icon,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {icon && <i className={`fas fa-${icon} ${styles.icon}`} />}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
    </div>
  );
};

export default Input;