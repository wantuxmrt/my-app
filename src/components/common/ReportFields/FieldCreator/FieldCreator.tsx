import React, { useState } from 'react';
import { ReportField, FieldType, DataSource } from '@/types/reportFieldTypes';
import { validateField } from '@/utils/fieldUtils';
import styles from './FieldCreator.module.css';

interface FieldCreatorProps {
  field?: ReportField;
  onSubmit: (field: ReportField) => void;
  fields: ReportField[];
}

const FieldCreator: React.FC<FieldCreatorProps> = ({ 
  field, 
  onSubmit,
  fields
}) => {
  const initialData: Partial<ReportField> = field || {
    name: '',
    displayName: '',
    type: 'string',
    dataSource: 'tickets',
    dependencies: [],
    formula: ''
  };

  const [formData, setFormData] = useState<Partial<ReportField>>(initialData);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDependencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dependencies = Array.from(e.target.selectedOptions, opt => opt.value);
    setFormData(prev => ({ ...prev, dependencies }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateField(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newField: ReportField = {
      id: field?.id || `field_${Date.now()}`,
      name: formData.name!,
      displayName: formData.displayName!,
      type: formData.type! as FieldType,
      dataSource: formData.dataSource! as DataSource,
      sourceField: formData.sourceField,
      formula: formData.formula,
      dependencies: formData.dependencies || [],
      createdAt: field?.createdAt || new Date(),
      updatedAt: new Date()
    };

    onSubmit(newField);
    setErrors([]);
  };

  return (
    <div className={styles.container}>
      <h3>{field ? 'Edit Field' : 'Create New Field'}</h3>
      
      {errors.length > 0 && (
        <div className={styles.errorBox}>
          {errors.map((err, i) => (
            <div key={i} className={styles.errorItem}>• {err}</div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Technical Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="e.g. ticket_count"
            className={styles.input}
          />
          <small>Lowercase letters, numbers, underscores only</small>
        </div>
        
        <div className={styles.formGroup}>
          <label>Display Name*</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName || ''}
            onChange={handleChange}
            placeholder="e.g. Total Tickets"
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Field Type*</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
            <option value="calculated">Calculated</option>
          </select>
        </div>
        
        {formData.type !== 'calculated' && (
          <div className={styles.formGroup}>
            <label>Data Source*</label>
            <select
              name="dataSource"
              value={formData.dataSource}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="tickets">Tickets</option>
              <option value="users">Users</option>
              <option value="comments">Comments</option>
              <option value="systems">Systems</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        )}
        
        {formData.type === 'calculated' && (
          <div className={styles.formGroup}>
            <label>Calculation Formula*</label>
            <textarea
              name="formula"
              value={formData.formula || ''}
              onChange={handleChange}
              placeholder="e.g. total_time / ticket_count"
              className={styles.textarea}
              rows={3}
            />
          </div>
        )}
        
        <div className={styles.formGroup}>
          <label>Dependencies</label>
          <select
            multiple
            value={formData.dependencies || []}
            onChange={handleDependencyChange}
            className={styles.multiSelect}
          >
            {fields
              .filter(f => f.id !== field?.id) // Исключаем текущее поле
              .map(f => (
                <option key={f.id} value={f.id}>
                  {f.displayName} ({f.type})
                </option>
              ))}
          </select>
          <small>Hold CTRL to select multiple</small>
        </div>
        
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Field description..."
            className={styles.textarea}
            rows={2}
          />
        </div>
        
        <button type="submit" className={styles.submitButton}>
          {field ? 'Update Field' : 'Create Field'}
        </button>
      </form>
    </div>
  );
};

export default FieldCreator;