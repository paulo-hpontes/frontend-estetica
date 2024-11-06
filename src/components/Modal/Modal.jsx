/* eslint-disable react/prop-types */
import "./Modal.css";
import PropTypes from "prop-types";

import { FaWindowClose } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div id="modalForm" className="modal-overlay">
      <div className="modal-content">
        <div>
          <button className="btn close-menu" onClick={onClose}>
            <FaWindowClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propType = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  children: PropTypes.element,
};

export default Modal;
