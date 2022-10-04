import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Notfound from './404';

describe('NotFound page', () => {
  it('renders component', () => {
    render(
      <BrowserRouter>
        <Notfound />
      </BrowserRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('link').length).toBeGreaterThan(0);
  });
});
