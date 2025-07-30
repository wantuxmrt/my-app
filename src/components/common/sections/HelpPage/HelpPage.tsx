import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card/Card';
import Button from '@/components/common/Button/Button';
import styles from './HelpSection.module.css';

interface Contact {
  type: string;
  icon: string;
  phone: string;
  email: string;
  workingHours: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface HelpData {
  about: string;
  contacts: Contact[];
  faq: FAQItem[];
}

const HelpSection = () => {
  const [helpData, setHelpData] = useState<HelpData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        const response = await fetch('/mockData/help.json');
        const data = await response.json();
        setHelpData(data);
      } catch (error) {
        console.error('Ошибка загрузки данных помощи:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  if (!helpData) {
    return <div className={styles.error}>Не удалось загрузить данные</div>;
  }

  return (
    <div className={styles.helpSection}>
      <h2><i className="fas fa-question-circle"></i> Помощь и контакты</h2>
      
      <div className={styles.section}>
        <h3><i className="fas fa-info-circle"></i> О системе</h3>
        <p>{helpData.about}</p>
      </div>
      
      <div className={styles.section}>
        <h3><i className="fas fa-phone-alt"></i> Контакты поддержки</h3>
        <div className={styles.contactGrid}>
          {helpData.contacts.map((contact, index) => (
            <Card key={index} className={styles.contactCard}>
              <div className={styles.cardHeader}>
                <i className={`fas fa-${contact.icon}`}></i>
                <h4>{contact.type}</h4>
              </div>
              <div className={styles.contactItem}>
                <i className="fas fa-phone"></i>
                <div>
                  <div className={styles.contactLabel}>Телефон</div>
                  <div className={styles.contactValue}>{contact.phone}</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <i className="fas fa-envelope"></i>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>{contact.email}</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <i className="fas fa-clock"></i>
                <div>
                  <div className={styles.contactLabel}>Часы работы</div>
                  <div className={styles.contactValue}>{contact.workingHours}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className={styles.section}>
        <h3><i className="fas fa-map-marker-alt"></i> Наш офис</h3>
        <div className={styles.contactItem}>
          <i className="fas fa-building"></i>
          <div>
            <div className={styles.contactLabel}>Адрес</div>
            <div className={styles.contactValue}>г. Москва, ул. Пушкина, д. 15, офис 305</div>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <h3><i className="fas fa-question"></i> Часто задаваемые вопросы</h3>
        
        {helpData.faq.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.faqQuestion}>
              <i className="fas fa-question-circle"></i>
              {faq.question}
            </div>
            <div className={styles.faqAnswer}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.backButton}>
        <Button 
          variant="secondary"
          icon="arrow-left"
          onClick={() => window.history.back()}
        >
          Назад
        </Button>
      </div>
    </div>
  );
};

export default HelpSection;