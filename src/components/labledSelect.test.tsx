import React from 'react';
import { render, screen } from '@testing-library/react';
import LabledSelect from './labledSelect';
import userEvent from '@testing-library/user-event';

const options = ['option1', 'option2', 'option3'];

describe('LabledSelect', () => {
  it('renders component', () => {
    render(<LabledSelect text="Select" name="select-name" options={options} errMsg="Error" />);
    expect(screen.getByText(/option1/)).toBeInTheDocument();
    expect(screen.getByText(/Error/)).toBeInTheDocument();
    expect((screen.getByRole('option', { name: 'Select' }) as HTMLOptionElement).selected).toBe(
      true
    );
    expect(screen.getAllByRole('option').length).toBe(options.length + 1);
  });
  it('changes value', () => {
    render(
      <LabledSelect
        text="Select"
        name="select-name"
        options={['option1', 'option2', 'option3']}
        errMsg="Error"
      />
    );
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: options[1] })
    );
    expect((screen.getByRole('option', { name: options[1] }) as HTMLOptionElement).selected).toBe(
      true
    );
  });
});
