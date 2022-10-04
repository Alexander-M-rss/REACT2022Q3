import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './searchBar';

function localStorageMock() {
  let storage: { [key: string]: string };

  return {
    setItem: (key: string, value: string) => {
      storage[key] = value || '';
    },
    getItem: (key: string) => {
      return key in storage ? storage[key] : null;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (i: number) => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: () => {
      storage = {};
    },
  };
}

describe('SearchBar', () => {
  it('renders component', () => {
    render(<SearchBar placeholder="Search test" />);
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search test')).toBeInTheDocument();
  });
  it('changes input vakue by onCnange event', () => {
    render(<SearchBar placeholder="Search test" />);
    userEvent.type(screen.getByRole('textbox'), 'test search');
    expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
  });
  it('clears input value by clear button onClick event', () => {
    render(<SearchBar placeholder="Search test" />);
    userEvent.click(screen.getAllByRole('button')[1]);
    userEvent.type(screen.getByRole('textbox'), 'test search');
    expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  localStorage = localStorageMock();

  it('renders input value from localStorage', () => {
    localStorage.setItem('searchBarValue', 'set value from localStorage');
    render(<SearchBar placeholder="Search test" />);
    expect(screen.getByRole('textbox')).toHaveValue('set value from localStorage');
  });

  it('saves input value to localStorage', () => {
    localStorage.clear();
    render(<SearchBar placeholder="Search test" />);
    userEvent.type(screen.getByRole('textbox'), 'set value to localStorage');
    cleanup();
    expect(localStorage.getItem('searchBarValue')).toBe('set value to localStorage');
  });
});
