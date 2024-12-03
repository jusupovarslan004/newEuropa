import "./Statistics.scss";
import { useTranslation } from "react-i18next";

const Statistics = () => {
  const { t } = useTranslation();

  const stats = [
    {
      number: "5980",
      label: t("stats.workers"),
      description: t("stats.workersDesc"),
    },
    {
      number: "5980",
      label: t("stats.workers"),
      description: t("stats.workersDesc"),
    },
    {
      number: "5980",
      label: t("stats.workers"),
      description: t("stats.workersDesc"),
    },
    {
      number: "5980",
      label: t("stats.workers"),
      description: t("stats.workersDesc"),
    },
    {
      number: "5980",
      label: t("stats.workers"),
      description: t("stats.workersDesc"),
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
