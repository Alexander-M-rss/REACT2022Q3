import React from 'react';
import { render, screen } from '@testing-library/react';
import LabledInput from './labledInput';

describe('LabledInput', () => {
  it('renders component', () => {
    render(<LabledInput type="input" text="Text input" name="text-input" errMsg="Error" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Text input/)).toBeInTheDocument();
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
});
