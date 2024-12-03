import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../../../assets/images/logo.svg";
import emailIcon from "../../../assets/icons/email.svg";
import phoneIcon from "../../../assets/icons/phone.svg";
import locationIcon from "../../../assets/icons/location.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            <img src={logo} alt="Together recruitment" />
          </div>

          <div className="footer__nav">
            <Link to="/about">О нас</Link>
            <Link to="/vacancies">Вакансии</Link>
            <Link to="/partners">Для партнеров</Link>
          </div>

          <div className="footer__contacts">
            <div className="footer__contact-item">
              <div className="footer__contact-icon">
                <img src={emailIcon} alt="Email" />
              </div>
              <a href="mailto:europework@gmail.com">europework@gmail.com</a>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon">
                <img src={phoneIcon} alt="Phone" />
              </div>
              <div className="footer__phone-numbers">
                <a href="tel:+996705254855">+996 705 254 855</a>
                <a href="tel:+996705959855">+996 705 959 855</a>
              </div>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon">
                <img src={locationIcon} alt="Location" />
              </div>
              <span>Кулатова 139/6</span>
            </div>
          </div>

          <div className="footer__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.4861585532584!2d74.56474597677608!3d42.87508397124424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9b7f76b9e99%3A0x8d5833814471b208!2z0YPQuy4g0JrRg9C70LDRgtC-0LLQsCAxMzksINCR0LjRiNC60LXQug!5e0!3m2!1sru!2skg!4v1709729844949!5m2!1sru!2skg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
