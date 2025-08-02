// arrayUtils.ts
/**
 * Группирует массив объектов по ключу
 * @param array - Исходный массив
 * @param key - Ключ для группировки
 * @returns Объект с группированными данными
 */
export const groupBy = <T, K extends keyof T>(
  array: T[], 
  key: K
): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

/**
 * Удаляет дубликаты из массива по ключу
 * @param array - Исходный массив
 * @param key - Ключ для сравнения
 * @returns Массив без дубликатов
 */
export const removeDuplicates = <T, K extends keyof T>(
  array: T[],
  key: K
): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

/**
 * Сортирует массив объектов по дате
 * @param array - Исходный массив
 * @param dateKey - Ключ с датой
 * @param ascending - Порядок сортировки (по возрастанию)
 * @returns Отсортированный массив
 */
export const sortByDate = <T>(
  array: T[],
  dateKey: keyof T,
  ascending = true
): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey] as unknown as string).getTime();
    const dateB = new Date(b[dateKey] as unknown as string).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Разделяет массив на чанки
 * @param array - Исходный массив
 * @param size - Размер чанка
 * @returns Массив чанков
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};