import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./About.scss";

const About = () => {
  const { t, i18n } = useTranslation();
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/v2/info/about_us/?format=json");
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, [i18n.language]); // Перезапрашиваем при смене языка

  if (loading) {
    return <div>Loading...</div>; // Или ваш компонент загрузки
  }

  return (
    <section className="about">
      <div className="container">
        <h2 className="about__title">{t("about.title")}</h2>

        <div className="about__grid">
          {aboutData.map((section, index) => (
            <React.Fragment key={index}>
              <div className="about__text">
                <p>{section.text}</p>
              </div>
              <div className="about__image">
                <img
                  src={section.image}
                  alt={section.title || `About section ${index + 1}`}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
