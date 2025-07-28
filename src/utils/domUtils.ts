/**
 * Плавно прокручивает страницу к указанному элементу
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
 * Устанавливает фокус на первый инвалидный инпут в форме
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