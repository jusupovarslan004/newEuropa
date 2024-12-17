import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./VacancyDetails.scss";
import ContactModal from "../../components/common/ContactModal/ContactModal";
import SuccessModal from "../../components/common/SuccessModal/SuccessModal";

const VacancyDetails = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [similarVacancies, setSimilarVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const findSimilarVacancies = (currentVacancy, allVacancies) => {
    return allVacancies
      .filter(vacancy => {
        // Исключаем текущую вакансию
        if (vacancy.id === parseInt(id)) return false;

        let similarityScore = 0;

        // Проверяем совпадение по специализации (наиболее важный параметр)
        if (vacancy.specialization?.toLowerCase() === currentVacancy.specialization?.toLowerCase()) {
          similarityScore += 3;
        }

        // Проверяем совпадение по стране
        if (vacancy.country?.toLowerCase() === currentVacancy.country?.toLowerCase()) {
          similarityScore += 2;
        }

        // Проверяем совпадение по программе
        if (vacancy.program?.toLowerCase() === currentVacancy.program?.toLowerCase()) {
          similarityScore += 2;
        }

        // Проверяем схожесть зарплаты (если указана)
        if (vacancy.salary && currentVacancy.salary) {
          const currentSalary = parseInt(currentVacancy.salary.replace(/\D/g, ''));
          const vacancySalary = parseInt(vacancy.salary.replace(/\D/g, ''));
          if (!isNaN(currentSalary) && !isNaN(vacancySalary)) {
            // Если разница в зарплате менее 20%
            if (Math.abs(currentSalary - vacancySalary) / currentSalary < 0.2) {
              similarityScore += 1;
            }
          }
        }

        // Возвращаем true если набрано минимум 3 балла схожести
        return similarityScore >= 3;
      })
      .sort((a, b) => {
        // Сортируем по дате публикации (более новые первыми)
        return new Date(b.uploaded_at) - new Date(a.uploaded_at);
      })
      .slice(0, 3); // Берем только первые 3 вакансии
  };

  useEffect(() => {
    const currentLang = i18n.language === "kg" ? "ky" : i18n.language;

    const fetchVacancyDetails = async () => {
      try {
        const response = await fetch(
          `https://api.togetherrecruitment.kg/api/v2/info/vacancies/${id}/?lang=${currentLang}`
        );
        if (!response.ok) {
          throw new Error(t("vacancy.error.loading"));
        }
        const data = await response.json();
        setVacancy(data);

        // Получаем все вакансии
        const allVacanciesResponse = await fetch(
          `https://api.togetherrecruitment.kg/api/v2/info/vacancies/?page_size=all&lang=${currentLang}`
        );
        
        if (allVacanciesResponse.ok) {
          const allVacancies = await allVacanciesResponse.json();
          const similarVacs = findSimilarVacancies(data, allVacancies);
          setSimilarVacancies(similarVacs);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancyDetails();
  }, [id, i18n.language, t]);

  const formatDate = (dateString) => {
    if (!dateString) return t("vacancy.date.not_specified");

    try {
      const [datePart] = dateString.split(" ");
      if (!datePart) throw new Error("Invalid date string format");
      return datePart;
    } catch (error) {
      console.error("Date formatting error:", error.message);
      return t("vacancy.date.invalid_format");
    }
  };

  const handleApplyClick = () => {
    setIsContactModalOpen(true);
  };

  const handleModalClose = () => {
    setIsContactModalOpen(false);
  };

  const handleApplicationSuccess = () => {
    setIsContactModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  if (loading) return (
    <div className="vacancies-loader">
      <div className="loader-container">
        <div className="loader-card">
          <div className="loader-image" />
          <div className="loader-content">
            <div className="loader-title" />
            <div className="loader-text" />
            <div className="loader-text" />
            <div className="loader-text" />
            <div className="loader-text" />
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return <div>{t("vacancy.error.general", { error })}</div>;

  return (
    <div className="vacancy-details">
      <div className="back-button" onClick={() => navigate('/vacancies')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span>{t("vacancy.buttons.back")}</span>
      </div>
      <div className="vacancy-details__main">
        <div className="vacancy-details__left-column">
          <div className="vacancy-details__image">
            {vacancy?.img_api ? (
              <img src={vacancy.img_api} alt={vacancy.title} />
            ) : (
              <div className="vacancy-details__placeholder">
                {t("vacancy.image.no_image")}
              </div>
            )}
          </div>
          <button 
            className="button button--primary vacancy-details__apply-button vacancy-details__apply-button--desktop"
            onClick={handleApplyClick}
          >
            {t("vacancy.buttons.apply")}
          </button>
        </div>
        <div className="vacancy-details__info">
          <p className="vacancy-details__date">
            {vacancy?.uploaded_at
              ? formatDate(vacancy.uploaded_at)
              : t("vacancy.date.not_specified")}
          </p>
          <h1 className="vacancy-details__title">{vacancy.title}</h1>
          <div className="vacancy-details__description">
            <p>{vacancy.text}</p>
          </div>
          <h2 className="vacancy-details__subtitle">{t("vacancy.details")}:</h2>
          <p>
            <strong>{t("vacancy.labels.country")}:</strong> {vacancy.country || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.program")}:</strong> {vacancy.program || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.specialization")}:</strong> {vacancy.specialization || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.age")}:</strong> {vacancy.age || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.experience")}:</strong> {vacancy.experience || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.family_status")}:</strong>{" "}
            {vacancy.familyStatus || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.salary")}:</strong> {vacancy.salary || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.schedule")}:</strong> {vacancy.schedule || t("vacancy.not_specified")}
          </p>
          <p>
            <strong>{t("vacancy.labels.available_positions")}:</strong> {vacancy.place || t("vacancy.not_specified")}
          </p>
          <button 
            className="button button--primary vacancy-details__apply-button vacancy-details__apply-button--mobile"
            onClick={handleApplyClick}
          >
            {t("vacancy.buttons.apply")}
          </button>
        </div>
      </div>

      {similarVacancies.length > 0 && (
        <div className="similar-vacancies">
          <h2 className="similar-vacancies__title">{t("vacancy.similar.title")}</h2>
          <div className="similar-vacancies__grid">
            {similarVacancies.map((similarVacancy) => (
              <Link 
                to={`/vacancies/${similarVacancy.id}`} 
                key={similarVacancy.id}
                className="similar-vacancy-card"
              >
                <div className="similar-vacancy-card__image">
                  {similarVacancy.img_api ? (
                    <img src={similarVacancy.img_api} alt={similarVacancy.title} />
                  ) : (
                    <div className="similar-vacancy-card__placeholder">
                      {t("vacancy.image.no_image")}
                    </div>
                  )}
                </div>
                <div className="similar-vacancy-card__content">
                  <h3 className="similar-vacancy-card__title">{similarVacancy.title}</h3>
                  <p className="similar-vacancy-card__country">{similarVacancy.country}</p>
                  <p className="similar-vacancy-card__salary">{similarVacancy.salary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={handleModalClose}
        onSuccess={handleApplicationSuccess}
        country={vacancy?.country}
        vacancyName={vacancy?.title}
        vacancyId={id}
      />
      
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default VacancyDetails;