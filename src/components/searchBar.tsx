import { IGetItemsOptions } from 'api/api';
import React, { useContext, useEffect, useState } from 'react';
import GlobalStateContext from 'state/context';
import './searchBar.css';

const SEARCH_BAR_HEIGHT = '36px';
const MARGIN = '10px';

interface ISearchBarProps {
  placeholder: string;
  searchHandler: (opt: IGetItemsOptions) => void;
}

function SearchBar({ placeholder, searchHandler }: ISearchBarProps) {
  const [value, setValue] = useState('');
  const { globalState } = useContext(GlobalStateContext);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setValue('');
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    searchHandler({
      search: value,
      sorting: globalState.sorting,
      page: 1,
      limit: globalState.itemsPerPage,
    });
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('searchBarValue');
    setValue(savedValue || '');
  }, []);

  useEffect(() => localStorage.setItem('searchBarValue', value));

  return (
    <form
      className="search-container"
      style={{ height: SEARCH_BAR_HEIGHT, margin: `${MARGIN}` }}
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
