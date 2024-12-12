import React, { useState } from "react";
import "./Partners.scss";
import { useTranslation } from "react-i18next";
import SuccessModal from "../../components/common/SuccessModal/SuccessModal";
import { validateInternationalPhone } from "../../utils/validation";

const Partners = () => {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    tell: "",
    company: "",
    position: "",
    address: "",
    mail: "",
    message: "",
  });

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

  const validateForm = () => {
    if (!formData.tell.match(/^\+?[\d]{10,}$/)) {
      setError("Пожалуйста, введите корректный номер телефона");
      return false;
    }

    if (!formData.mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Пожалуйста, введите корректный email");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const phoneValidation = validateInternationalPhone(formData.tell);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.message);
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        fullName: formData.fullName.trim(),
        tell: formData.tell.startsWith("+")
          ? formData.tell.trim()
          : `+${formData.tell.trim()}`,
        company: formData.company.trim(),
        position: formData.position.trim(),
        address: formData.address.trim(),
        mail: formData.mail.trim(),
        message: formData.message.trim(),
      };

      console.log("Отправляемые данные:", requestData);

      const response = await fetch(
        "https://api.togetherrecruitment.kg/api/v2/info/partnerform_add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      console.log("Ответ сервера:", data);

      if (!response.ok) {
        if (data.message) {
          throw new Error(data.message);
        } else if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          throw new Error(errorMessages[0] || "Ошибка валидации данных");
        } else {
          throw new Error("Не удалось отправить заявку");
        }
      }

      setShowSuccess(true);
      setFormData({
        fullName: "",
        tell: "",
        company: "",
        position: "",
        address: "",
        mail: "",
        message: "",
      });
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="partners-page">
        <div className="container">
          <h2>{t("forms.partners.title")}</h2>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <p className="error-details">{t("forms.partners.errorCheck")}</p>
            </div>
          )}

          <form className="partners-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>{t("forms.partners.fullName")}</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t("forms.partners.fullNamePlaceholder")}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t("forms.partners.phone")}</label>
                <input
                  type="tel"
                  name="tell"
                  value={formData.tell}
                  onChange={handlePhoneChange}
                  placeholder={t("forms.partners.phonePlaceholder")}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t("forms.partners.company")}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t("forms.partners.companyPlaceholder")}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t("forms.partners.position")}</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder={t("forms.partners.positionPlaceholder")}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t("forms.partners.address")}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t("forms.partners.addressPlaceholder")}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t("forms.partners.email")}</label>
                <input
                  type="email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder={t("forms.partners.emailPlaceholder")}
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>{t("forms.partners.message")}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("forms.partners.messagePlaceholder")}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading
                  ? t("forms.partners.sending")
                  : t("forms.partners.submit")}
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
