import React from 'react';
import './labledInput.css';

interface IInputProps {
  type: string;
  text: string;
  name: string;
  errMsg: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  accept?: string;
}

class LabledInput extends React.Component<IInputProps, unknown> {
  constructor(props: IInputProps) {
    super(props);
  }

  render() {
    const { type, text, name, errMsg, onChangeHandler } = this.props;

    return (
      <label className="labled-input__label" htmlFor={name}>
        {text} :
        <div>
          <input
            type={type}
            name={name}
            id={name}
            autoComplete="off"
            placeholder={text}
            className="labled-input__input"
            defaultValue={type === 'checkbox' ? 'off' : ''}
            onChange={onChangeHandler}
            accept={this.props.accept}
          />
          <span className="labled-input__error">{errMsg}</span>
        </div>
      </label>
    );
  }
}

export default LabledInput;
