import React from 'react';
import { IGetItemsOptions, DEFAULT_PER_PAGE } from 'api/api';
import { useAppSelector } from 'store/hooks';
import './paginationSwitcher.css';

const PER_PAGE_DELTA = 5;
const PER_PAGE_MULT = 5;
const perPageOpt = Array(PER_PAGE_MULT).fill(0);

interface IPaginationSwitcherProps {
  searchHandler: (opt: IGetItemsOptions) => void;
}

const PaginationSwitcher = ({ searchHandler }: IPaginationSwitcherProps) => {
  const state = useAppSelector((store) => store.state);

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
          nextPage = state.page - 1;
          break;
        }
        case 'next': {
          nextPage = state.page + 1;
          break;
        }
        case 'last': {
          nextPage = state.pages;
          break;
        }
        default:
          return;
      }
      searchHandler({
        search: state.search,
        sorting: state.sorting,
        page: nextPage,
        limit: state.itemsPerPage,
      });
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    searchHandler({
      search: state.search,
      sorting: state.sorting,
      page: 1,
      limit: +event.target.value,
    });
  };

  return (
    <div className="pagination-switcher" data-testid="pagination">
      <span>Page:</span>
      <div className="page-btns" onClick={handleClick}>
        <button className="page-btn" name="first" id="first" disabled={state.page <= 1}>
          {'<<'}
        </button>
        <button className="page-btn" name="prev" id="prev" disabled={state.page <= 1}>
          {'<'}
        </button>
        <span className="page-number">
          {state.page} / {state.pages}
        </span>
        <button className="page-btn" name="next" id="next" disabled={state.page >= state.pages}>
          {'>'}
        </button>
        <button className="page-btn" name="last" id="last" disabled={state.page >= state.pages}>
          {'>>'}
        </button>
      </div>
      <span> per page:</span>
      <select
        className="pagination-switcher__select"
        value={state.itemsPerPage}
        onChange={handleChange}
        disabled={!!state.errMsg.length}
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
