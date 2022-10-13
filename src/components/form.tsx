import React from 'react';
import './form.css';
import { InputRef, MsgTemplates, NotValidInputs } from './formTypes';
import LabledInput from './labledInput';
import validateForm from './helpers';
import LabledSelect from './labledSelect';
import LabledSwitcher from './labledSwitcher';
import { IPersonCardProps } from './personCard';

interface IFormState {
  isSubmitDisabled: boolean;
  isNotValid: NotValidInputs;
}

interface IFormsProps {
  addPersonCard: (personCard: IPersonCardProps) => void;
}

class Form extends React.Component<IFormsProps, IFormState> {
  errMsg: MsgTemplates = {
    nameInput: 'should not be empty',
    surnameInput: 'should not be empty',
    birthdayInput: 'select more than 11yo',
    fileInput: 'please select picture',
    consentInput: 'please check to proceed',
    countryInput: 'please select country',
    genderInput: 'please select your gender',
  };

  inputRefs: InputRef = {
    nameInput: React.createRef<HTMLInputElement>(),
    surnameInput: React.createRef<HTMLInputElement>(),
    birthdayInput: React.createRef<HTMLInputElement>(),
    fileInput: React.createRef<HTMLInputElement>(),
    consentInput: React.createRef<HTMLInputElement>(),
    countryInput: React.createRef<HTMLSelectElement>(),
  };

  notValidInputsCount: number;
  isFirstFilling: boolean;

  countries = ['Italy', 'Norway', 'Germany', 'Spain', 'Sweden', 'Ukraine', 'USA'];
  genders = ['male', 'female'];
  gendersRefs: React.RefObject<HTMLInputElement>[];

  constructor(props: IFormsProps) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      isNotValid: {
        nameInput: false,
        surnameInput: false,
        birthdayInput: false,
        fileInput: false,
        consentInput: false,
        countryInput: false,
        genderInput: false,
      },
    };
    this.notValidInputsCount = 0;
    this.isFirstFilling = true;
    this.gendersRefs = this.genders.map(() => {
      return React.createRef<HTMLInputElement>();
    });
  }

  getGenderValue = () => {
    const valueTarget = this.gendersRefs.find((ref) => ref?.current?.checked);

    return valueTarget?.current?.value || '';
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const checkbox = (this.inputRefs.consentInput as React.RefObject<HTMLInputElement>).current;

    if (!checkbox) {
      return;
    }
    checkbox.value = checkbox.checked ? 'consent' : '';
    const { isNotValid, isNotValidInputsCount } = validateForm(
      this.inputRefs,
      this.getGenderValue()
    );

    if (isNotValidInputsCount) {
      this.notValidInputsCount = isNotValidInputsCount;
      this.setState({ isNotValid: isNotValid, isSubmitDisabled: true });
      return;
    }

    console.log('add');

    this.props.addPersonCard({
      name: this.inputRefs.nameInput.current?.value || '',
      surname: this.inputRefs.surnameInput.current?.value || '',
      birthday: this.inputRefs.birthdayInput.current?.value || '',
      gender: this.getGenderValue(),
      country: this.inputRefs.countryInput.current?.value || '',
      profilePicture: this.inputRefs.fileInput.current?.value || '',
    });
  };

  resetIsNotValid: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    this.notValidInputsCount -= 1;

    if (this.notValidInputsCount === 0) {
      this.setState({ isSubmitDisabled: false });
    }
    this.setState((prevState) => {
      const isNotValid = prevState.isNotValid;
      const key = e.target.name + 'Input';

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
      <form className="form" onSubmit={this.handleSubmit}>
        <LabledInput
          type="text"
          name="name"
          text="Name"
          errMsg={this.state.isNotValid.nameInput ? this.errMsg.nameInput : ''}
          reference={this.inputRefs.nameInput as React.RefObject<HTMLInputElement>}
          onChangeHandler={this.setHandler(this.state.isNotValid.nameInput)}
        />
        <LabledInput
          type="text"
          name="surname"
          text="Surname"
          errMsg={this.state.isNotValid.surnameInput ? this.errMsg.surnameInput : ''}
          reference={this.inputRefs.surnameInput as React.RefObject<HTMLInputElement>}
          onChangeHandler={this.setHandler(this.state.isNotValid.surnameInput)}
        />
        <LabledInput
          type="date"
          name="birthday"
          text="Birthday"
          errMsg={this.state.isNotValid.birthdayInput ? this.errMsg.birthdayInput : ''}
          reference={this.inputRefs.birthdayInput as React.RefObject<HTMLInputElement>}
          onChangeHandler={this.setHandler(this.state.isNotValid.birthdayInput)}
        />
        <LabledSwitcher
          name="gender"
          text="Gender"
          options={this.genders}
          errMsg={this.state.isNotValid.genderInput ? this.errMsg.genderInput : ''}
          references={this.gendersRefs}
          onChangeHandler={this.setHandler(this.state.isNotValid.genderInput)}
        />
        <LabledSelect
          name="country"
          text="Country"
          options={this.countries}
          errMsg={this.state.isNotValid.countryInput ? this.errMsg.countryInput : ''}
          reference={this.inputRefs.countryInput as React.RefObject<HTMLSelectElement>}
          onChangeHandler={this.setHandler(this.state.isNotValid.countryInput)}
        />
        <LabledInput
          type="file"
          name="file"
          text="Profile picture"
          errMsg={this.state.isNotValid.fileInput ? this.errMsg.fileInput : ''}
          reference={this.inputRefs.fileInput as React.RefObject<HTMLInputElement>}
          onChangeHandler={this.setHandler(this.state.isNotValid.fileInput)}
          accept=".jpg,.jpeg,.png"
        />
        <LabledInput
          type="checkbox"
          name="consent"
          text="I consent to my personal data"
          errMsg={this.state.isNotValid.consentInput ? this.errMsg.consentInput : ''}
          reference={this.inputRefs.consentInput as React.RefObject<HTMLInputElement>}
          onChangeHandler={this.setHandler(this.state.isNotValid.consentInput)}
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
