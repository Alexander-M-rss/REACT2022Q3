import React from 'react';
import { IGetItemsOptions, SORTING } from 'api/api';
import { useAppSelector } from 'store/hooks';
import './sortingSwitcher.css';

interface ISortingSwitcherProps {
  searchHandler: (opt: IGetItemsOptions) => void;
}

const sortingOptions = [
  { text: 'Name Ascending', value: SORTING.nameAsc },
  { text: 'Name Descending', value: SORTING.nameDesc },
  { text: 'Race Ascending', value: SORTING.raceAsc },
  { text: 'Race Descending', value: SORTING.raceDesc },
  { text: 'Height Ascending', value: SORTING.heightAsc },
  { text: 'Height Descending', value: SORTING.heightDesc },
];

const SortingSwitcher = ({ searchHandler }: ISortingSwitcherProps) => {
  const state = useAppSelector((store) => store.state);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    searchHandler({
      search: state.search,
      sorting: event.target.value as SORTING,
      page: state.page,
      limit: state.itemsPerPage,
    });
  };

  return (
    <div className="sorting-switcher">
      <span>Sorting:</span>
      <select
        className="sorting-switcher__select"
        value={state.sorting}
        onChange={handleChange}
        disabled={!!state.errMsg.length}
        data-testid="sort"
      >
        {sortingOptions.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortingSwitcher;
