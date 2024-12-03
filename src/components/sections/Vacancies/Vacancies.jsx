import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Vacancies.scss";
import vacancy1 from "../../../assets/images/vacancy1.jpg";
import vacancy2 from "../../../assets/images/vacancy2.jpg";
import vacancy3 from "../../../assets/images/vacancy3.jpg";
import vacancy4 from "../../../assets/images/vacancy4.jpg";

const Vacancies = () => {
  const { t } = useTranslation();

  const vacancies = [
    {
      id: 1,
      image: vacancy1,
      title: "Продавец",
      requirements:
        "возраст 18+, опыт работы 2 год, заработная плата от 50000 руб",
      positions: 27,
      date: "02.06.2024",
    },
    {
      id: 2,
      image: vacancy2,
      title: "Продавец",
      requirements:
        "возраст 18+, опыт работы 2 год, заработная плата от 50000 руб",
      positions: 27,
      date: "02.06.2024",
    },
    {
      id: 3,
      image: vacancy3,
      title: "Продавец",
      requirements:
        "возраст 18+, опыт работы 2 год, заработная плата от 50000 руб",
      positions: 27,
      date: "02.06.2024",
    },
    {
      id: 4,
      image: vacancy4,
      title: "Продавец",
      requirements:
        "возраст 18+, опыт работы 2 год, заработная плата от 50000 руб",
      positions: 27,
      date: "02.06.2024",
    },
  ];

  return (
    <section className="vacancies">
      <div className="container">
        <h2 className="vacancies__title">Вакансии</h2>
        <div className="vacancies__grid">
          {vacancies.map((vacancy) => (
            <Link
              to={`/vacancies/${vacancy.id}`}
              key={vacancy.id}
              className="vacancies__item"
            >
              <div className="vacancies__image">
                <img src={vacancy.image} alt={vacancy.title} />
              </div>
              <div className="vacancies__content">
                <div className="vacancies__date">{vacancy.date}</div>
                <h3 className="vacancies__item-title">{vacancy.title}</h3>
                <p className="vacancies__requirements">
                  {vacancy.requirements}
                </p>
                <p className="vacancies__positions">
                  Свободных мест: {vacancy.positions}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vacancies;
