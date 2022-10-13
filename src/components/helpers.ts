import { IFormValues, NotValidInputs } from './formTypes';

const MIN_AGE = 12;

function validateForm(formValues: IFormValues): {
  isNotValid: NotValidInputs;
  isNotValidInputsCount: number;
} {
  const isNotValid: NotValidInputs = {
    name: false,
    surname: false,
    birthday: false,
    picture: false,
    consent: false,
    country: false,
    gender: false,
  };
  const keys = Object.keys(formValues);
  let isNotValidInputsCount = 0;

  for (const key of keys) {
    if (!formValues[key as keyof IFormValues]) {
      isNotValid[key as keyof IFormValues] = true;
      isNotValidInputsCount += 1;
    }
  }

  if (formValues.birthday) {
    const today = new Date().getFullYear();
    const birthday = new Date(formValues.birthday).getFullYear();

    if (MIN_AGE > today - birthday) {
      isNotValid.birthday = true;
      isNotValidInputsCount += 1;
    }
  }

  return { isNotValid, isNotValidInputsCount };
}

export default validateForm;
