import "./Modal.scss";

const Modal = ({ isOpen, onClose, children, isSuccess }) => {
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
