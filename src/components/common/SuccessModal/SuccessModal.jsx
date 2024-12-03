import React from 'react';
import './SuccessModal.scss';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <button className="success-modal__close" onClick={onClose}>×</button>
        <div className="success-modal__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#4285F4"/>
          </svg>
        </div>
        <h3>Ваша заявка успешно отправлена!</h3>
        <p>В скором времени с вами свяжутся</p>
      </div>
    </div>
  );
};

export default SuccessModal;
