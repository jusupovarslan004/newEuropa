import { useTranslation } from "react-i18next";
import "./HowWeWork.scss";
import documentIcon from "../../../assets/icons/document.svg";

const HowWeWork = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: documentIcon,
      titleKey: "1",
    },
    {
      icon: documentIcon,
      titleKey: "2",
    },
    {
      icon: documentIcon,
      titleKey: "3",
    },
    {
      icon: documentIcon,
      titleKey: "4",
    },
  ];

  return (
    <section className="how-we-work">
      <div className="container">
        <h2 className="how-we-work__title">{t("howWeWork.title")}</h2>
        <div className="how-we-work__grid">
          {steps.map((step, index) => (
            <div key={index} className="how-we-work__item">
              <div className="how-we-work__icon">
                <img
                  src={step.icon}
                  alt={t(`howWeWork.steps.${step.titleKey}.title`)}
                />
              </div>
              <h3 className="how-we-work__item-title">
                {t(`howWeWork.steps.${step.titleKey}.title`)}
              </h3>
              <p className="how-we-work__description">
                {t(`howWeWork.steps.${step.titleKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
