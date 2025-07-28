import React from 'react';
import styles from './Input.module.css';

export interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  icon,
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
    </div>
  );
};

export default Input;