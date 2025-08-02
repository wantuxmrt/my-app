// fileUtils.ts
/**
 * Форматирует размер файла
 * @param bytes - Размер файла в байтах
 * @returns Отформатированная строка
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Извлекает расширение файла
 * @param filename - Имя файла
 * @returns Расширение файла
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Проверяет, является ли файл изображением
 * @param filename - Имя файла
 * @returns true, если файл изображение
 */
export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  const ext = getFileExtension(filename);
  return imageExtensions.includes(ext);
};

/**
 * Генерирует уникальное имя файла
 * @param filename - Оригинальное имя файла
 * @returns Уникальное имя файла
 */
export const generateUniqueFilename = (filename: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const ext = getFileExtension(filename);
  return `${timestamp}_${randomString}.${ext}`;
};

/**
 * Читает файл как Data URL
 * @param file - Файл
 * @returns Promise с Data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};