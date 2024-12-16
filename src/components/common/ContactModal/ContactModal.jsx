import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import SuccessModal from "../SuccessModal/SuccessModal";
import "./ContactModal.scss";

const ContactModal = ({ isOpen, onClose, country, vacancyName, vacancyId }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullname: '',
    tell: '',
    city: '',
    country: country || '',
  });
  
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://api.togetherrecruitment.kg/api/v2/info/contacts/');
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const data = await response.json();
        setContactInfo(data[0]);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    if (isOpen) {
      fetchContactInfo();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(
        "https://api.togetherrecruitment.kg/api/v2/info/appform_add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            vacancy: vacancyId ? parseInt(vacancyId) : null,
          }),
        }
      );

      if (response.ok) {
        onClose();
        setIsSuccessModalOpen(true);
        setFormData({
          fullname: '',
          tell: '',
          city: '',
          country: '',
        });
        
        // Автоматически закрываем SuccessModal через 3 секунды
        // setTimeout(() => {
        //   setIsSuccessModalOpen(false);
        // }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="contact-modal">
          <button className="modal__close" onClick={onClose}>×</button>
          
          <div className="contact-info">
            <h3>{t("contact.title")}</h3>
            {contactInfo && (
              <>
                <div className="contact-item">
                  <img src="/email-icon.svg" alt="Email" />
                  <a href={`mailto:${contactInfo.mail}`}>{contactInfo.mail}</a>
                </div>
                {contactInfo.Контакты?.map((contact) => (
                  <div key={contact.id} className="contact-item">
                    <img src={contact.img_svg_api} alt="Phone" />
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="form-section">
            <h3>{t("forms.contact.title")}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t("forms.contact.fullName")}</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder={t("forms.contact.countryPlaceholder")}
                  disabled={!!country}
                  className={country ? "disabled-input" : ""}
                />
              </div>

              <div className="form-group">
                <label>{t("forms.contact.city")}</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder={t("forms.contact.cityPlaceholder")}
                />
              </div>

              {vacancyName && (
                <div className="form-group">
                  <label>{t("forms.contact.vacancy")}</label>
                  <input
                    type="text"
                    value={vacancyName}
                    disabled
                    className="disabled-input"
                  />
                </div>
              )}

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
      </Modal>

      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};

export default ContactModal;