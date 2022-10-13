import React from 'react';
import './form.css';
import { IFormValues, NotValidInputs } from './formTypes';
import LabledInput from './labledInput';
import validateForm from './helpers';
import LabledSelect from './labledSelect';
import LabledSwitcher from './labledSwitcher';
import { IPersonCardProps } from './personCard';

interface IFormFields {
  name: HTMLInputElement;
  surname: HTMLInputElement;
  birthday: HTMLInputElement;
  picture: HTMLInputElement;
  consent: HTMLInputElement;
  country: HTMLSelectElement;
  gender: HTMLInputElement;
}

interface IFormState {
  isSubmitDisabled: boolean;
  isNotValid: NotValidInputs;
}

interface IFormProps {
  addPersonCard: (personCard: IPersonCardProps) => void;
}

class Form extends React.Component<IFormProps, IFormState> {
  errMsg: IFormValues = {
    name: 'should not be empty',
    surname: 'should not be empty',
    birthday: 'select more than 11yo',
    picture: 'please select picture',
    consent: 'please check to proceed',
    country: 'please select country',
    gender: 'please select your gender',
  };

  notValidInputsCount: number;
  isFirstFilling: boolean;

  countries = ['Italy', 'Norway', 'Germany', 'Spain', 'Sweden', 'Ukraine', 'USA'];
  genders = ['male', 'female'];
  formRef: React.RefObject<HTMLFormElement & IFormFields>;

  constructor(props: IFormProps) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      isNotValid: {
        name: false,
        surname: false,
        birthday: false,
        picture: false,
        consent: false,
        country: false,
        gender: false,
      },
    };
    this.notValidInputsCount = 0;
    this.isFirstFilling = true;
    this.formRef = React.createRef<HTMLFormElement & IFormFields>();
  }

  getFormValues = (): IFormValues => {
    if (this.formRef.current) {
      const { name, surname, birthday, gender, country, picture, consent } = this.formRef.current;
      return {
        name: name.value,
        surname: surname.value,
        birthday: birthday.value,
        gender: gender.value,
        country: country.value,
        picture: picture.value,
        consent: consent.checked ? 'yes' : '',
      };
    }

    return {
      name: '',
      surname: '',
      birthday: '',
      gender: '',
      country: '',
      picture: '',
      consent: '',
    };
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = this.getFormValues();

    const { isNotValid, isNotValidInputsCount } = validateForm(formValues);

    if (isNotValidInputsCount) {
      this.notValidInputsCount = isNotValidInputsCount;
      this.setState({ isNotValid: isNotValid, isSubmitDisabled: true });
      return;
    }

    this.props.addPersonCard(formValues);
  };

  resetIsNotValid: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    this.notValidInputsCount -= 1;

    if (this.notValidInputsCount === 0) {
      this.setState({ isSubmitDisabled: false });
    }
    this.setState((prevState) => {
      const isNotValid = prevState.isNotValid;
      const key = e.target.name;

      if (Object.hasOwn(isNotValid, key)) {
        isNotValid[key as keyof NotValidInputs] = false;
      }

      return { isNotValid };
    });
  };

  enableSubmit: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = () => {
    this.isFirstFilling = false;
    this.setState({ isSubmitDisabled: false });
  };

  setHandler = (isNotValidInput: boolean) => {
    return this.isFirstFilling
      ? this.enableSubmit
      : isNotValidInput
      ? this.resetIsNotValid
      : undefined;
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} ref={this.formRef}>
        <LabledInput
          type="text"
          name="name"
          text="Name"
          errMsg={this.state.isNotValid.name ? this.errMsg.name : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.name)}
        />
        <LabledInput
          type="text"
          name="surname"
          text="Surname"
          errMsg={this.state.isNotValid.surname ? this.errMsg.surname : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.surname)}
        />
        <LabledInput
          type="date"
          name="birthday"
          text="Birthday"
          errMsg={this.state.isNotValid.birthday ? this.errMsg.birthday : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.birthday)}
        />
        <LabledSwitcher
          name="gender"
          text="Gender"
          options={this.genders}
          errMsg={this.state.isNotValid.gender ? this.errMsg.gender : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.gender)}
        />
        <LabledSelect
          name="country"
          text="Country"
          options={this.countries}
          errMsg={this.state.isNotValid.country ? this.errMsg.country : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.country)}
        />
        <LabledInput
          type="file"
          name="picture"
          text="Profile picture"
          errMsg={this.state.isNotValid.picture ? this.errMsg.picture : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.picture)}
          accept=".jpg,.jpeg,.png"
        />
        <LabledInput
          type="checkbox"
          name="consent"
          text="I consent to my personal data"
          errMsg={this.state.isNotValid.consent ? this.errMsg.consent : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.consent)}
        />
        <input
          type="submit"
          name="submit"
          style={{ margin: '5px auto' }}
          disabled={this.state.isSubmitDisabled}
        />
      </form>
    );
  }
}

export default Form;
