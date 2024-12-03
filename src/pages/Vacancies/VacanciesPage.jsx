import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import "./VacanciesPage.scss";
import vacancy1 from "../../assets/images/vacancy1.jpg";
import searchIcon from "../../assets/icons/search.svg";

const VacanciesPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Настройки пагинации
  const itemsPerPage = 8; // Количество вакансий на странице
  const totalPages = 5; // Общее количество страниц (в реальном приложении будет рассчитываться)

  const vacancies = [
    {
      id: 1,
      image: vacancy1,
      title: "Продавец",
      requirements: "возраст 18+, опыт работы 2 год, заработная плата от 50000 руб",
      positions: 27,
      date: "02.06.2024",
    },
    // Добавьте остальные вакансии
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Здесь будет логика загрузки данных для новой страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="vacancies-page">
      <div className="vacancies-page__search">
        <div className="container">
          <div className="search-bar">
            <div className="search-bar__input-wrapper">
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar__input"
              />
              <img src={searchIcon} alt="Search" className="search-bar__icon" />
            </div>
            <div className="search-bar__select-wrapper">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="search-bar__select"
              >
                <option value="all">Все страны</option>
                <option value="poland">Польша</option>
                <option value="germany">Германия</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="vacancies-page__grid">
          {vacancies.map((vacancy) => (
            <Link 
              to={`/vacancies/${vacancy.id}`} 
              key={vacancy.id} 
              className="vacancy-card"
            >
              <div className="vacancy-card__image">
                <img src={vacancy.image} alt={vacancy.title} />
              </div>
              <div className="vacancy-card__content">
                <div className="vacancy-card__date">{vacancy.date}</div>
                <h3 className="vacancy-card__title">{vacancy.title}</h3>
                <p className="vacancy-card__requirements">{vacancy.requirements}</p>
                <p className="vacancy-card__positions">
                  Свободных мест: {vacancy.positions}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="vacancies-page__pagination">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VacanciesPage;
