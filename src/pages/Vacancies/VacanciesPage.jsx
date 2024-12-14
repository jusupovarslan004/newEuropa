import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import "./VacanciesPage.scss";
import searchIcon from "../../assets/icons/search.svg";

const VacanciesPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [vacancies, setVacancies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [countries, setCountries] = useState([]); // Список стран

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch(
          "https://api.togetherrecruitment.kg/api/v2/info/vacancies"
        );
        const data = await response.json();
        setVacancies(data.results); // Устанавливаем вакансии из ответа
        setTotalPages(Math.ceil(data.results.length / 8)); // Устанавливаем общее количество страниц

        // Генерация уникального списка стран
        const uniqueCountries = [
          ...new Set(
            data.results.map((vacancy) => vacancy.country).filter(Boolean)
          ),
        ];
        setCountries(uniqueCountries); // Сохраняем уникальные страны
      } catch (error) {
        console.error("Ошибка при получении вакансий:", error);
      }
    };

    fetchVacancies(); // Вызываем функцию для получения вакансий
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Дата не указана";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Ошибка форматирования даты:", error.message);
      return "Неверный формат даты";
    }
  };

  const filteredVacancies = vacancies.filter((vacancy) => {
    const matchesSearch = vacancy.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCountry =
      selectedCountry === "all" || vacancy.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const itemsPerPage = 8;
  const displayedVacancies = filteredVacancies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="vacancies-page">
      <div className="vacancies-page__search">
        <div className="container">
          <div className="search-bar">
            <div className="search-bar__input-wrapper">
              <input
                type="text"
                placeholder={t("search.placeholder")}
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
                <option value="all">{t("countries.all")}</option>
                {countries.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="vacancies-page__grid">
          {displayedVacancies.map((vacancy) => (
            <Link
              to={`/vacancies/${vacancy.id}`}
              key={vacancy.id}
              className="vacancy-card"
            >
              <div className="vacancy-card__image">
                {vacancy.img_api ? (
                  <img src={vacancy.img_api} alt={vacancy.title} />
                ) : (
                  <div className="vacancy-card__placeholder">
                    {t("image.not_available")}
                  </div>
                )}
              </div>
              <div className="vacancy-card__content">
                <div className="vacancy-card__date">
                  {formatDate(vacancy.uploaded_at)}
                </div>
                <h3 className="vacancy-card__title">{vacancy.title}</h3>
                <p className="vacancy-card__requirements">{vacancy.text}</p>
                <p className="vacancy-card__country">
                  {t("countries.label")}: {vacancy.country}
                </p>
                <p className="vacancy-card__program">
                  {t("program.label")}: {vacancy.program}
                </p>
                <p className="vacancy-card__specialization">
                  {t("specialization.label")}: {vacancy.specialization}
                </p>
                <p className="vacancy-card__salary">
                  {t("salary.label")}: {vacancy.salary}
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
