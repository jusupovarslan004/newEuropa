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
        <h2 className="partnership__title">{t("partnership.title")}</h2>
        <div className="partnership__card">
          <p className="partnership__text">{t("partnership.description")}</p>
          <div className="partnership__icon">
            <img src={handshakeIcon} alt={t("partnership.iconAlt")} />
          </div>
          <button
            className="partnership__button"
            onClick={() => navigate("/partners")}
          >
            {t("partnership.button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
