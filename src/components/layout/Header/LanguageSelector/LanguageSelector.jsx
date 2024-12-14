import { useState } from "react";
import "./LanguageSelector.scss";

const languages = [
  { code: "kg", name: "Кыргызча", flag: "/images/flags/kg.svg" },
  { code: "en", name: "English", flag: "/images/flags/en.svg" },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="language-selector">
      <button
        className={`language-selector__current ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={languages[0].flag}
          alt={languages[0].code}
          className="language-selector__flag"
        />
        <span>{languages[0].name}</span>
        <svg
          className={`language-selector__arrow ${isOpen ? "open" : ""}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div className={`language-selector__dropdown ${isOpen ? "show" : ""}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className="language-selector__option"
            onClick={() => {
              // Обработка смены языка
              console.log(`Language changed to: ${lang.name}`);
              setIsOpen(false);
            }}
          >
            <img
              src={lang.flag}
              alt={lang.name}
              className="language-selector__flag"
            />
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
