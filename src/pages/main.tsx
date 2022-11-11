import React, { useCallback, useEffect } from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import { IGetItemsOptions } from '../api/api';
import DownloadIndicator from 'components/downloadIndicator';
import SortingSwitcher from 'components/sortingSwitcher';
import PaginationSwitcher from 'components/paginationSwitcher';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getItemsThunk, setDetailsIdx } from 'store/stateSlice';

function Main() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((store) => store.state);
  const navigate = useNavigate();

  const getItemsData = useCallback(
    async (opt: IGetItemsOptions) => {
      dispatch(getItemsThunk(opt));
    },
    [dispatch]
  );

  const showDetails: React.MouseEventHandler = (e) => {
    dispatch(setDetailsIdx(parseInt(e.currentTarget.id)));
    navigate('/details');
  };

  useEffect(() => {
    if (!state.itemsData || (!state.itemsData.length && !state.errMsg.length)) {
      dispatch(
        getItemsThunk({
          search: '',
          sorting: state.sorting,
          page: state.page,
          limit: state.itemsPerPage,
        })
      );
    }
  }, [
    dispatch,
    state.errMsg.length,
    state.itemsData,
    state.itemsPerPage,
    state.page,
    state.sorting,
  ]);

  return (
    <>
      <Header title="Main Page" links={[links.forms, links.about]} />
      <div
        style={{
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <SearchBar placeholder="Search" searchHandler={getItemsData} />
        <SortingSwitcher searchHandler={getItemsData} />
        <PaginationSwitcher searchHandler={getItemsData} />
      </div>
      {state.isDataLoading && <DownloadIndicator />}
      {!state.isDataLoading && (
        <ItemsCardsList items={state.itemsData || []} errMsg={state.errMsg} onClick={showDetails} />
      )}
    </>
  );
}

export default Main;
