import { useTranslation } from "react-i18next";
import "./HowWeWork.scss";
import one from '../../../assets/icons/one.svg'
import two from '../../../assets/icons/two.svg'
import three from '../../../assets/icons/Invitation.svg'
import visa from '../../../assets/icons/visa.svg'


const HowWeWork = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: one,
      titleKey: "1",
    },
    {
      icon: two,
      titleKey: "2",
    },
    {
      icon: three,
      titleKey: "3",
    },
    {
      icon: visa,
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
