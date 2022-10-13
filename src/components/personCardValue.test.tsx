import React from 'react';
import { render, screen } from '@testing-library/react';
import PersonCardValue from './personCardValue';

describe('PersonCardValue', () => {
  it('renders component', () => {
    render(<PersonCardValue name="Name" value="Value" />);
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Value/)).toBeInTheDocument();
  });
});
