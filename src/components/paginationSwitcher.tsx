import React, { useContext } from 'react';
import { IGetItemsOptions, DEFAULT_PER_PAGE } from 'api/api';
import GlobalStateContext from 'state/context';
import './paginationSwitcher.css';

const PER_PAGE_DELTA = 5;
const PER_PAGE_MULT = 5;
const perPageOpt = Array(PER_PAGE_MULT).fill(0);

interface IPaginationSwitcherProps {
  searchHandler: (opt: IGetItemsOptions) => void;
}

const PaginationSwitcher = ({ searchHandler }: IPaginationSwitcherProps) => {
  const { globalState } = useContext(GlobalStateContext);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    let nextPage: number;

    if (event.target) {
      const target = event.target as HTMLElement;
      switch (target.id) {
        case 'first': {
          nextPage = 1;
          break;
        }
        case 'prev': {
          nextPage = globalState.page - 1;
          break;
        }
        case 'next': {
          nextPage = globalState.page + 1;
          break;
        }
        case 'last': {
          nextPage = globalState.pages;
          break;
        }
        default:
          return;
      }
      searchHandler({
        search: globalState.search,
        sorting: globalState.sorting,
        page: nextPage,
        limit: globalState.itemsPerPage,
      });
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    searchHandler({
      search: globalState.search,
      sorting: globalState.sorting,
      page: 1,
      limit: +event.target.value,
    });
  };

  return (
    <div className="pagination-switcher" data-testid="pagination">
      <span>Page:</span>
      <div className="page-btns" onClick={handleClick}>
        <button className="page-btn" name="first" id="first" disabled={globalState.page <= 1}>
          {'<<'}
        </button>
        <button className="page-btn" name="prev" id="prev" disabled={globalState.page <= 1}>
          {'<'}
        </button>
        <span className="page-number">
          {globalState.page} / {globalState.pages}
        </span>
        <button
          className="page-btn"
          name="next"
          id="next"
          disabled={globalState.page >= globalState.pages}
        >
          {'>'}
        </button>
        <button
          className="page-btn"
          name="last"
          id="last"
          disabled={globalState.page >= globalState.pages}
        >
          {'>>'}
        </button>
      </div>
      <span> per page:</span>
      <select
        className="pagination-switcher__select"
        value={globalState.itemsPerPage}
        onChange={handleChange}
        disabled={!!globalState.errMsg.length}
        data-testid="per-page"
      >
        {perPageOpt.map((_, i) => {
          const value = DEFAULT_PER_PAGE + PER_PAGE_DELTA * i;
          return (
            <option value={value} key={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PaginationSwitcher;
