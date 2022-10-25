import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemCardValue from './itemCardValue';

describe('ItemCardValue', () => {
  it('renders component', () => {
    render(<ItemCardValue value="value" valueName="valueName" />);

    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getAllByText(/value/).length).toBe(2);
  });
});
