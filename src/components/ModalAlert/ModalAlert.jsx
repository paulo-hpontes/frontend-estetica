/* eslint-disable react/prop-types */
import "./ModalAlert.css";
import PropTypes from "prop-types";

const ModalAlert = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div id="alert" className="modal-overlay">
      <div className="modal-alert">
        <div className="alert-content">{children}</div>
        <button className="btn close-menu" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

ModalAlert.propType = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  children: PropTypes.element,
};

export default ModalAlert;
