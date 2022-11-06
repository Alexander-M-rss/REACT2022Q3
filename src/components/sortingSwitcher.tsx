import React, { useContext } from 'react';
import { IGetItemsOptions, SORTING } from 'api/api';
import GlobalStateContext from 'state/context';
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
  const { globalState } = useContext(GlobalStateContext);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    searchHandler({
      search: globalState.search,
      sorting: event.target.value as SORTING,
      page: globalState.page,
      limit: globalState.itemsPerPage,
    });
  };

  return (
    <div className="sorting-switcher">
      <span>Sorting:</span>
      <select
        className="sorting-switcher__select"
        value={globalState.sorting}
        onChange={handleChange}
        disabled={!!globalState.errMsg.length}
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
