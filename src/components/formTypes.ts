export type InputType =
  | 'nameInput'
  | 'surnameInput'
  | 'birthdayInput'
  | 'fileInput'
  | 'consentInput'
  | 'countryInput';

export type InputRef = {
  [k in InputType]: React.RefObject<HTMLInputElement> | React.RefObject<HTMLSelectElement>;
};

export type MsgTemplates = { [k in InputType | 'genderInput']: string };
export type NotValidInputs = { [k in InputType | 'genderInput']: boolean };
