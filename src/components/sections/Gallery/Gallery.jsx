import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Gallery.scss";

const Gallery = () => {
  const { t } = useTranslation();
  const [gallery, setGallery] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const [error, setError] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const minSwipeDistance = 50;

  useEffect(() => {
    fetch("/api/v2/info/gallery")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const duplicatedData = [...data, ...data, ...data];
        setGallery(duplicatedData);
      })
      .catch((error) => {
        console.error("Error fetching gallery:", error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1300) {
        setSlidesPerView(3);
      } else if (width > 992) {
        setSlidesPerView(2);
      } else if (width > 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((current) => {
      const next = current + 1;
      return next >= gallery.length ? 0 : next;
    });
    setActiveDot((current) => (current + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => {
      if (current === 0) {
        return gallery.length - 1;
      }
      return current - 1;
    });
    setActiveDot((current) => (current === 0 ? 2 : current - 1));
  };

  const goToSlide = (index) => {
    const slidesPerGroup = Math.ceil(gallery.length / 3);
    setCurrentSlide(index * slidesPerGroup);
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

  const renderSlides = () => {
    if (gallery.length === 0) return null;

    if (gallery.length <= 3) {
      return gallery.map((item, index) => (
        <div key={`gallery-${index}`} className="gallery__slide">
          <img
            className="gallery__image"
            src={item.photo_api.replace(/[<>]/g, "")}
            alt={`Gallery ${index + 1}`}
            onError={(e) => {
              console.error("Error loading image:", e);
              e.target.src = "placeholder.jpg";
            }}
          />
        </div>
      ));
    }

    const visibleSlides = Math.min(gallery.length, slidesPerView);
    const startIndex = currentSlide;

    return Array.from({ length: visibleSlides }).map((_, index) => {
      const slideIndex = (startIndex + index) % gallery.length;
      return (
        <div key={`gallery-${slideIndex}`} className="gallery__slide">
          <img
            className="gallery__image"
            src={gallery[slideIndex].photo_api.replace(/[<>]/g, "")}
            alt={`Gallery ${slideIndex + 1}`}
            onError={(e) => {
              console.error("Error loading image:", e);
              e.target.src = "placeholder.jpg";
            }}
          />
        </div>
      );
    });
  };

  if (error || gallery.length === 0) {
    return (
      <section className="gallery">
        <div className="gallery__container">
          <h2 className="gallery__title">{t("gallery.title")}</h2>
          <div className="gallery__placeholder">
            <div className="gallery__placeholder-icon">📸</div>
            <h3 className="gallery__placeholder-title">
              {t("gallery.noImages")}
            </h3>
            <p className="gallery__placeholder-text">
              {t("gallery.comingSoon")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery">
      <div className="gallery__container">
        <h2 className="gallery__title">{t("gallery.title")}</h2>
        <div
          className={`gallery__slider ${
            gallery.length <= 3 ? 'gallery__slider--few-items' : ''
          }`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {renderSlides()}

          {gallery.length > 3 && (
            <>
              <button
                className="gallery__nav-button gallery__nav-button--prev"
                onClick={prevSlide}
                aria-label={t("gallery.previousSlide")}
              >
                <span>←</span>
              </button>
              <button
                className="gallery__nav-button gallery__nav-button--next"
                onClick={nextSlide}
                aria-label={t("gallery.nextSlide")}
              >
                <span>→</span>
              </button>
            </>
          )}
        </div>

        {gallery.length > 3 && (
          <div className="gallery__dots">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`gallery__dot ${
                  activeDot === index ? "gallery__dot--active" : ""
                }`}
                onClick={() => goToSlide(index)}
                role="button"
                aria-label={t("gallery.goToSlide", { number: index + 1 })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
