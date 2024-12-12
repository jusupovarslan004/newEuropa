import React from "react";
import { useTranslation } from "react-i18next";
import "./AboutComponent.scss";

const About = () => {
  const { t } = useTranslation();

  const aboutItems = [
    {
      title: t("about.items.1.title"),
      description: t("about.items.1.description"),
    },
    {
      title: t("about.items.2.title"),
      description: t("about.items.2.description"),
    },
    {
      title: t("about.items.3.title"),
      description: t("about.items.3.description"),
    },
  ];

  return (
    <div className="about">
      <div className="container">
        <h2 className="about__title">{t("about.title")}</h2>
        <div className="about__grid">
          {aboutItems.map((item, index) => (
            <div key={`about-item-${index}`} className="about__item">
              <h3 className="about__item-title">{item.title}</h3>
              <p className="about__description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
