import "./ContactInfo.scss";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <div className="contact-info__item">
        <i className="icon-email"></i>
        <a href="mailto:europework@gmail.com">europework@gmail.com</a>
      </div>
      <div className="contact-info__item">
        <i className="icon-phone"></i>
        <div className="contact-info__phones">
          <a href="tel:+996705254855">+996 705 254 855</a>
          <a href="tel:+996705959855">+996 705 959 855</a>
        </div>
      </div>
      <div className="contact-info__item">
        <i className="icon-location"></i>
        <span>Кулатова 139/6</span>
      </div>
    </div>
  );
};

export default ContactInfo;
