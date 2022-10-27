import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IFormValues } from './formTypes';
import './labledInput.css';

interface IInputProps {
  type: string;
  text: string;
  name: string;
  errMsg: string;
  register?: UseFormRegister<IFormValues>;
  options?: RegisterOptions;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  accept?: string;
}

function LabledInput({
  type,
  text,
  name,
  errMsg,
  register,
  options,
  onChangeHandler,
  accept,
}: IInputProps) {
  return (
    <label className="labled-input__label" htmlFor={name}>
      {text} :
      <div>
        <input
          type={type}
          id={name}
          autoComplete="off"
          placeholder={text}
          className="labled-input__input"
          defaultValue={type === 'checkbox' ? 'yes' : ''}
          accept={accept}
          onChange={onChangeHandler}
          {...(register && register(name as keyof IFormValues, options))}
        />
        <span className="labled-input__error">{errMsg}</span>
      </div>
    </label>
  );
}

export default LabledInput;
