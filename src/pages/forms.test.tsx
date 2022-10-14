import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Forms from './forms';

describe('NotFound page', () => {
  it('renders component', () => {
    render(
      <BrowserRouter>
        <Forms />
      </BrowserRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryAllByRole('link').length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
  });
});
