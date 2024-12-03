import { useTranslation } from "react-i18next";
import "./HowWeWork.scss";
import documentIcon from "../../../assets/icons/document.svg"; // Добавьте иконку

const HowWeWork = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: documentIcon,
      title: "Оформление документов",
      description:
        "Мы используем передовые технологии, обеспечивая быстрый и безопасный результат.",
    },
    {
      icon: documentIcon,
      title: "Оформление документов",
      description:
        "Мы используем передовые технологии, обеспечивая быстрый и безопасный результат.",
    },
    {
      icon: documentIcon,
      title: "Оформление документов",
      description:
        "Мы используем передовые технологии, обеспечивая быстрый и безопасный результат.",
    },
    {
      icon: documentIcon,
      title: "Оформление документов",
      description:
        "Мы используем передовые технологии, обеспечивая быстрый и безопасный результат.",
    },
  ];

  return (
    <section className="how-we-work">
      <div className="container">
        <h2 className="how-we-work__title">Как мы работаем?</h2>
        <div className="how-we-work__grid">
          {steps.map((step, index) => (
            <div key={index} className="how-we-work__item">
              <div className="how-we-work__icon">
                <img src={step.icon} alt={step.title} />
              </div>
              <h3 className="how-we-work__item-title">{step.title}</h3>
              <p className="how-we-work__description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
