import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./VacancyDetails.scss";
import vacancyImage from "../../assets/images/vacancy-detail.jpg"; // Добавьте фото
import vacancy1 from "../../assets/images/vacancy1.jpg";
import vacancy2 from "../../assets/images/vacancy2.jpg";
import vacancy3 from "../../assets/images/vacancy3.jpg";
import vacancy4 from "../../assets/images/vacancy4.jpg";
import { useState } from "react";
import ContactModal from "../../components/common/Modal/ContactModal";

const VacancyDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Данные текущей вакансии
  const vacancy = {
    id: 1,
    image: vacancyImage,
    title: "Продавец",
    date: "02.06.2024",
    requirements: {
      age: "18+",
      experience: "2 года",
      familyStatus: "необязательно",
      salary: "от 2000$",
      schedule: "2/2",
      validUntil: "02.08.2024",
    },
    positions: 27,
    description:
      "Lorem ipsum dolor sit amet consectetur. Urna gravida lectus diam etiam. Mi ultrices porttitor orci quam porta commodo. Tincidunt eget scelerisque aliquam elit mauris feugiat id. Lorem ipsum dolor sit amet consectetur. Urna gravida lectus diam etiam. Mi ultrices porttitor orci quam porta commodo. Tincidunt eget scelerisque aliquam elit mauris feugiat id.",
  };

  // Похожие вакансии
  const similarVacancies = [
    {
      id: 2,
      image: vacancy2,
      title: "Продавец",
      requirements: "возраст 18+, опыт работы 2 год, заработная плата от 2000$",
      positions: 27,
      date: "02.06.2024",
    },
    {
      id: 3,
      image: vacancy3,
      title: "Продавец",
      requirements: "возраст 18+, опыт работы 2 год, заработная плата от 2000$",
      positions: 27,
      date: "02.06.2024",
    },
    {
      id: 4,
      image: vacancy4,
      title: "Продавец",
      requirements: "возраст 18+, опыт работы 2 год, заработная плата от 2000$",
      positions: 27,
      date: "02.06.2024",
    },
    // Добавьте остальные похожие вакансии
  ];

  return (
    <div className="vacancy-details">
      <div className="container">
        <div className="vacancy-details__main">
          <div className="vacancy-details__image">
            <img src={vacancy.image} alt={vacancy.title} />
          </div>
          <div className="vacancy-details__info">
            <div className="vacancy-details__header">
              <div className="vacancy-details__date">{vacancy.date}</div>
              <h1 className="vacancy-details__title">{vacancy.title}</h1>
            </div>

            <div className="vacancy-details__requirements">
              <h2>Требования:</h2>
              <ul>
                <li>Возраст: {vacancy.requirements.age}</li>
                <li>Опыт работы: {vacancy.requirements.experience}</li>
                <li>Семейное положение: {vacancy.requirements.familyStatus}</li>
                <li>Зарплата: {vacancy.requirements.salary}</li>
                <li>График работы: {vacancy.requirements.schedule}</li>
              </ul>
              <p>Вакансия действует до: {vacancy.requirements.validUntil}</p>
              <p>Свободных мест: {vacancy.positions}</p>
            </div>

            <div className="vacancy-details__description">
              <p>{vacancy.description}</p>
            </div>

            <button
              className="button button--primary"
              onClick={() => setIsModalOpen(true)}
            >
              Оставить заявку
            </button>
          </div>
        </div>

        <div className="vacancy-details__similar">
          <h2>Похожие вакансии</h2>
          <div className="vacancy-details__similar-grid">
            {similarVacancies.map((item) => (
              <Link
                to={`/vacancies/${item.id}`}
                key={item.id}
                className="vacancy-card"
              >
                <div className="vacancy-card__image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="vacancy-card__content">
                  <div className="vacancy-card__date">{item.date}</div>
                  <h3 className="vacancy-card__title">{item.title}</h3>
                  <p className="vacancy-card__requirements">
                    {item.requirements}
                  </p>
                  <p className="vacancy-card__positions">
                    Свободных мест: {item.positions}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default VacancyDetails;
