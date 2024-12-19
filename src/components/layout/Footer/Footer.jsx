import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../../../assets/images/logo.svg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import DG from "2gis-maps";


const Footer = () => {
  const [contactData, setContactData] = useState(null);
  const { t } = useTranslation();
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://api.togetherrecruitment.kg/api/v2/info/contacts/');
        setContactData(response.data[0]);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !window.DG) return;

    window.DG.then(() => {
      // Координаты для Абдумомунова 221
      const coordinates = [42.876829, 74.612374];
      
      const map = window.DG.map(mapRef.current, {
        center: coordinates,
        zoom: 17, // Увеличим зум для лучшей видимости здания
      });

      window.DG.marker(coordinates)
        .addTo(map)
        .bindPopup("Together recruitment<br>Абдумомунова, 221<br>301 кабинет, 3 этаж");

      return () => {
        map.remove();
      };
    });
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            <img src={logo} alt="Together recruitment" />
          </div>

          <div className="footer__nav">
            <h3>{t('footer.nav.about')}</h3>
            <Link to="/about">{t('footer.nav.about')}</Link>
            <Link to="/vacancies">{t('footer.nav.vacancies')}</Link>
            <Link to="/partners">{t('footer.nav.partners')}</Link>
          </div>

          <div className="footer__contacts">
            <h3>{t('footer.contacts')}</h3>
            {/* Email */}
            {contactData?.mail && (
              <div className="footer__contact-item">
                <div className="footer__contact-icon">
                  <img src={contactData.img_svg_api} alt="Email" />
                  {/* <img src={emailIcon} alt="Email" /> */}
                </div>
                <a href={`mailto:${contactData.mail}`}>{contactData.mail}</a>
              </div>
            )}

            {/* Контакты */}
            {contactData?.Контакты?.map((contact) => (
              <div key={contact.id} className="footer__contact-item">
                <div className="footer__contact-icon">
                  <img src={contact.img_svg_api} alt="Phone" />
                  {/* <img src={phoneIcon} alt="Phone" /> */}
                </div>
                <div className="footer__phone-numbers">
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
              </div>
            ))}

            {/* Офисы */}
            {contactData?.offices?.map((office) => (
              <div key={office.id} className="footer__contact-item">
                <div className="footer__contact-icon">
                  <img src={office.img_svg_api} alt="Location" />
                  {/* <img src={locationIcon} alt="Location" /> */}
                </div>
                <a 
                  href="https://go.2gis.com/er2bd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {office.address}
                </a>
              </div>
            ))}

            {/* Telegram */}
            {contactData?.telegram?.map((item) => (
              <div key={item.id} className="footer__contact-item">
                <div className="footer__contact-icon">
                  <img src={item.img_svg_api} alt="Telegram" />
                  {/* <img src={telegramIcon} alt="Telegram" /> */}
                </div>
                <a href={`https://t.me/${item.telegram.replace('@', '')}`}>
                  {item.telegram}
                </a>
              </div>
            ))}

            {/* WhatsApp */}
            {contactData?.whatsapp?.map((item) => (
              <div key={item.id} className="footer__contact-item">
                <div className="footer__contact-icon">
                  <img src={item.img_svg_api} alt="WhatsApp" />
                  {/* <img src={whatsappIcon} alt="WhatsApp" /> */}
                </div>
                <a href={`https://wa.me/${item.whatsapp}`}>
                  {item.whatsapp}
                </a>
              </div>
            ))}

            {/* Instagram */}
            {contactData?.instagram?.map((item) => (
              <div key={item.id} className="footer__contact-item">
                <div className="footer__contact-icon">
                  <img src={item.img_svg_api} alt="Instagram" />
                  {/* <img src={instagramIcon} alt="Instagram" /> */}
                </div>
                <a href={item.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            ))}
          </div>

          <div className="footer__map">
            <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;