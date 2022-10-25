import React, { useState } from 'react';
import './form.css';
import { IFormValues, ErrMsg } from './formTypes';
import LabledInput from './labledInput';
import validateBirthday from './helpers';
import LabledSelect from './labledSelect';
import LabledSwitcher from './labledSwitcher';
import { IPersonCardProps } from './personCard';
import { useForm } from 'react-hook-form';

interface IFormProps {
  addPersonCard: (personCard: IPersonCardProps) => void;
}

const errMsg: ErrMsg = {
  name: 'should not be empty',
  surname: 'should not be empty',
  birthday: 'you must be at least 12 yo',
  picture: 'please select picture',
  consent: 'please check to proceed',
  country: 'please select country',
  gender: 'please select your gender',
};

const countries = ['Italy', 'Norway', 'Germany', 'Spain', 'Sweden', 'Ukraine', 'USA'];
const genders = ['male', 'female'];

function Form({ addPersonCard }: IFormProps) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isFirstFilling, setIsFirstFilling] = useState(true);
  const {
    handleSubmit,
    reset,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>({ reValidateMode: 'onSubmit' });

  const submitHandler = (data: IFormValues) => {
    const { name, surname, birthday, country, gender } = data;
    const picture = data.picture[0].name;

    addPersonCard({
      name,
      surname,
      birthday,
      country,
      gender,
      picture,
    });
    reset();
    setIsFirstFilling(true);
  };

  const clearErrMsg: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    clearErrors(e.target.name as keyof IFormValues);
    if (!Object.keys(errors).length) {
      setIsSubmitDisabled(false);
    }
  };

  const enableSubmit: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = () => {
    setIsFirstFilling(false);
    setIsSubmitDisabled(false);
  };

  const setHandler = (isNotValidInput: boolean, isFirstFilling: boolean) => {
    return isFirstFilling ? enableSubmit : isNotValidInput ? clearErrMsg : undefined;
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        handleSubmit(submitHandler)(e);
      }}
    >
      <LabledInput
        type="text"
        name="name"
        text="Name"
        errMsg={errors?.name ? errMsg.name : ''}
        register={register}
        options={{ onChange: setHandler(!!errors?.name, isFirstFilling), required: true }}
      />
      <LabledInput
        type="text"
        name="surname"
        text="Surname"
        errMsg={errors?.surname ? errMsg.surname : ''}
        register={register}
        options={{ onChange: setHandler(!!errors?.surname, isFirstFilling), required: true }}
      />
      <LabledInput
        type="date"
        name="birthday"
        text="Birthday"
        errMsg={errors?.birthday ? errMsg.birthday : ''}
        register={register}
        options={{
          onChange: setHandler(!!errors?.birthday, isFirstFilling),
          required: true,
          validate: validateBirthday,
        }}
      />
      <LabledSwitcher
        name="gender"
        text="Gender"
        options={genders}
        errMsg={errors.gender ? errMsg.gender : ''}
        register={register}
        regOptions={{ onChange: setHandler(!!errors?.gender, isFirstFilling), required: true }}
      />
      <LabledSelect
        name="country"
        text="Country"
        options={countries}
        errMsg={errors?.country ? errMsg.country : ''}
        register={register}
        regOptions={{ onChange: setHandler(!!errors?.country, isFirstFilling), required: true }}
      />
      <LabledInput
        type="file"
        name="picture"
        text="Profile picture"
        errMsg={errors?.picture ? errMsg.picture : ''}
        accept=".jpg,.jpeg,.png"
        register={register}
        options={{ onChange: setHandler(!!errors?.picture, isFirstFilling), required: true }}
      />
      <LabledInput
        type="checkbox"
        name="consent"
        text="I consent to my personal data"
        errMsg={errors?.consent ? errMsg.consent : ''}
        register={register}
        options={{ onChange: setHandler(!!errors?.consent, isFirstFilling), required: true }}
      />
      <input
        type="submit"
        name="submit"
        style={{ margin: '5px auto' }}
        disabled={isSubmitDisabled}
      />
    </form>
  );
}

export default Form;
