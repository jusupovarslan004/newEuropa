import { useTranslation } from "react-i18next";
import "./About.scss";
import alJazeeraImage from "../../../assets/images/about/al-jazeera.jpg";
import consultationImage from "../../../assets/images/about/consultation.jpg";
import officeImage from "../../../assets/images/about/office.jpg";

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about">
      <div className="container">
        <h2 className="about__title">О нас</h2>

        <div className="about__grid">
          {/* Первый блок */}
          <div className="about__text">
            <p>
              Lorem ipsum dolor sit amet consectetur. Urna gravida lectus diam
              etiam. Mi ultrices porttitor orci quam porta commodo. Tincidunt
              eget scelerisque aliquam elit mauris feugiat id.Lorem ipsum dolor
              sit amet consectetur. Urna gravida lectus diam etiam. Mi ultrices
              porttitor orci quam porta commodo. Tincidunt eget scelerisque
              aliquam elit mauris feugiat id.
            </p>
          </div>
          <div className="about__image">
            <img src={alJazeeraImage} alt="Al Jazeera office" />
          </div>

          {/* Второй блок */}
          <div className="about__image">
            <img src={consultationImage} alt="Consultation" />
          </div>
          <div className="about__text">
            <p>
              Lorem ipsum dolor sit amet consectetur. Urna gravida lectus diam
              etiam. Mi ultrices porttitor orci quam porta commodo. Tincidunt
              eget scelerisque aliquam elit mauris feugiat id.Lorem ipsum dolor
              sit amet consectetur. Urna gravida lectus diam etiam. Mi ultrices
              porttitor orci quam porta commodo. Tincidunt eget scelerisque
              aliquam elit mauris feugiat id.
            </p>
          </div>

          {/* Третий блок */}
          <div className="about__text">
            <p>
              Lorem ipsum dolor sit amet consectetur. Urna gravida lectus diam
              etiam. Mi ultrices porttitor orci quam porta commodo. Tincidunt
              eget scelerisque aliquam elit mauris feugiat id.Lorem ipsum dolor
              sit amet consectetur. Urna gravida lectus diam etiam. Mi ultrices
              porttitor orci quam porta commodo. Tincidunt eget scelerisque
              aliquam elit mauris feugiat id.
            </p>
          </div>
          <div className="about__image">
            <img src={officeImage} alt="Modern office" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
