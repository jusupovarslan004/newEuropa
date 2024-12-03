import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Partnership.scss";
import handshakeIcon from "../../../assets/icons/handshake-white.svg";

const Partnership = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="partnership">
      <div className="container">
        <h2 className="partnership__title">Хотите сотрудничать с нами?</h2>
        <div className="partnership__card">
          <p className="partnership__text">
            Заполните заявку для партнеров и мы с вами свяжемся в скором времени
          </p>
          <div className="partnership__icon">
            <img src={handshakeIcon} alt="handshake" />
          </div>
          <button
            className="partnership__button"
            onClick={() => navigate("/partners")}
          >
            Связаться с нами
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
