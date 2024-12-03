import { useState } from "react";
import "./Licenses.scss";
import license1 from "../../../assets/images/licenses/license1.jpg";
import license2 from "../../../assets/images/licenses/license2.jpg";
import license3 from "../../../assets/images/licenses/license3.jpg";
import license4 from "../../../assets/images/licenses/license4.jpg";

const Licenses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const licenses = [
    license1,
    license2,
    license3,
    license4,
    license1,
    license2,
    license3,
    license4, // дублируем для демонстрации
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === licenses.length - 4 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? licenses.length - 4 : prev - 1));
  };

  const getVisibleLicenses = () => {
    return licenses.slice(currentIndex, currentIndex + 4);
  };

  return (
    <section className="licenses">
      <div className="container">
        <h2 className="licenses__title">Лицензии</h2>
        <div className="licenses__wrapper">
          <button
            className="licenses__arrow licenses__arrow--prev"
            onClick={prevSlide}
          >
            <span>❮</span>
          </button>

          <div className="licenses__slider">
            <div
              className="licenses__track"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`,
              }}
            >
              {licenses.map((license, index) => (
                <div key={index} className="licenses__slide">
                  <img src={license} alt={`License ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <button
            className="licenses__arrow licenses__arrow--next"
            onClick={nextSlide}
          >
            <span>❯</span>
          </button>
        </div>

        <div className="licenses__dots">
          {[...Array(licenses.length - 3)].map((_, index) => (
            <button
              key={index}
              className={`licenses__dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Licenses;
