import "./Statistics.scss";
import { useTranslation } from "react-i18next";

const Statistics = () => {
  const { t } = useTranslation();

  const stats = [
    {
      number: t("stats.items.1.number"),
      label: t("stats.items.1.label"),
      description: t("stats.items.1.description"),
    },
    {
      number: t("stats.items.2.number"),
      label: t("stats.items.2.label"),
      description: t("stats.items.2.description"),
    },
    {
      number: t("stats.items.3.number"),
      label: t("stats.items.3.label"),
      description: t("stats.items.3.description"),
    },
    {
      number: t("stats.items.4.number"),
      label: t("stats.items.4.label"),
      description: t("stats.items.4.description"),
    },
    {
      number: t("stats.items.5.number"),
      label: t("stats.items.5.label"),
      description: t("stats.items.5.description"),
    },
  ];

  return (
    <section className="statistics">
      <div className="container">
        <h2 className="statistics__title">{t("stats.title")}</h2>
        <div className="statistics__grid">
          {stats.map((stat, index) => (
            <div key={index} className="statistics__item">
              <div className="statistics__number">{stat.number}</div>
              <div className="statistics__label">{stat.label}</div>
              <div className="statistics__description">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
