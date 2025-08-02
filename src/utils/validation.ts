// validation.ts
/**
 * Проверяет email на валидность
 * @param email - Email
 * @returns true, если email валиден
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Проверяет пароль на соответствие требованиям
 * @param password - Пароль
 * @returns true, если пароль соответствует
 */
export const isValidPassword = (password: string): boolean => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

/**
 * Проверяет обязательное поле
 * @param value - Значение
 * @returns true, если поле заполнено
 */
export const isRequired = (value: string): boolean => {
  return value.trim() !== '';
};

/**
 * Проверяет номер телефона
 * @param phone - Номер телефона
 * @returns true, если номер валиден
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11;
};

/**
 * Проверяет сложность пароля
 * @param password - Пароль
 * @returns Уровень сложности (0-4)
 */
export const checkPasswordStrength = (password: string): number => {
  let strength = 0;
  
  if (password.length >= 8) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  
  return strength;
};

/**
 * Проверяет, совпадают ли пароли
 * @param password - Пароль
 * @param confirmPassword - Подтверждение пароля
 * @returns true, если пароли совпадают
 */
export const passwordsMatch = (
  password: string, 
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};