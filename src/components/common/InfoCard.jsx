import "./InfoCard.scss";

const InfoCard = ({ icon, title, description, count }) => {
  return (
    <div className="info-card">
      {icon && <div className="info-card__icon">{icon}</div>}
      {count && <div className="info-card__count">{count}</div>}
      <h3 className="info-card__title">{title}</h3>
      {description && <p className="info-card__description">{description}</p>}
    </div>
  );
};

export default InfoCard;
