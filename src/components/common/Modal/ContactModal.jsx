import React, { useState, useEffect } from "react";
import "./ContactModal.scss";
import emailIcon from "../../../assets/icons/email.svg";
import phoneIcon from "../../../assets/icons/phone.svg";
import locationIcon from "../../../assets/icons/location.svg";
import SuccessModal from "../SuccessModal/SuccessModal";

const ContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  const handleEmail = () => {
    window.location.href = "mailto:europework@gmail.com";
  };

  const handlePhone = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
  };

  const handleLocation = () => {
    // Координаты для Кулатова 139/6
    const address = "Кулатова 139/6, Бишкек";
    window.open(`https://maps.google.com?q=${encodeURIComponent(address)}`);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-overlay"
        style={{ display: isOpen && !showSuccess ? "flex" : "none" }}
      >
        <div className="modal-content">
          <div className="modal-grid">
            {/* Левая часть */}
            <div className="modal-contacts">
              <h3>Наши контакты</h3>
              <div className="contact-item" onClick={handleEmail}>
                <div className="icon-circle">
                  <img src={emailIcon} alt="email" />
                </div>
                <div className="contact-info">
                  <span className="contact-label">Наша почта</span>
                  <span className="contact-value">europework@gmail.com</span>
                </div>
              </div>
              <div className="contact-group">
                <div
                  className="contact-item"
                  onClick={() => handlePhone("+996 705 254 855")}
                >
                  <div className="icon-circle">
                    <img src={phoneIcon} alt="phone" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Наши телефоны</span>
                    <span className="contact-value">+996 705 254 855</span>
                    <span className="contact-value">+996 705 959 855</span>
                  </div>
                </div>
              </div>
              <div className="contact-item" onClick={handleLocation}>
                <div className="icon-circle">
                  <img src={locationIcon} alt="location" />
                </div>
                <div className="contact-info">
                  <span className="contact-label">Наш адрес</span>
                  <span className="contact-value">Кулатова 139/6</span>
                </div>
              </div>
            </div>

            {/* Правая часть */}
            <div className="modal-form">
              <button className="modal-close" onClick={onClose}>
                ×
              </button>
              <h3>Оставьте заявку и мы с вами свяжемся!</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Ваше ФИО</label>
                  <input type="text" placeholder="ФИО" required />
                </div>
                <div className="form-group">
                  <label>Ваш номер телефона</label>
                  <input type="tel" placeholder="0..." required />
                </div>
                <div className="form-group">
                  <label>Страна в которую хотите подать заявку</label>
                  <input type="text" placeholder="0..." required />
                </div>
                <div className="form-group">
                  <label>Ваш город</label>
                  <input type="text" placeholder="0..." required />
                </div>
                <button type="submit" className="submit-button">
                  Оставить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
    </>
  );
};

export default ContactModal;
