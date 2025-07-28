import React, { useState, useCallback, ChangeEvent } from 'react';
import styles from './RequestForm.module.css';
import { RequestFormData } from '../../../types/api';
import { TicketStatus, Priority, TicketSystem } from '@/types/app';

interface RequestFormProps {
  initialData?: RequestFormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  onTemplateSelect: (template: string) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  onTemplateSelect
}) => {
  const [formData, setFormData] = useState<RequestFormData>(initialData || {
    title: '',
    description: '',
    attachments: []
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      const fileNames = newFiles.map(file => file.name);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...fileNames]
      }));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    setFormData(prev => ({
      ...prev,
      attachments: newFiles.map(file => file.name)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    
    files.forEach(file => {
      formDataToSend.append('attachments', file);
    });
    
    onSubmit(formDataToSend);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      const fileNames = newFiles.map(file => file.name);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...fileNames]
      }));
      
      e.dataTransfer.clearData();
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Обработчик выбора шаблона
  const handleTemplateSelect = (template: string) => {
    onTemplateSelect(template);
    setFormData(prev => ({
      ...prev,
      title: template,
      description: `${template}. Пожалуйста, опишите проблему более подробно...`
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Заголовок запроса</label>
        <input
          type="text"
          name="title"
          className={styles.input}
          placeholder="Краткое описание проблемы"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Подробное описание</label>
        
        <div className={styles.templateButtons}>
          <button 
            type="button"
            className={styles.templateButton}
            onClick={() => handleTemplateSelect("Не работает принтер")}
          >
            <i className="fas fa-print"></i> Принтер
          </button>
          <button 
            type="button"
            className={styles.templateButton}
            onClick={() => handleTemplateSelect("Нет доступа к базе")}
          >
            <i className="fas fa-database"></i> Доступ
          </button>
          <button 
            type="button"
            className={styles.templateButton}
            onClick={() => handleTemplateSelect("Ошибка при проведении документа")}
          >
            <i className="fas fa-file-alt"></i> Документ
          </button>
        </div>
        
        <textarea
          name="description"
          className={styles.textarea}
          placeholder="Опишите проблему подробно, укажите шаги воспроизведения"
          value={formData.description}
          onChange={handleChange}
          rows={8}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Прикрепить файлы (скриншоты, логи)</label>
        
        <div 
          className={styles.fileUploadArea}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Перетащите файлы сюда или нажмите для выбора</p>
          <input 
            type="file" 
            id="fileInput"
            multiple
            className={styles.fileInput}
            onChange={handleFileChange}
          />
        </div>
        
        {files.length > 0 && (
          <div className={styles.attachmentsPreview}>
            <p>Выбранные файлы:</p>
            <div className={styles.fileList}>
              {files.map((file, index) => (
                <div key={index} className={styles.fileItem}>
                  <i className="fas fa-file"></i> 
                  <span>{file.name}</span>
                  <button 
                    type="button"
                    className={styles.removeFile}
                    onClick={() => removeFile(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          <i className="fas fa-paper-plane"></i> Отправить запрос
        </button>
        <button 
          type="button" 
          className={styles.cancelButton} 
          onClick={onCancel}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default RequestForm;