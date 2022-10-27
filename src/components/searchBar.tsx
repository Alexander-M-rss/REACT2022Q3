import React, { useEffect, useState } from 'react';
import './searchBar.css';

const SEARCH_BAR_HEIGHT = '36px';
const MARGIN_TOP_BOTTOM = '10px';

interface ISearchBarProps {
  placeholder: string;
  searchHandler: (search: string) => void;
}

function SearchBar({ placeholder, searchHandler }: ISearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setValue('');
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    searchHandler(value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('searchBarValue');
    setValue(savedValue || '');
  }, []);

  useEffect(() => localStorage.setItem('searchBarValue', value));

  return (
    <form
      className="search-container"
      style={{ height: SEARCH_BAR_HEIGHT, margin: `${MARGIN_TOP_BOTTOM} auto` }}
      data-testid="search-bar"
      onSubmit={handleSearchSubmit}
    >
      <button type="submit" className="button search-button"></button>
      <input
        className="search"
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
      />
      <button className="button clear-button" onClick={handleClearClick}></button>
    </form>
  );
}

export default SearchBar;
