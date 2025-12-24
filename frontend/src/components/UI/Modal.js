import React from 'react';
import './Modal.css';

const Modal = ({ open, onClose, children, className = '' }) => {
  if (!open) return null;
  return (
    <div className="ds-modal-overlay" onClick={onClose}>
      <div className={`ds-modal${className ? ' ' + className : ''}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

