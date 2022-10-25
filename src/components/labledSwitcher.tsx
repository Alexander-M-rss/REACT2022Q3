import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IFormValues } from './formTypes';
import './labledSwitcher.css';

interface ISwitcherProps {
  text: string;
  name: string;
  options: string[];
  errMsg: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  register?: UseFormRegister<IFormValues>;
  regOptions?: RegisterOptions;
}

function LabledSwitcher({
  text,
  name,
  options,
  errMsg,
  onChangeHandler,
  register,
  regOptions,
}: ISwitcherProps) {
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
                {...(register && register(name as keyof IFormValues, regOptions))}
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

export default LabledSwitcher;
