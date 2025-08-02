// domUtils.ts
/**
 * Плавно прокручивает страницу к элементу
 * @param elementId - ID элемента
 * @param offset - Смещение в пикселях
 */
export const scrollToElement = (elementId: string, offset = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
};

/**
 * Проверяет, видим ли элемент в области просмотра
 * @param element - DOM-элемент
 * @returns true, если элемент видим
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Устанавливает фокус на первый невалидный инпут в форме
 * @param formId - ID формы
 */
export const focusFirstInvalidInput = (formId: string): void => {
  const form = document.getElementById(formId);
  if (form) {
    const invalidInput = form.querySelector<HTMLInputElement>('input:invalid');
    if (invalidInput) {
      invalidInput.focus();
    }
  }
};

/**
 * Форматирует номер телефона
 * @param phone - Номер телефона
 * @returns Отформатированный номер
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]}-${match[4]}-${match[5]}`;
  }
  
  return phone;
};

/**
 * Копирует текст в буфер обмена
 * @param text - Текст для копирования
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};