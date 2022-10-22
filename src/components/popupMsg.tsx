import React from 'react';
import './popupMsg.css';

export interface IPopupMsgProps {
  text: string;
  timeout: number;
  closeHandler: () => void;
}

class PopupMsg extends React.Component<IPopupMsgProps, unknown> {
  constructor(props: IPopupMsgProps) {
    super(props);
  }

  componentDidMount(): void {
    setTimeout(() => this.props.closeHandler(), this.props.timeout);
  }

  render() {
    const { text, closeHandler } = this.props;

    return (
      <div className="popup">
        <div className="text">{text}</div>
        <button className="popup-close" type="button" onClick={closeHandler}></button>
      </div>
    );
  }
}

export default PopupMsg;
