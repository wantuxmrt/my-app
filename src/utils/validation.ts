/**
 * Проверяет email на валидность
 * @param email - Email для проверки
 * @returns true, если email валиден
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Проверяет пароль на соответствие требованиям
 * @param password - Пароль для проверки
 * @returns true, если пароль соответствует требованиям
 */
export const isValidPassword = (password: string): boolean => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return re.test(password);
};

/**
 * Проверяет обязательное поле
 * @param value - Значение поля
 * @returns true, если поле заполнено
 */
export const isRequired = (value: string): boolean => {
  return value.trim() !== '';
};

/**
 * Проверяет номер телефона на валидность
 * @param phone - Номер телефона
 * @returns true, если номер валиден
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11;
};

/**
 * Проверяет сложность пароля
 * @param password - Пароль для проверки
 * @returns Уровень сложности (0-3)
 */
export const checkPasswordStrength = (password: string): number => {
  let strength = 0;
  
  // Длина пароля
  if (password.length >= 8) strength += 1;
  
  // Наличие цифр
  if (/\d/.test(password)) strength += 1;
  
  // Наличие спецсимволов
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  
  // Наличие букв в разных регистрах
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  
  return strength;
};