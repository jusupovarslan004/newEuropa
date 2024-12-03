import React, { useState } from "react";
import "./Partners.scss";
import { useTranslation } from "react-i18next";
import SuccessModal from "../../components/common/SuccessModal/SuccessModal";

const Partners = () => {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
      <div className="partners-page">
        <div className="container">
          <h2>Заполните эти данные для сотрудничества с нами!</h2>

          <form className="partners-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Ваше полное имя</label>
                <input type="text" placeholder="Введите ваше имя" required />
              </div>
              <div className="form-group">
                <label>Ваш номер телефона</label>
                <input type="tel" placeholder="Введите ваш номер" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Название вашей компании</label>
                <input
                  type="text"
                  placeholder="Введите название вашей компании"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ваша позиция</label>
                <input
                  type="text"
                  placeholder="Введите вашу позицию в компании"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ваш адрес</label>
                <input
                  type="text"
                  placeholder="Введите адрес вашей компании"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ваш email</label>
                <input
                  type="email"
                  placeholder="Введите вашу электронную почту"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Ваше сообщение</label>
              <textarea
                placeholder="Введите ваше сообщение для нас"
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default Partners;
