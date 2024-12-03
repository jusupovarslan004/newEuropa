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
      <span className="language-selector__label">язык выбор:</span>
      <div className="language-selector__dropdown">
        {languages.map((lang) => (
          <button key={lang.code} className="language-selector__option">
            <img src={lang.flag} alt={lang.name} />
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
