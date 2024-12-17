import { useEffect } from "react";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, children, isSuccess }) => {
  useEffect(() => {
    const handleOverflow = () => {
      if (isOpen) {
        // Добавляем класс вместо прямого изменения стиля
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    };

    handleOverflow();

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div
        className={`modal__content ${
          isSuccess ? "modal__content--success" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
