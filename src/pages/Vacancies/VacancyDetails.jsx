import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./VacancyDetails.scss";

const VacancyDetails = () => {
  const { id } = useParams(); // Получаем id из URL
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancyDetails = async () => {
      try {
        const response = await fetch(
          `https://api.togetherrecruitment.kg/api/v2/info/vacancies/${id}/`
        );
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных вакансии");
        }
        const data = await response.json();
        setVacancy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancyDetails();
  }, [id]);
  console.log(vacancy);

  const formatDate = (dateString) => {
    if (!dateString) return "Дата не указана";

    try {
      // Разделяем дату и время по пробелу
      const [datePart] = dateString.split(" ");
      if (!datePart) throw new Error("Некорректный формат строки даты");

      // Проверяем, является ли дата уже в формате DD.MM.YYYY
      const [day, month, year] = datePart.split(".");
      if (!day || !month || !year) throw new Error("Некорректный формат даты");

      return `${day}.${month}.${year}`; // Возвращаем только дату
    } catch (error) {
      console.error("Ошибка форматирования даты:", error.message);
      return "Неверный формат даты";
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="vacancy-details">
      <div className="vacancy-details__main">
        <div className="vacancy-details__image">
          {vacancy.img_api ? (
            <img src={vacancy.img_api} alt={vacancy.title} />
          ) : (
            <div className="vacancy-details__placeholder">Нет изображения</div>
          )}
        </div>
        <div className="vacancy-details__info">
          <p className="vacancy-details__date">
            {vacancy?.uploaded_at
              ? formatDate(vacancy.uploaded_at)
              : "Дата не указана"}
          </p>
          <h1 className="vacancy-details__title">{vacancy.title}</h1>
          <h2 className="vacancy-details__subtitle">Требования:</h2>
          <p>
            <strong>Возраст:</strong> {vacancy.age || "Не указано"}
          </p>
          <p>
            <strong>Опыт работы:</strong> {vacancy.experience || "Не указано"}
          </p>
          <p>
            <strong>Семейное положение:</strong>{" "}
            {vacancy.familyStatus || "Не указано"}
          </p>
          <p>
            <strong>Зарплата:</strong> {vacancy.salary || "Не указано"}
          </p>
          <p>
            <strong>График работы:</strong> {vacancy.schedule || "Не указано"}
          </p>
          <p>
            <strong>Вакансия действует до:</strong>{" "}
            {vacancy.valid_until || "Не указано"}
          </p>
          <p>
            <strong>Свободные места:</strong> {vacancy.place || "Не указано"}
          </p>
          <div className="vacancy-details__description">
            <p>{vacancy.text}</p>
          </div>
          <button className="button button--primary">Оставить заявку</button>
        </div>
      </div>
    </div>
  );
};

export default VacancyDetails;
