import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header, { links } from './header';

describe('Header', () => {
  it('renders component', () => {
    const linksArray = Object.values(links);
    render(
      <BrowserRouter>
        <Header title="Main Page" links={linksArray} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(linksArray.length);
  });
});
