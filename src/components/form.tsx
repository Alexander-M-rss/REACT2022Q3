import React from 'react';
import './form.css';
import { IFormValues, NotValidInputs } from './formTypes';
import LabledInput from './labledInput';
import validateForm from './helpers';
import LabledSelect from './labledSelect';
import LabledSwitcher from './labledSwitcher';
import { IPersonCardProps } from './personCard';

interface IFormState {
  isSubmitDisabled: boolean;
  isFirstFilling: boolean;
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

  countries = ['Italy', 'Norway', 'Germany', 'Spain', 'Sweden', 'Ukraine', 'USA'];
  genders = ['male', 'female'];
  formRef: React.RefObject<HTMLFormElement>;

  constructor(props: IFormProps) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      isFirstFilling: true,
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
    this.formRef = React.createRef<HTMLFormElement>();
  }

  getFormValues = (): IFormValues => {
    const formElements = this.formRef.current?.elements;
    if (formElements) {
      return {
        name: (formElements.namedItem('name') as HTMLInputElement).value,
        surname: (formElements.namedItem('surname') as HTMLInputElement).value,
        birthday: (formElements.namedItem('birthday') as HTMLInputElement).value,
        gender: (formElements.namedItem('gender') as HTMLInputElement).value,
        country: (formElements.namedItem('country') as HTMLSelectElement).value,
        picture: (formElements.namedItem('picture') as HTMLInputElement).value,
        consent: (formElements.namedItem('consent') as HTMLInputElement).checked ? 'yes' : '',
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
    this.formRef.current?.reset();
    this.setState({ isSubmitDisabled: true, isFirstFilling: true });
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
    this.setState({ isSubmitDisabled: false, isFirstFilling: false });
  };

  setHandler = (isNotValidInput: boolean, isFirstFilling: boolean) => {
    return isFirstFilling ? this.enableSubmit : isNotValidInput ? this.resetIsNotValid : undefined;
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} ref={this.formRef}>
        <LabledInput
          type="text"
          name="name"
          text="Name"
          errMsg={this.state.isNotValid.name ? this.errMsg.name : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.name, this.state.isFirstFilling)}
        />
        <LabledInput
          type="text"
          name="surname"
          text="Surname"
          errMsg={this.state.isNotValid.surname ? this.errMsg.surname : ''}
          onChangeHandler={this.setHandler(
            this.state.isNotValid.surname,
            this.state.isFirstFilling
          )}
        />
        <LabledInput
          type="date"
          name="birthday"
          text="Birthday"
          errMsg={this.state.isNotValid.birthday ? this.errMsg.birthday : ''}
          onChangeHandler={this.setHandler(
            this.state.isNotValid.birthday,
            this.state.isFirstFilling
          )}
        />
        <LabledSwitcher
          name="gender"
          text="Gender"
          options={this.genders}
          errMsg={this.state.isNotValid.gender ? this.errMsg.gender : ''}
          onChangeHandler={this.setHandler(this.state.isNotValid.gender, this.state.isFirstFilling)}
        />
        <LabledSelect
          name="country"
          text="Country"
          options={this.countries}
          errMsg={this.state.isNotValid.country ? this.errMsg.country : ''}
          onChangeHandler={this.setHandler(
            this.state.isNotValid.country,
            this.state.isFirstFilling
          )}
        />
        <LabledInput
          type="file"
          name="picture"
          text="Profile picture"
          errMsg={this.state.isNotValid.picture ? this.errMsg.picture : ''}
          onChangeHandler={this.setHandler(
            this.state.isNotValid.picture,
            this.state.isFirstFilling
          )}
          accept=".jpg,.jpeg,.png"
        />
        <LabledInput
          type="checkbox"
          name="consent"
          text="I consent to my personal data"
          errMsg={this.state.isNotValid.consent ? this.errMsg.consent : ''}
          onChangeHandler={this.setHandler(
            this.state.isNotValid.consent,
            this.state.isFirstFilling
          )}
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
