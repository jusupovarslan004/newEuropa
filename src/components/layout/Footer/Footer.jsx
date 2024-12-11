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
              src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A42.8807128066996%2C%22lon%22%3A74.59485054016115%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22bishkek%22%7D%2C%22org%22%3A%2270000001095143728%22%7D"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
