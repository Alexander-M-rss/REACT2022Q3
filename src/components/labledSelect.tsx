import React from 'react';
import './labledSelect.css';

interface ISelectProps {
  text: string;
  name: string;
  options: string[];
  errMsg: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLSelectElement>;
}

class LabledSelect extends React.Component<ISelectProps, unknown> {
  constructor(props: ISelectProps) {
    super(props);
  }

  render() {
    const { text, name, options, errMsg, onChangeHandler } = this.props;

    return (
      <label className="labled-select__label" htmlFor={name}>
        {text} :
        <div>
          <select
            name={name}
            id={name}
            className="labled-select__select"
            onChange={onChangeHandler}
          >
            <option value="">{text}</option>
            {options.map((option, i) => {
              return <option key={option + +i}>{option}</option>;
            })}
          </select>
          <span className="labled-input__error">{errMsg}</span>
        </div>
      </label>
    );
  }
}

export default LabledSelect;
