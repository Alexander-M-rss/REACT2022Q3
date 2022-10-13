import React from 'react';
import { render, screen } from '@testing-library/react';
import PersonCard from './personCard';

const namesAndValues = [
  ['Name', 'Value0'],
  ['Surname', 'Value1'],
  ['Birthday', 'Value2'],
  ['Gender', 'Value3'],
  ['Country', 'Value4'],
  ['Profile picture', 'Value5'],
];

describe('PersonCard', () => {
  it('renders component', () => {
    render(
      <PersonCard
        name={namesAndValues[0][1]}
        surname={namesAndValues[1][1]}
        birthday={namesAndValues[2][1]}
        gender={namesAndValues[3][1]}
        country={namesAndValues[4][1]}
        picture={namesAndValues[5][1]}
      />
    );
    namesAndValues.forEach((nameAndValue) => {
      nameAndValue.forEach((x) => {
        expect(screen.getByText(new RegExp(`${x}`))).toBeInTheDocument();
      });
    });
  });
});
