import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Hero.scss";
import heroBg1 from "../../../assets/images/heroBg1.jpg";
import heroBg2 from "../../../assets/images/heroBg2.jpg";
import heroBg3 from "../../../assets/images/heroBg3.jpg";
import ContactModal from "../../common/ContactModal/ContactModal";

const Hero = () => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [heroBg1, heroBg2, heroBg3];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {images.map((img, index) => (
        <div
          key={index}
          className={`hero__background ${
            currentImage === index ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero__overlay" />
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">{t("hero.title")}</h1>
          <p className="hero__description">{t("hero.description")}</p>
          <button className="hero__button" onClick={() => setIsModalOpen(true)}>
            {t("common.leaveRequest")}
          </button>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
