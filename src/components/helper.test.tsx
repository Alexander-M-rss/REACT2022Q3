import validateForm from './helpers';
import { IFormValues, NotValidInputs } from './formTypes';

const dataSet: {
  input: IFormValues;
  result: { isNotValid: NotValidInputs; isNotValidInputsCount: number };
}[] = [
  {
    input: {
      name: '',
      surname: '',
      birthday: '',
      picture: '',
      consent: '',
      country: '',
      gender: '',
    },
    result: {
      isNotValid: {
        name: true,
        surname: true,
        birthday: true,
        picture: true,
        consent: true,
        country: true,
        gender: true,
      },
      isNotValidInputsCount: 7,
    },
  },
  {
    input: {
      name: 'Name',
      surname: 'Surname',
      birthday: '06-05-2010',
      picture: 'img.jpg',
      consent: 'yes',
      country: 'Norway',
      gender: 'male',
    },
    result: {
      isNotValid: {
        name: false,
        surname: false,
        birthday: false,
        picture: false,
        consent: false,
        country: false,
        gender: false,
      },
      isNotValidInputsCount: 0,
    },
  },
  {
    input: {
      name: 'Name',
      surname: 'Surname',
      birthday: '06-05-2012',
      picture: 'img.jpg',
      consent: 'yes',
      country: 'Norway',
      gender: 'male',
    },
    result: {
      isNotValid: {
        name: false,
        surname: false,
        birthday: true,
        picture: false,
        consent: false,
        country: false,
        gender: false,
      },
      isNotValidInputsCount: 1,
    },
  },
];

describe('validateForm', () => {
  it('tests validation', () => {
    dataSet.forEach((data) => {
      expect(validateForm(data.input)).toStrictEqual(data.result);
    });
  });
});
