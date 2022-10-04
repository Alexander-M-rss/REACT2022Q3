import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AboutUs from './about';

describe('NotFound page', () => {
  it('renders component', () => {
    render(
      <BrowserRouter>
        <AboutUs />
      </BrowserRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryAllByRole('link').length).toBeGreaterThan(0);
    expect(screen.getByTestId('about-us')).toBeInTheDocument();
  });
});
