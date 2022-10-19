import React from 'react';
import './modal.css';

export const OVERLAY_ID = 'modal-overlay';
export const CLOSE_ID = 'modal-close';

interface IModalProps {
  children: React.ReactNode;
  closeHandler: (e: React.MouseEvent) => void;
}

function Modal({ children, closeHandler }: IModalProps) {
  return (
    <div className="modal-overlay" onClick={closeHandler} id={OVERLAY_ID}>
      <div className="modal-content">
        {children}
        <button className="modal-close" type="button" id={CLOSE_ID}></button>
      </div>
    </div>
  );
}

export default Modal;
