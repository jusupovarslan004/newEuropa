import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./Licenses.scss";

const Licenses = () => {
  const { t } = useTranslation();

  const [licenses, setLicenses] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const [error, setError] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [slidesPerView, setSlidesPerView] = useState(4);

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50;

  useEffect(() => {
    fetch("/api/v2/info/license")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLicenses(data);
      })
      .catch((error) => {
        console.error("Error fetching licenses:", error);
        setError(error.message);
      });
  }, []);

  // Добавляем определение мобильного устройства
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1300) {
        setSlidesPerView(4); // Десктоп
      } else if (width > 992) {
        setSlidesPerView(3); // Большие планшеты
      } else if (width > 768) {
        setSlidesPerView(2); // Планшеты
      } else {
        setSlidesPerView(1); // Мобильные
      }
    };

    handleResize(); // Вызываем сразу при монтировании
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((current) => {
      const next = current + 1;
      return next >= licenses.length ? 0 : next;
    });
    setActiveDot((current) => (current + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => {
      if (current === 0) {
        return licenses.length - 1;
      }
      return current - 1;
    });
    setActiveDot((current) => (current === 0 ? 2 : current - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setActiveDot(index);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Обновляем рендер слайдов
  const renderSlides = () => {
    return Array.from({ length: slidesPerView }).map((_, offset) => {
      const slideIndex = (currentSlide + offset) % licenses.length;
      return (
        <div key={`license-${slideIndex}`} className="licenses__slide">
          {licenses[slideIndex] && (
            <img
              className="licenses__image"
              src={licenses[slideIndex].license_api.replace(/[<>]/g, "")}
              alt={`License ${slideIndex + 1}`}
              onError={(e) => {
                console.error("Error loading image:", e);
                e.target.src = "placeholder.jpg";
              }}
            />
          )}
        </div>
      );
    });
  };

  if (error) {
    return (
      <div>
        {t("licenses.errorLoading")}: {error}
      </div>
    );
  }

  if (licenses.length === 0) {
    return <div>{t("licenses.loading")}</div>;
  }

  return (
    <section className="licenses">
      <div className="licenses__container">
        <h2 className="licenses__title">{t("licenses.title")}</h2>
        <div
          className="licenses__slider"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {renderSlides()}

          {slidesPerView > 1 && licenses.length > slidesPerView && (
            <>
              <button
                className="licenses__nav-button licenses__nav-button--prev"
                onClick={prevSlide}
                aria-label={t("licenses.previousSlide")}
              >
                ←
              </button>
              <button
                className="licenses__nav-button licenses__nav-button--next"
                onClick={nextSlide}
                aria-label={t("licenses.nextSlide")}
              >
                →
              </button>
            </>
          )}
        </div>

        <div className="licenses__dots">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`licenses__dot ${
                activeDot === index ? "licenses__dot--active" : ""
              }`}
              onClick={() => goToSlide(index)}
              role="button"
              aria-label={t("licenses.goToSlide", { number: index + 1 })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Licenses;
