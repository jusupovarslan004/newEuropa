export const validateInternationalPhone = (phone) => {
  // Удаляем все пробелы и дефисы из номера
  const cleanPhone = phone.replace(/[\s-]/g, "");

  // Базовая проверка на международный формат
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
