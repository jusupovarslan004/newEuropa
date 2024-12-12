// Создадим отдельный файл для функции валидации
export const validateInternationalPhone = (phone) => {
  // Удаляем все пробелы и дефисы из номера
  const cleanPhone = phone.replace(/[\s-]/g, "");

  // Базовая проверка на международный формат
  // Допускает номера в форматах:
  // +1234567890
  // +123 456 7890
  // 1234567890
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;

  if (!phoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      message: "Пожалуйста, введите корректный номер телефона",
    };
  }

  return {
    isValid: true,
    formattedPhone: cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`,
  };
};
