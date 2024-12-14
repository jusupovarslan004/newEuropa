import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import "./VacanciesPage.scss";
import searchIcon from "../../assets/icons/search.svg";

const VacanciesPage = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [vacancies, setVacancies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      const currentLang = i18n.language === "kg" ? "ky" : i18n.language;
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.togetherrecruitment.kg/api/v2/info/vacancies/?lang=${currentLang}`
        );
        const data = await response.json();
        setVacancies(data.results || []);
        setTotalPages(Math.ceil((data.results?.length || 0) / 8));

        const uniqueCountries = [
          ...new Set(
            (data.results || [])
              .map((vacancy) => vacancy?.country)
              .filter(Boolean)
          ),
        ];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
        setVacancies([]);
        setTotalPages(0);
        setCountries([]);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [i18n.language]);

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
                placeholder={t("vacancies.search.placeholder")}
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
                <option value="all">{t("vacancies.filters.all_countries")}</option>
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
                <img src={vacancy.img_api || vacancy.img} alt={vacancy.title} />
              </div>
              <div className="vacancy-card__content">
                <div className="vacancy-card__main">
                  <h3 className="vacancy-card__title">{vacancy.title}</h3>
                  <div className="vacancy-card__details">
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.country")}: </strong>
                      <span>{vacancy.country}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.program")}: </strong>
                      <span>{vacancy.program}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.specialization")}: </strong>
                      <span>{vacancy.specialization}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.salary")}: </strong>
                      <span>{vacancy.salary}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.age")}: </strong>
                      <span>{vacancy.age}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.place")}: </strong>
                      <span>{vacancy.place}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.uploaded_at")}: </strong>
                      <span>{formatDate(vacancy.uploaded_at)}</span>
                    </div>
                  </div>
                </div>
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

      {isLoading && <p>{t("vacancies.loading")}</p>}
      {error && <p>{t("vacancies.error")}</p>}
      {!isLoading && !error && vacancies.length === 0 && (
        <p>{t("vacancies.no_results")}</p>
      )}
    </div>
  );
};

export default VacanciesPage;
