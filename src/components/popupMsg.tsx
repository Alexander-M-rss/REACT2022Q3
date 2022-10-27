import React, { useEffect } from 'react';
import './popupMsg.css';

export interface IPopupMsgProps {
  text: string;
  timeout: number;
  closeHandler: () => void;
}

function PopupMsg({ text, timeout, closeHandler }: IPopupMsgProps) {
  useEffect(() => {
    setTimeout(() => closeHandler(), timeout);
  }, [closeHandler, timeout]);

  return (
    <div className="popup">
      <div className="text">{text}</div>
      <button className="popup-close" type="button" onClick={closeHandler}></button>
    </div>
  );
}

export default PopupMsg;
