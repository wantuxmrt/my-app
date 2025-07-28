import React from 'react';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import styles from './HelpSection.module.css';

const HelpSection = () => {
  return (
    <div className={styles.helpSection}>
      <h2><i className="fas fa-question-circle"></i> Помощь и контакты</h2>
      
      <div className={styles.section}>
        <h3><i className="fas fa-info-circle"></i> О системе</h3>
        <p>
          Система поддержки 1С/МИС предназначена для управления запросами пользователей, 
          связанными с работой программных продуктов 1С и МИС. Здесь вы можете создавать новые запросы, 
          отслеживать их статус, получать помощь от специалистов поддержки.
        </p>
      </div>
      
      <div className={styles.section}>
        <h3><i className="fas fa-phone-alt"></i> Контакты поддержки</h3>
        <div className={styles.contactGrid}>
          <Card className={styles.contactCard}>
            <div className={styles.cardHeader}>
              <i className="fas fa-headset"></i>
              <h4>Техническая поддержка</h4>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-phone"></i>
              <div>
                <div className={styles.contactLabel}>Телефон</div>
                <div className={styles.contactValue}>+7 (495) 123-45-67</div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-envelope"></i>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactValue}>support@mrtexpert.ru</div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-clock"></i>
              <div>
                <div className={styles.contactLabel}>Часы работы</div>
                <div className={styles.contactValue}>Пн-Пт: 9:00 - 18:00</div>
                <div className={styles.contactValue}>Сб-Вс: выходной</div>
              </div>
            </div>
          </Card>
          
          <Card className={styles.contactCard}>
            <div className={styles.cardHeader}>
              <i className="fas fa-users"></i>
              <h4>Отдел разработки</h4>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-phone"></i>
              <div>
                <div className={styles.contactLabel}>Телефон</div>
                <div className={styles.contactValue}>+7 (495) 765-43-21</div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-envelope"></i>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactValue}>dev@mrtexpert.ru</div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-clock"></i>
              <div>
                <div className={styles.contactLabel}>Часы работы</div>
                <div className={styles.contactValue}>Пн-Пт: 10:00 - 19:00</div>
              </div>
            </div>
          </Card>
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
        
        <div className={styles.faqItem}>
          <div className={styles.faqQuestion}>
            <i className="fas fa-question-circle"></i>
            Как создать новый запрос?
          </div>
          <div className={styles.faqAnswer}>
            Перейдите на вкладку "Создать запрос", выберите систему, тип проблемы, 
            категорию и заполните детали запроса.
          </div>
        </div>
        
        <div className={styles.faqItem}>
          <div className={styles.faqQuestion}>
            <i className="fas fa-question-circle"></i>
            Как отслеживать статус моего запроса?
          </div>
          <div className={styles.faqAnswer}>
            Все ваши запросы отображаются на вкладке "Мои запросы". 
            Там вы можете видеть текущий статус и обновления.
          </div>
        </div>
        
        <div className={styles.faqItem}>
          <div className={styles.faqQuestion}>
            <i className="fas fa-question-circle"></i>
            Что делать, если я забыл пароль?
          </div>
          <div className={styles.faqAnswer}>
            Обратитесь к администратору вашей организации для сброса пароля.
          </div>
        </div>
        
        <div className={styles.faqItem}>
          <div className={styles.faqQuestion}>
            <i className="fas fa-question-circle"></i>
            Как прикрепить файлы к запросу?
          </div>
          <div className={styles.faqAnswer}>
            На последнем шаге создания запроса используйте область "Прикрепить файлы".
          </div>
        </div>
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