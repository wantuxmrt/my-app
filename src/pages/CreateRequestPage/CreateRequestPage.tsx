import React, { useState, useEffect, useCallback } from 'react';
import { useRequestsStore } from '@/store/requestsStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { Priority, TicketSystem, TicketStatus } from '@/types/zzzOLD_types/app';
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import Tab from '@/components/common/Tab/Tab';
import styles from './CreateRequestPage.module.css';

// Тип для категории проблем
type ProblemCategory = {
  name: string;
  icon: string;
  items: {
    name: string;
    icon: string;
    templateDescription?: string;
    subItems?: {
      name: string;
      autoTitle?: string;
      templateDescription?: string;
    }[];
  }[];
};

// Категории проблем с приоритетами
const problemCategories: Record<Priority, ProblemCategory> = {
  critical: {
    name: "Авария",
    icon: "fire",
    items: [
      { 
        name: "Не работает", 
        icon: "power-off", 
        subItems: [
          { 
            name: "Вся компания", 
            autoTitle: "Система не работает: Вся компания",
            templateDescription: "Система полностью не функционирует для всех пользователей. Опишите симптомы:"
          },
          { 
            name: "Отдельные пользователи", 
            autoTitle: "Система не работает: Отдельные пользователи",
            templateDescription: "Система не работает для следующих пользователей: [список]. Опишите проблему:"
          }
        ] 
      },
      { 
        name: "Нет лицензии", 
        icon: "key",
        templateDescription: "Отсутствует лицензия на использование программного обеспечения. Сообщение об ошибке: [приведите текст ошибки]." 
      },
      { 
        name: "Сервер недоступен", 
        icon: "server",
        templateDescription: "Сервер баз данных недоступен. Проверьте подключение и настройки сети." 
      },
      // Другие элементы
    ]
  },
  high: {
    name: "Сбой",
    icon: "exclamation-triangle",
    items: [
      { 
        name: "Выполнять операции", 
        icon: "play-circle",
        templateDescription: "Не удается выполнить операцию [название операции]. Опишите проблему:" 
      },
      { 
        name: "Доступ к данным", 
        icon: "database",
        templateDescription: "Нет доступа к важным данным. Укажите какие именно данные недоступны:" 
      },
      // Другие элементы
    ]
  },
  medium: {
    name: "Обслуживание",
    icon: "cogs",
    items: [
      { 
        name: "1С Бухгалтерия / ЗУП / ERP", 
        icon: "building",
        templateDescription: "Требуется помощь с настройкой/обслуживанием модуля [название модуля]. Описание задачи:" 
      },
      { 
        name: "Настройка отчетов", 
        icon: "file-alt",
        templateDescription: "Требуется помощь с настройкой отчета [название отчета]. Описание задачи:" 
      },
      // Другие элементы
    ]
  },
  low: {
    name: "Дополнительно",
    icon: "ellipsis-h",
    items: [
      { 
        name: "Внести оплату/платеж/счет", 
        icon: "money-bill-wave",
        templateDescription: "Требуется внести оплату/платеж/счет. Детали: ..." 
      },
      { 
        name: "Обновление данных", 
        icon: "sync-alt",
        templateDescription: "Требуется обновить данные в системе. Укажите какие данные:" 
      },
      // Другие элементы
    ]
  }
};

const CreateRequestPage: React.FC = () => {
  const { createTicket, updateTicket, tickets } = useRequestsStore();
  const { editingTicketId, setEditingTicket } = useUIStore();
  const { user } = useAuthStore();
  
  const [step, setStep] = useState(0);
  const [requestData, setRequestData] = useState({
    system: '' as TicketSystem | '',
    priority: '' as Priority | '',
    category: '',
    subcategory: '',
    title: '',
    description: '',
    attachments: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Загрузка данных редактируемого тикета
  useEffect(() => {
    if (editingTicketId) {
      const ticket = tickets.find(t => t.id === editingTicketId);
      if (ticket) {
        setRequestData({
          system: ticket.system,
          priority: ticket.priority,
          category: ticket.category || '',
          subcategory: ticket.subcategory || '',
          title: ticket.title,
          description: ticket.description,
          attachments: ticket.attachments || [],
        });
        setStep(3); // Перейти сразу к шагу деталей
      }
    } else {
      // Сброс формы при создании нового запроса
      setRequestData({
        system: '',
        priority: '',
        category: '',
        subcategory: '',
        title: '',
        description: '',
        attachments: [],
      });
      setStep(0);
    }
  }, [editingTicketId, tickets]);

  const handleSystemSelect = (system: TicketSystem) => {
    setRequestData(prev => ({ ...prev, system }));
    setStep(1);
  };

  const handlePrioritySelect = (priority: Priority) => {
    setRequestData(prev => ({ ...prev, priority }));
    setStep(2);
  };

  const handleCategorySelect = useCallback((
    category: string, 
    subcategory = '', 
    title = '', 
    description = ''
  ) => {
    setRequestData(prev => ({
      ...prev,
      category,
      subcategory,
      title: title || category,
      description: description || prev.description
    }));
    setStep(3);
  }, []);

  const handleSubmit = async () => {
    if (!requestData.title.trim()) {
      alert('Пожалуйста, укажите заголовок запроса');
      return;
    }

    if (!user) {
      alert('Пользователь не авторизован');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const ticketData = {
        ...requestData,
        status: 'new' as TicketStatus,
        userId: user.id,
        organization: user.organization,
        department: user.department,
        comments: [],
        created: new Date().toISOString()
      };

      if (editingTicketId) {
        await updateTicket(editingTicketId, ticketData);
      } else {
        await createTicket(ticketData);
      }

      // Сброс формы
      setRequestData({
        system: '',
        priority: '',
        category: '',
        subcategory: '',
        title: '',
        description: '',
        attachments: [],
      });
      setStep(0);
      setEditingTicket(null);
      
    } catch (error) {
      console.error('Ошибка при сохранении запроса:', error);
      alert('Произошла ошибка при сохранении запроса');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(f => f.name);
      setRequestData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add(styles.dragOver);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.dragOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.dragOver);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).map(f => f.name);
      setRequestData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setRequestData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const addTemplateToDescription = (template: string) => {
    setRequestData(prev => ({
      ...prev,
      description: prev.description + (prev.description ? '\n' : '') + template
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className={styles.systemSelection}>
            <h3>Выберите систему</h3>
            <div className={styles.systemGrid}>
              <Card 
                className={`${styles.systemCard} ${requestData.system === '1c' ? styles.active : ''}`}
                onClick={() => handleSystemSelect('1c')}
              >
                <div className={styles.cardContent}>
                  <i className="fas fa-building"></i>
                  <h4>1С</h4>
                  <p>Бухгалтерия, ЗУП, ERP и другие</p>
                </div>
              </Card>
              <Card 
                className={`${styles.systemCard} ${requestData.system === 'mis' ? styles.active : ''}`}
                onClick={() => handleSystemSelect('mis')}
              >
                <div className={styles.cardContent}>
                  <i className="fas fa-hospital"></i>
                  <h4>МИС</h4>
                  <p>1G Больница и другие медицинские системы</p>
                </div>
              </Card>
            </div>
          </div>
        );

      case 1:
        return (
          <div className={styles.prioritySelection}>
            <h3>Выберите тип проблемы</h3>
            <div className={styles.priorityGrid}>
              {Object.entries(problemCategories).map(([priority, data]) => (
                <Card
                  key={priority}
                  className={`${styles.priorityCard} ${styles[priority as Priority]}`}
                  onClick={() => handlePrioritySelect(priority as Priority)}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.priorityHeader}>
                      <i className={`fas fa-${data.icon}`}></i>
                      <h4>{data.name}</h4>
                    </div>
                    <ul>
                      {data.items.slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item.name}</li>
                      ))}
                      {data.items.length > 3 && <li>+{data.items.length - 3} еще...</li>}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        const currentPriority = requestData.priority as Priority;
        const currentCategory = problemCategories[currentPriority];
        
        if (!currentCategory) return null;

        return (
          <div className={styles.categorySelection}>
            <h3>Выберите категорию</h3>
            <p>
              Тип: <span className={styles[currentPriority]}>{currentCategory.name}</span>
            </p>
            
            <div className={styles.categoriesList}>
              {currentCategory.items.map((item, index) => (
                <Card key={index} className={styles.categoryItem}>
                  <div 
                    className={styles.categoryHeader}
                    onClick={() => {
                      if (!item.subItems) {
                        handleCategorySelect(
                          item.name, 
                          '', 
                          item.name,
                          item.templateDescription || ''
                        );
                      }
                    }}
                  >
                    <i className={`fas fa-${item.icon}`}></i>
                    <h4>{item.name}</h4>
                    {item.subItems && (
                      <span>{item.subItems.length} подкатегорий</span>
                    )}
                  </div>
                  
                  {item.subItems && (
                    <div className={styles.subcategories}>
                      {item.subItems.map((subItem, subIndex) => (
                        <div 
                          key={subIndex}
                          className={styles.subcategoryItem}
                          onClick={() => handleCategorySelect(
                            item.name,
                            subItem.name,
                            subItem.autoTitle || `${item.name}: ${subItem.name}`,
                            subItem.templateDescription || ''
                          )}
                        >
                          {subItem.name}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.detailsForm}>
            <h3>{editingTicketId ? 'Редактирование запроса' : 'Детали запроса'}</h3>
            
            <Card className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={`${styles.systemBadge} ${styles[requestData.system]}`}>
                  {requestData.system === '1c' ? '1С' : 'МИС'}
                </span>
                <span className={`${styles.priorityBadge} ${styles[requestData.priority as Priority]}`}>
                  {requestData.priority && problemCategories[requestData.priority as Priority]?.name}
                </span>
              </div>
              <h4>{requestData.title}</h4>
              <p>{requestData.description.substring(0, 200)}{requestData.description.length > 200 ? '...' : ''}</p>
            </Card>
            
            <div className={styles.formGroup}>
              <label>Заголовок запроса *</label>
              <input
                type="text"
                value={requestData.title}
                onChange={e => setRequestData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Краткое описание проблемы"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Подробное описание</label>
              <div className={styles.editorToolbar}>
                <Button 
                  variant="secondary"
                  size="small"
                  onClick={() => addTemplateToDescription('Не работает принтер')}
                  icon="print"
                >
                  Принтер
                </Button>
                <Button 
                  variant="secondary"
                  size="small"
                  onClick={() => addTemplateToDescription('Нет доступа к базе данных')}
                  icon="database"
                >
                  Доступ
                </Button>
                <Button 
                  variant="secondary"
                  size="small"
                  onClick={() => addTemplateToDescription('Ошибка при проведении документа')}
                  icon="file-alt"
                >
                  Документ
                </Button>
                <Button 
                  variant="secondary"
                  size="small"
                  onClick={() => addTemplateToDescription('Система зависает при выполнении операции')}
                  icon="hourglass-half"
                >
                  Зависание
                </Button>
              </div>
              <textarea
                value={requestData.description}
                onChange={e => setRequestData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Опишите проблему подробно, укажите шаги воспроизведения..."
                rows={8}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Прикрепить файлы</label>
              <div 
                className={styles.fileUpload}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className={styles.uploadArea}>
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Перетащите файлы сюда или нажмите для выбора</p>
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                  />
                </div>
                
                {requestData.attachments.length > 0 && (
                  <div className={styles.attachments}>
                    <p>Прикрепленные файлы:</p>
                    <ul>
                      {requestData.attachments.map((file, idx) => (
                        <li key={idx}>
                          <i className="fas fa-file"></i> {file}
                          <button 
                            className={styles.removeAttachment}
                            onClick={() => removeAttachment(idx)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleSubmit}
              icon="paper-plane"
              className={styles.submitButton}
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Обработка...
                </>
              ) : editingTicketId ? (
                'Сохранить изменения'
              ) : (
                'Отправить запрос'
              )}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { title: "Система", icon: "server" },
    { title: "Тип проблемы", icon: "bug" },
    { title: "Категория", icon: "folder" },
    { title: "Детали", icon: "info-circle" },
  ];

  return (
    <div className={styles.createRequest}>
      <div className={styles.stepsHeader}>
        {steps.map((stepConfig, index) => (
          <Tab
            key={index}
            active={step === index}
            onClick={() => step > index && setStep(index)}
            icon={stepConfig.icon}
            label={stepConfig.title}
            disabled={step < index}
          />
        ))}
      </div>
      
      <div className={styles.stepContent}>
        {renderStep()}
      </div>
      
      <div className={styles.navigation}>
        {step > 0 && (
          <Button 
            variant="secondary"
            onClick={() => setStep(prev => prev - 1)}
            icon="arrow-left"
          >
            Назад
          </Button>
        )}
        {step < 3 && step > 0 && (
          <Button 
            variant="primary"
            onClick={() => setStep(prev => prev + 1)}
            className={styles.nextButton}
          >
            Далее <i className="fas fa-arrow-right"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateRequestPage;