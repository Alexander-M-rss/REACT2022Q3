import React from 'react';
import { render, screen } from '@testing-library/react';
import LabledSwitcher from './labledSwitcher';
import userEvent from '@testing-library/user-event';

const options = ['option1', 'option2', 'option3'];

describe('LabledSwitcher', () => {
  it('renders component', () => {
    render(<LabledSwitcher text="Select" name="switcher" options={options} errMsg="Error" />);
    expect(screen.getAllByText(/option/).length).toBe(options.length);
    expect(screen.getByText(/Error/)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(options.length);
  });
  it('changes value', () => {
    render(<LabledSwitcher text="Select" name="switcher" options={options} errMsg="Error" />);
    options.forEach((option) => {
      const radioBtn = screen.getByRole('radio', { name: option });
      userEvent.click(radioBtn);
      expect(radioBtn).toBeChecked();
    });
  });
});
