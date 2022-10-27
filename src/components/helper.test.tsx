import validateForm from './helpers';

const dataSet: {
  input: string;
  result: boolean;
}[] = [
  {
    input: '06-05-2010',
    result: true,
  },
  {
    input: '06-05-2022',
    result: false,
  },
];

describe('validateForm', () => {
  it('tests validation', () => {
    dataSet.forEach((data) => {
      expect(validateForm(data.input)).toStrictEqual(data.result);
    });
  });
});
