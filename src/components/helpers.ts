import { InputRef, NotValidInputs } from './formTypes';

const MIN_AGE = 12;

function validateForm(
  inputRefs: InputRef,
  gender: string
): {
  isNotValid: NotValidInputs;
  isNotValidInputsCount: number;
} {
  const isNotValid: NotValidInputs = {
    nameInput: false,
    surnameInput: false,
    birthdayInput: false,
    fileInput: false,
    consentInput: false,
    countryInput: false,
    genderInput: false,
  };
  const keys = Object.keys(inputRefs);
  let isNotValidInputsCount = 0;

  for (const key of keys) {
    if (!inputRefs[key as keyof InputRef].current?.value) {
      isNotValid[key as keyof InputRef] = true;
      isNotValidInputsCount += 1;
    }
  }

  if (inputRefs.birthdayInput.current?.value) {
    const today = new Date().getFullYear();
    const birthday = new Date(inputRefs.birthdayInput.current.value).getFullYear();

    if (MIN_AGE > today - birthday) {
      isNotValid.birthdayInput = true;
      isNotValidInputsCount += 1;
    }
  }

  if (!gender) {
    isNotValid.genderInput = true;
    isNotValidInputsCount += 1;
  }

  return { isNotValid, isNotValidInputsCount };
}

export default validateForm;
