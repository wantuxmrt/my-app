import React, { useState, useEffect, useCallback } from 'react';
import Card from '@/components/common/Card/Card';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import styles from './HelpSection.module.css';
import { FaQuestionCircle, FaPhoneAlt, FaMapMarkerAlt, FaInfoCircle, FaBuilding, FaClock, FaEnvelope, FaPhone, FaChevronDown, FaChevronUp, FaCopy } from 'react-icons/fa';

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
  address: string;
}

const HelpSection = () => {
  const [helpData, setHelpData] = useState<HelpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [copiedItem, setCopiedItem] = useState<{type: string, value: string} | null>(null);

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Имитация загрузки данных
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData: HelpData = {
          about: "Система поддержки 1С/МИС предназначена для управления запросами пользователей, связанными с работой программных продуктов 1С и МИС. Здесь вы можете создавать новые запросы, отслеживать их статус, получать помощь от специалистов поддержки.",
          contacts: [
            {
              type: "Техническая поддержка",
              icon: "headset",
              phone: "+7 (495) 123-45-67",
              email: "support@mrtexpert.ru",
              workingHours: "Пн-Пт: 9:00 - 18:00\nСб-Вс: выходной"
            },
            {
              type: "Отдел разработки",
              icon: "users",
              phone: "+7 (495) 765-43-21",
              email: "dev@mrtexpert.ru",
              workingHours: "Пн-Пт: 10:00 - 19:00"
            },
            {
              type: "Бухгалтерия",
              icon: "calculator",
              phone: "+7 (495) 987-65-43",
              email: "accounting@mrtexpert.ru",
              workingHours: "Пн-Пт: 10:00 - 17:00"
            }
          ],
          faq: [
            {
              question: "Как создать новый запрос?",
              answer: "Перейдите на вкладку 'Создать запрос', выберите систему, тип проблемы, категорию и заполните детали запроса."
            },
            {
              question: "Как отслеживать статус моего запроса?",
              answer: "Все ваши запросы отображаются на вкладке 'Мои запросы'. Там вы можете видеть текущий статус и обновления."
            },
            {
              question: "Что делать, если я забыл пароль?",
              answer: "Используйте функцию 'Забыли пароль?' на странице входа или обратитесь к администратору вашей организации."
            },
            {
              question: "Как прикрепить файлы к запросу?",
              answer: "На последнем шаге создания запроса используйте область 'Прикрепить файлы'."
            },
            {
              question: "Как связаться со специалистом поддержки?",
              answer: "Вы можете позвонить по телефону технической поддержки или написать на email, указанные в разделе контактов."
            },
            {
              question: "Какие системы поддерживаются?",
              answer: "Мы поддерживаем все продукты 1С (Бухгалтерия, ЗУП, ERP) и медицинские информационные системы (МИС)."
            }
          ],
          address: "г. Москва, ул. Пушкина, д. 15, офис 305"
        };
        
        setHelpData(mockData);
      } catch (error) {
        console.error('Ошибка загрузки данных помощи:', error);
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchHelpData();
  }, []);

  const toggleFaq = useCallback((index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  }, []);

  const copyToClipboard = useCallback((type: string, value: string) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopiedItem({ type, value });
        setTimeout(() => setCopiedItem(null), 2000);
      })
      .catch(err => console.error('Ошибка копирования:', err));
  }, []);

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      headset: <FaPhoneAlt className={styles.contactIcon} />,
      users: <FaInfoCircle className={styles.contactIcon} />,
      calculator: <FaBuilding className={styles.contactIcon} />,
    };
    return iconMap[iconName] || <FaInfoCircle className={styles.contactIcon} />;
  };

  const filteredFaq = helpData?.faq.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Загрузка данных помощи...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FaQuestionCircle className={styles.errorIcon} />
        <h3>Произошла ошибка</h3>
        <p>{error}</p>
        <Button 
          variant="primary"
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Попробовать снова
        </Button>
      </div>
    );
  }

  if (!helpData) {
    return (
      <div className={styles.errorContainer}>
        <FaQuestionCircle className={styles.errorIcon} />
        <h3>Данные не найдены</h3>
        <p>Информация о помощи и контактах недоступна.</p>
      </div>
    );
  }

  return (
    <div className={styles.helpSection}>
      <div className={styles.header}>
        <h2><FaQuestionCircle className={styles.headerIcon} /> Помощь и контакты</h2>
        <p>Найдите ответы на часто задаваемые вопросы или свяжитесь с нашей поддержкой</p>
      </div>
      
      <div className={styles.searchSection}>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по вопросам и ответам..."
          icon="search"
        />
      </div>
      
      <div className={styles.section}>
        <h3><FaInfoCircle className={styles.sectionIcon} /> О системе</h3>
        <div className={styles.aboutContent}>
          <p>{helpData.about}</p>
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>1</div>
              <h4>Быстрая помощь</h4>
              <p>Получите ответы на ваши вопросы в кратчайшие сроки</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>2</div>
              <h4>Эксперты 1С/МИС</h4>
              <p>Наши специалисты имеют сертификаты и многолетний опыт</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>3</div>
              <h4>Круглосуточная поддержка</h4>
              <p>Критические проблемы решаем 24/7</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <h3><FaPhoneAlt className={styles.sectionIcon} /> Контакты поддержки</h3>
        <div className={styles.contactGrid}>
          {helpData.contacts.map((contact, index) => (
            <Card key={index} className={styles.contactCard}>
              <div className={styles.cardHeader}>
                {getIconComponent(contact.icon)}
                <h4>{contact.type}</h4>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FaPhone />
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.contactLabel}>Телефон</div>
                  <div className={styles.contactValue}>
                    {contact.phone}
                    <button 
                      className={styles.copyButton}
                      onClick={() => copyToClipboard('Телефон', contact.phone)}
                      title="Скопировать номер"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FaEnvelope />
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>
                    {contact.email}
                    <button 
                      className={styles.copyButton}
                      onClick={() => copyToClipboard('Email', contact.email)}
                      title="Скопировать email"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FaClock />
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.contactLabel}>Часы работы</div>
                  <div className={styles.contactValue}>
                    {contact.workingHours.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className={styles.section}>
        <h3><FaMapMarkerAlt className={styles.sectionIcon} /> Наш офис</h3>
        <div className={styles.officeContainer}>
          <div className={styles.officeMap}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapOverlay}>
                <h4>Карта расположения офиса</h4>
                <p>г. Москва, ул. Пушкина, д. 15</p>
              </div>
            </div>
          </div>
          <div className={styles.officeInfo}>
            <div className={styles.contactItem}>
              <div className={styles.contactIconWrapper}>
                <FaBuilding />
              </div>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Адрес</div>
                <div className={styles.contactValue}>
                  {helpData.address}
                  <button 
                    className={styles.copyButton}
                    onClick={() => copyToClipboard('Адрес', helpData.address)}
                    title="Скопировать адрес"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
            
            <div className={styles.transportInfo}>
              <h4>Как добраться</h4>
              <ul>
                <li><strong>Метро:</strong> Станция "Тверская", выход к ул. Пушкина</li>
                <li><strong>Автобусы:</strong> № 12, 24, 56 до остановки "Ул. Пушкина"</li>
                <li><strong>Парковка:</strong> Подземный паркинг в здании бизнес-центра</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <div className={styles.faqHeader}>
          <h3><FaQuestionCircle className={styles.sectionIcon} /> Часто задаваемые вопросы</h3>
          <div className={styles.faqCount}>Найдено вопросов: {filteredFaq.length}</div>
        </div>
        
        {filteredFaq.length === 0 ? (
          <div className={styles.noResults}>
            <p>По вашему запросу ничего не найдено</p>
            <Button 
              variant="secondary"
              onClick={() => setSearchQuery('')}
            >
              Сбросить поиск
            </Button>
          </div>
        ) : (
          <div className={styles.faqList}>
            {filteredFaq.map((faq, index) => (
              <Card key={index} className={styles.faqItem}>
                <div 
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                >
                  <div className={styles.questionText}>
                    <span className={styles.questionIndex}>Вопрос {index + 1}:</span>
                    {faq.question}
                  </div>
                  <div className={styles.chevronIcon}>
                    {expandedFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                
                {expandedFaq === index && (
                  <div className={styles.faqAnswer}>
                    {faq.answer}
                    <div className={styles.wasHelpful}>
                      <span>Был ли этот ответ полезен?</span>
                      <Button variant="text" size="small">Да</Button>
                      <Button variant="text" size="small">Нет</Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.contactForm}>
        <h3>Не нашли ответ на свой вопрос?</h3>
        <p>Заполните форму обратной связи, и мы свяжемся с вами в течение рабочего дня</p>
        
        <div className={styles.formGrid}>
          <Input type="text" placeholder="Ваше имя" />
          <Input type="email" placeholder="Ваш email" />
          <Input type="text" placeholder="Тема вопроса" className={styles.fullWidth} />
          <textarea 
            placeholder="Опишите ваш вопрос подробно..." 
            className={`${styles.fullWidth} ${styles.textArea}`}
            rows={4}
          ></textarea>
          <Button variant="primary" className={styles.fullWidth}>Отправить вопрос</Button>
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
        
        {copiedItem && (
          <div className={styles.copyNotification}>
            {copiedItem.type} скопирован в буфер обмена!
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpSection;