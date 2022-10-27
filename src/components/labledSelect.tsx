import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IFormValues } from './formTypes';
import './labledSelect.css';

interface ISelectProps {
  text: string;
  name: string;
  options: string[];
  errMsg: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLSelectElement>;
  register?: UseFormRegister<IFormValues>;
  regOptions?: RegisterOptions;
}

function LabledSelect({
  text,
  name,
  options,
  errMsg,
  onChangeHandler,
  register,
  regOptions,
}: ISelectProps) {
  return (
    <label className="labled-select__label" htmlFor={name}>
      {text} :
      <div>
        <select
          name={name}
          id={name}
          className="labled-select__select"
          onChange={onChangeHandler}
          {...(register && register(name as keyof IFormValues, regOptions))}
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

export default LabledSelect;
