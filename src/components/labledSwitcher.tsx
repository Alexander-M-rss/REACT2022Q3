import React from 'react';
import './labledSwitcher.css';

interface ISwitcherProps {
  text: string;
  name: string;
  options: string[];
  errMsg: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
}

class LabledSwitcher extends React.Component<ISwitcherProps, unknown> {
  constructor(props: ISwitcherProps) {
    super(props);
  }

  render() {
    const { text, name, options, errMsg, onChangeHandler } = this.props;

    return (
      <label className="labled-switcher__label" htmlFor={name}>
        {text} :
        <div>
          {options.map((option, i) => {
            return (
              <label key={option + +i} className="labled-switcher__option">
                <input
                  type="radio"
                  name={name}
                  value={option}
                  className="labled-switcher__input"
                  onChange={onChangeHandler}
                />
                {option}
              </label>
            );
          })}
          <span className="labled-input__error">{errMsg}</span>
        </div>
      </label>
    );
  }
}

export default LabledSwitcher;
