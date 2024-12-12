import React, { useState, useEffect } from "react";
import "./ContactModal.scss";
import SuccessModal from "../SuccessModal/SuccessModal";
import { validateInternationalPhone } from "../../../utils/validation";
import { useTranslation } from "react-i18next";

const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    tell: "",
    country: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+\s-]/g, "");
    setFormData((prev) => ({
      ...prev,
      tell: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Валидация телефона
    const phoneValidation = validateInternationalPhone(formData.tell);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.message);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.togetherrecruitment.kg/api/v2/info/appform_add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            fullname: formData.fullName,
            tell: phoneValidation.formattedPhone,
            country: formData.country,
            city: formData.city,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных");
      }

      setShowSuccess(true);
      setFormData({
        fullName: "",
        tell: "",
        country: "",
        city: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <div className="contact-info">
            <h3>Наши контакты</h3>
            <div className="contact-item">
              <img src="/email-icon.svg" alt="email" />
              <a href="mailto:europework@gmail.com">europework@gmail.com</a>
            </div>
            <div className="contact-item">
              <img src="/phone-icon.svg" alt="phone" />
              <div>
                <a href="tel:+996705254855">+996 705 254 855</a>
                <br />
                <a href="tel:+996705959855">+996 705 959 855</a>
              </div>
            </div>
            <div className="contact-item">
              <img src="/location-icon.svg" alt="location" />
              <span>Кулатова 139/6</span>
            </div>
          </div>

          <div className="form-section">
            <h3>{t("forms.contact.title")}</h3>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t("forms.contact.fullName")}</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t("forms.contact.fullNamePlaceholder")}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t("forms.contact.phone")}</label>
                <input
                  type="tel"
                  name="tell"
                  value={formData.tell}
                  onChange={handlePhoneChange}
                  placeholder={t("forms.contact.phonePlaceholder")}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t("forms.contact.country")}</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder={t("forms.contact.countryPlaceholder")}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t("forms.contact.city")}</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={t("forms.contact.cityPlaceholder")}
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-button ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "" : t("forms.contact.submit")}
              </button>
            </form>
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
