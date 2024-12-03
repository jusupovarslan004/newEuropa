import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.scss";
import Logo from "../../assets/images/logo.svg";
import ContactModal from "../common/Modal/ContactModal";

const languages = [
  { code: "ru", name: "Русский", flag: "/images/flags/ru.svg" },
  { code: "kg", name: "Кыргызча", flag: "/images/flags/kg.svg" },
  { code: "en", name: "English", flag: "/images/flags/us.svg" },
];

const Header = () => {
  const { i18n } = useTranslation();
  const languageSelectorRef = useRef(null);

  // Получаем сохраненный язык или используем русский по умолчанию
  const [currentLang, setCurrentLang] = useState(() => {
    const saved = localStorage.getItem("language");
    const initial = languages.find((lang) => lang.code === saved);
    return initial || languages[0];
  });

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
    localStorage.setItem("language", lang.code);
    i18n.changeLanguage(lang.code);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target)
      ) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img src={Logo} alt="Together recruitment" />
        </Link>

        <nav className="header__nav">
          <Link to="/about">О нас</Link>
          <Link to="/vacancies">Вакансии</Link>
          <Link to="/contacts">Наши контакты</Link>
          <Link to="/partners">Для партнеров</Link>
        </nav>

        <div className="header__actions">
          <div className="language-selector" ref={languageSelectorRef}>
            <button
              className="language-selector__current"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <img
                src={currentLang.flag}
                alt={currentLang.code}
                className="language-selector__flag"
              />
              <span>{currentLang.name}</span>
              <svg
                className={`language-selector__arrow ${
                  isLangOpen ? "open" : ""
                }`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <div
              className={`language-selector__dropdown ${
                isLangOpen ? "show" : ""
              }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="language-selector__option"
                  onClick={() => handleLanguageChange(lang)}
                >
                  <img
                    src={lang.flag}
                    alt={lang.code}
                    className="language-selector__flag"
                  />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            className="button button--primary"
            onClick={() => setIsModalOpen(true)}
          >
            Оставить заявку
          </button>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
};

export default Header;
