import React, { useState, useCallback, ChangeEvent } from 'react';
import { useAppContext } from '../../../contexts';
import { Priority, TicketSystem } from '../../../types';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import Tab from '../../common/Tab/Tab';
import styles from './CreateRequest.module.css';

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

const problemCategories: Record<Priority, ProblemCategory> = {
  critical: {
    name: "Авария",
    icon: "fire",
    items: [
      {
        name: "Полное недоступность системы",
        icon: "server",
        templateDescription: "Система полностью недоступна для всех пользователей"
      },
      {
        name: "Критическая ошибка",
        icon: "bug",
        templateDescription: "Критическая функциональность системы не работает"
      }
    ]
  },
  high: {
    name: "Сбой",
    icon: "exclamation-triangle",
    items: [
      {
        name: "Частичная недоступность",
        icon: "server",
        templateDescription: "Часть функционала системы недоступна"
      },
      {
        name: "Ошибка при работе",
        icon: "bug",
        templateDescription: "Система работает с ошибками в неключевых функциях"
      }
    ]
  },
  medium: {
    name: "Обслуживание",
    icon: "cogs",
    items: [
      {
        name: "Настройка",
        icon: "sliders-h",
        templateDescription: "Требуется помощь в настройке системы"
      },
      {
        name: "Консультация",
        icon: "question-circle",
        templateDescription: "Требуется консультация по использованию системы"
      }
    ]
  },
  low: {
    name: "Дополнительно",
    icon: "ellipsis-h",
    items: [
      {
        name: "Запрос информации",
        icon: "info-circle",
        templateDescription: "Требуется дополнительная информация по системе"
      },
      {
        name: "Предложение",
        icon: "lightbulb",
        templateDescription: "Предложение по улучшению системы"
      }
    ]
  }
};

const CreateRequest = () => {
  const context = useAppContext();
  if (!context) return <div>Контекст приложения недоступен</div>;
  
  const { 
    currentUser, 
    editingTicketId, 
    createRequest, 
    updateRequest,
    setEditingTicket
  } = context;
  
  const [step, setStep] = useState(0);
  const [requestData, setRequestData] = useState({
    system: null as TicketSystem | null,
    priority: null as Priority | null,
    category: '',
    subcategory: '',
    title: '',
    description: '',
    attachments: [] as string[],
  });

  const handleSystemSelect = useCallback((system: TicketSystem) => {
    setRequestData(prev => ({ ...prev, system }));
    setStep(1);
  }, []);

  const handlePrioritySelect = useCallback((priority: Priority) => {
    setRequestData(prev => ({ ...prev, priority }));
    setStep(2);
  }, []);

  const handleCategorySelect = useCallback((category: string, subcategory = '', title = '', description = '') => {
    setRequestData(prev => ({
      ...prev,
      category,
      subcategory,
      title: title || category,
      description
    }));
    setStep(3);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!requestData.title.trim()) {
      alert('Пожалуйста, укажите заголовок запроса');
      return;
    }

    if (!currentUser) {
      alert('Пользователь не авторизован');
      return;
    }

    if (editingTicketId) {
      updateRequest({
        ...requestData,
        id: editingTicketId,
        status: 'new',
        userId: currentUser.id,
      } as any);
    } else {
      createRequest({
        ...requestData,
        status: 'new',
        userId: currentUser.id,
      } as any);
    }

    // Reset form
    setRequestData({
      system: null,
      priority: null,
      category: '',
      subcategory: '',
      title: '',
      description: '',
      attachments: [],
    });
    setStep(0);
    setEditingTicket(null);
  }, [requestData, editingTicketId, createRequest, updateRequest, currentUser, setEditingTicket]);

  const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(f => f.name);
      setRequestData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  }, []);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className={styles.systemSelection}>
            <h3>Выберите систему</h3>
            <div className={styles.systemGrid}>
              <div 
                className={`${styles.systemCardWrapper} ${requestData.system === '1c' ? styles.active : ''}`}
                onClick={() => handleSystemSelect('1c')}
              >
                <Card className={styles.systemCard}>
                  <i className="fas fa-building"></i>
                  <h4>1С</h4>
                  <p>Бухгалтерия, ЗУП, ERP и другие</p>
                </Card>
              </div>
              <div 
                className={`${styles.systemCardWrapper} ${requestData.system === 'mis' ? styles.active : ''}`}
                onClick={() => handleSystemSelect('mis')}
              >
                <Card className={styles.systemCard}>
                  <i className="fas fa-hospital"></i>
                  <h4>МИС</h4>
                  <p>1G Больница и другие медицинские системы</p>
                </Card>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className={styles.prioritySelection}>
            <h3>Выберите тип проблемы</h3>
            <div className={styles.priorityGrid}>
              {Object.entries(problemCategories).map(([priority, data]) => (
                <div
                  key={priority}
                  className={`${styles.priorityCardWrapper} ${styles[priority as Priority]}`}
                  onClick={() => handlePrioritySelect(priority as Priority)}
                >
                  <Card className={styles.priorityCard}>
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
                  </Card>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        const currentCategory = requestData.priority 
          ? problemCategories[requestData.priority] 
          : null;
        
        if (!currentCategory) return null;

        return (
          <div className={styles.categorySelection}>
            <h3>Выберите категорию</h3>
            <p>
              Тип: <span className={requestData.priority ? styles[requestData.priority] : ''}>{currentCategory.name}</span>
            </p>
            
            <div className={styles.categoriesList}>
              {currentCategory.items.map((item, index) => (
                <div key={index} className={styles.categoryItem}>
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
                    {item.subItems && <span>{item.subItems.length} подкатегорий</span>}
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
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.detailsForm}>
            <h3>{editingTicketId ? 'Редактирование запроса' : 'Детали запроса'}</h3>
            
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles[requestData.system!]}>
                  {requestData.system === '1c' ? '1С' : 'МИС'}
                </span>
                <span className={requestData.priority ? styles[requestData.priority] : ''}>
                  {requestData.priority && problemCategories[requestData.priority].name}
                </span>
              </div>
              <h4>{requestData.title}</h4>
              <p>{requestData.description.substring(0, 200)}{requestData.description.length > 200 ? '...' : ''}</p>
            </div>
            
            <div className={styles.formGroup}>
              <label>Заголовок запроса</label>
              <input
                type="text"
                value={requestData.title}
                onChange={e => setRequestData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Краткое описание проблемы"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Подробное описание</label>
              <div className={styles.editorToolbar}>
                <Button 
                  size="small"
                  onClick={() => setRequestData(prev => ({
                    ...prev, 
                    description: prev.description + '\nНе работает принтер'
                  }))}
                  icon="print"
                >
                  Принтер
                </Button>
                <Button 
                  size="small"
                  onClick={() => setRequestData(prev => ({
                    ...prev, 
                    description: prev.description + '\nНет доступа к базе'
                  }))}
                  icon="database"
                >
                  Доступ
                </Button>
                <Button 
                  size="small"
                  onClick={() => setRequestData(prev => ({
                    ...prev, 
                    description: prev.description + '\nОшибка при проведении документа'
                  }))}
                  icon="file-alt"
                >
                  Документ
                </Button>
              </div>
              <textarea
                value={requestData.description}
                onChange={e => setRequestData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Опишите проблему подробно..."
                rows={8}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Прикрепить файлы</label>
              <div className={styles.fileUpload}>
                <div className={styles.uploadArea}>
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Перетащите файлы сюда или нажмите для выбора</p>
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleFileUpload}
                  />
                </div>
                
                {requestData.attachments.length > 0 && (
                  <div className={styles.attachments}>
                    <p>Прикрепленные файлы:</p>
                    <ul>
                      {requestData.attachments.map((file, idx) => (
                        <li key={idx}>
                          <i className="fas fa-file"></i> {file}
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
              className={styles.fullWidthButton}
            >
              {editingTicketId ? 'Сохранить изменения' : 'Отправить запрос'}
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
            onClick={() => setStep(index)}
            icon={stepConfig.icon}
            label={stepConfig.title}
          />
        ))}
      </div>
      
      <div className={styles.stepContent}>
        {renderStep()}
      </div>
      
      {step > 0 && (
        <div className={styles.navigation}>
          <Button 
            variant="secondary"
            onClick={() => setStep(prev => prev - 1)}
            icon="arrow-left"
          >
            Назад
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateRequest;