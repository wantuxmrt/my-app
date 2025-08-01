// AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Server, ServerStatus, ServerAction } from '@/types/zzzOLD_types/admin';
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import styles from './AdminPanel.module.css';

const AdminPanel: React.FC = () => {
  const { user } = useAuthStore();
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLogs, setActionLogs] = useState<string[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  // Заглушки для API-вызовов
  const fetchServers = async () => {
    // Заглушка для реального API-вызова
    return new Promise<Server[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'frontend-01',
            name: 'Frontend Production',
            type: 'frontend',
            status: 'running',
            cpu: 45,
            memory: 32,
            uptime: '12d 4h',
            version: '1.4.2'
          },
          {
            id: 'backend-01',
            name: 'Backend API',
            type: 'backend',
            status: 'running',
            cpu: 68,
            memory: 78,
            uptime: '8d 12h',
            version: '2.1.0'
          },
          {
            id: 'db-01',
            name: 'Database Cluster',
            type: 'database',
            status: 'warning',
            cpu: 92,
            memory: 85,
            uptime: '22d 6h',
            version: '5.7.29'
          }
        ]);
      }, 800);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchServers();
        setServers(data);
      } catch (error) {
        console.error('Failed to load servers:', error);
        addLogEntry('Ошибка загрузки серверов');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addLogEntry = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const handleServerAction = async (serverId: string, action: ServerAction) => {
    // Заглушка для реального API-вызова
    try {
      addLogEntry(`Выполнение действия: ${action} на сервере ${serverId}`);
      
      // Имитация выполнения действия
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновление состояния сервера
      setServers(prev => 
        prev.map(server => 
          server.id === serverId 
            ? { ...server, status: getActionStatus(action) } 
            : server
        )
      );
      
      addLogEntry(`Действие ${action} успешно выполнено на сервере ${serverId}`);
    } catch (error) {
      addLogEntry(`Ошибка выполнения ${action} на сервере ${serverId}`);
    }
  };

  const getActionStatus = (action: ServerAction): ServerStatus => {
    switch (action) {
      case 'start': return 'running';
      case 'stop': return 'stopped';
      case 'restart': return 'running';
      case 'maintenance': return 'maintenance';
      default: return 'unknown';
    }
  };

  const getStatusClass = (status: ServerStatus) => {
    switch (status) {
      case 'running': return styles.statusRunning;
      case 'stopped': return styles.statusStopped;
      case 'warning': return styles.statusWarning;
      case 'error': return styles.statusError;
      case 'maintenance': return styles.statusMaintenance;
      default: return styles.statusUnknown;
    }
  };

  const getStatusText = (status: ServerStatus) => {
    switch (status) {
      case 'running': return 'Работает';
      case 'stopped': return 'Остановлен';
      case 'warning': return 'Предупреждение';
      case 'error': return 'Ошибка';
      case 'maintenance': return 'Обслуживание';
      default: return 'Неизвестно';
    }
  };

  // Проверка прав администратора
  if (user?.role !== 'admin') {
    return (
      <div className={styles.adminPanel}>
        <div className={styles.accessDenied}>
          <i className="fas fa-ban"></i>
          <h3>Доступ запрещен</h3>
          <p>У вас недостаточно прав для доступа к этому разделу</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.adminPanel}>
        <div className={styles.loading}>
          <i className="fas fa-spinner fa-spin"></i>
          <p>Загрузка данных о серверах...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPanel}>
      <h2><i className="fas fa-server"></i> Управление серверами</h2>
      
      <div className={styles.serverGrid}>
        {servers.map(server => (
          <Card key={server.id} className={styles.serverCard}>
            <div className={styles.cardHeader}>
              <h3>{server.name}</h3>
              <span className={`${styles.statusBadge} ${getStatusClass(server.status)}`}>
                {getStatusText(server.status)}
              </span>
            </div>
            
            <div className={styles.serverInfo}>
              <div className={styles.infoRow}>
                <span>Тип:</span>
                <span>{server.type === 'frontend' ? 'Frontend' : 
                       server.type === 'backend' ? 'Backend' : 'База данных'}</span>
              </div>
              <div className={styles.infoRow}>
                <span>CPU:</span>
                <span className={server.cpu > 80 ? styles.warningValue : ''}>
                  {server.cpu}%
                </span>
              </div>
              <div className={styles.infoRow}>
                <span>Память:</span>
                <span className={server.memory > 80 ? styles.warningValue : ''}>
                  {server.memory}%
                </span>
              </div>
              <div className={styles.infoRow}>
                <span>Время работы:</span>
                <span>{server.uptime}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Версия:</span>
                <span>{server.version}</span>
              </div>
            </div>
            
            <div className={styles.serverActions}>
              {server.status !== 'stopped' && (
                <Button 
                  variant="warning" 
                  size="small"
                  icon="stop"
                  onClick={() => handleServerAction(server.id, 'stop')}
                >
                  Остановить
                </Button>
              )}
              
              {server.status !== 'running' && (
                <Button 
                  variant="success" 
                  size="small"
                  icon="play"
                  onClick={() => handleServerAction(server.id, 'start')}
                >
                  Запустить
                </Button>
              )}
              
              <Button 
                variant="secondary" 
                size="small"
                icon="sync"
                onClick={() => handleServerAction(server.id, 'restart')}
              >
                Перезапустить
              </Button>
              
              <Button 
                variant="info" 
                size="small"
                icon="wrench"
                onClick={() => handleServerAction(server.id, 'maintenance')}
              >
                Тех. обслуживание
              </Button>
              
              <Button 
                variant="primary" 
                size="small"
                icon="chart-line"
                onClick={() => setSelectedServer(server)}
              >
                Мониторинг
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className={styles.logSection}>
        <h3><i className="fas fa-terminal"></i> Журнал действий</h3>
        <div className={styles.logContainer}>
          {actionLogs.length > 0 ? (
            actionLogs.map((log, index) => (
              <div key={index} className={styles.logEntry}>
                {log}
              </div>
            ))
          ) : (
            <div className={styles.emptyLogs}>Нет записей в журнале</div>
          )}
        </div>
      </div>
      
      {selectedServer && (
        <div className={styles.monitorModal}>
          <div className={styles.modalHeader}>
            <h3>Мониторинг: {selectedServer.name}</h3>
            <Button 
              variant="secondary" 
              size="small"
              icon="times"
              onClick={() => setSelectedServer(null)}
            >
              Закрыть
            </Button>
          </div>
          
          <div className={styles.monitorContent}>
            <div className={styles.chartPlaceholder}>
              <i className="fas fa-chart-line"></i>
              <p>Графики нагрузки в реальном времени</p>
              <div className={styles.chartLegend}>
                <span>CPU: {selectedServer.cpu}%</span>
                <span>Память: {selectedServer.memory}%</span>
              </div>
            </div>
            
            <div className={styles.serverDetails}>
              <h4>Детальная информация</h4>
              <div className={styles.detailRow}>
                <span>ID сервера:</span>
                <span>{selectedServer.id}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Текущий статус:</span>
                <span className={getStatusClass(selectedServer.status)}>
                  {getStatusText(selectedServer.status)}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span>Время работы:</span>
                <span>{selectedServer.uptime}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Версия ПО:</span>
                <span>{selectedServer.version}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <Button 
              variant="danger" 
              icon="exclamation-triangle"
              onClick={() => handleServerAction(selectedServer.id, 'emergency-restart')}
            >
              Аварийный перезапуск
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;