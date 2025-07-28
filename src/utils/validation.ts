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