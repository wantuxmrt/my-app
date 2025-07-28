/**
 * Форматирует дату в строку в формате "дд.мм.гггг чч:мм"
 * @param date - Дата в формате строки или объекта Date
 * @returns Отформатированная строка с датой
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  
  // Проверка на валидность даты
  if (isNaN(d.getTime())) {
    return '';
  }

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

/**
 * Вычисляет время, прошедшее с момента создания заявки
 * @param createdAt - Дата создания в формате строки или Date
 * @returns Строка с описанием времени, прошедшего с момента создания
 */
export const getTimeAgo = (createdAt: string | Date): string => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} секунд назад`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} минут назад`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} часов назад`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} дней назад`;
};