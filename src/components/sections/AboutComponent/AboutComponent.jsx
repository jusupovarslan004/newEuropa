import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./AboutComponent.scss";

const About = () => {
  const { t, i18n } = useTranslation();
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const currentLang = i18n.language === "kg" ? "ky" : i18n.language;

    fetch(
      `https://api.togetherrecruitment.kg/api/v2/info/about_us/?lang=${currentLang}`
    )
      .then((response) => response.json())
      .then((data) => setAboutData(data))
      .catch((error) => console.error("Error fetching about data:", error));
  }, [i18n.language]);

  return (
    <div className="about">
      <div className="container">
        <h2 className="about__title">{t("about.title")}</h2>
        <div className="about__grid">
          {aboutData.map((item, index) => (
            <div
              key={`about-item-${index}`}
              className={`about__item ${
                index === 1 ? "text-first" : "image-first"
              }`}
            >
              {index === 1 ? (
                <>
                  <p className="about__description">{item.text}</p>
                  <img
                    src={item.photo_api}
                    alt={`About ${index + 1}`}
                    className="about__image"
                  />
                </>
              ) : (
                <>
                  <img
                    src={item.photo_api}
                    alt={`About ${index + 1}`}
                    className="about__image"
                  />
                  <p className="about__description">{item.text}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
