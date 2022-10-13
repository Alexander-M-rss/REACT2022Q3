import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('renders Main page by default ', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Main Page' })).toBeInTheDocument();
  });
  it('renders About Us page by link from Main page and return to Main page by link from About US', () => {
    render(<App />);
    userEvent.click(screen.getByText(/About Us/));
    expect(screen.getByRole('heading', { name: 'About Us' })).toBeInTheDocument();
    userEvent.click(screen.getByText(/Main/));
    expect(screen.getByRole('heading', { name: 'Main Page' })).toBeInTheDocument();
    userEvent.click(screen.getByText(/Forms/));
    expect(screen.getByRole('heading', { name: 'Forms Page' })).toBeInTheDocument();
    userEvent.click(screen.getByText(/About/));
    expect(screen.getByRole('heading', { name: 'About Us' })).toBeInTheDocument();
    userEvent.click(screen.getByText(/Forms/));
    expect(screen.getByRole('heading', { name: 'Forms Page' })).toBeInTheDocument();
    userEvent.click(screen.getByText(/Main/));
    expect(screen.getByRole('heading', { name: 'Main Page' })).toBeInTheDocument();
  });
});
