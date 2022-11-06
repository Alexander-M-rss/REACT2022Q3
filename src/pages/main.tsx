import React, { useCallback, useEffect, useState } from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import { getItems, IGetItemsOptions } from '../api/api';
import DownloadIndicator from 'components/downloadIndicator';
import SortingSwitcher from 'components/sortingSwitcher';
import PaginationSwitcher from 'components/paginationSwitcher';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { saveItemsData, setDetailsIdx } from 'store/stateSlice';

function Main() {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((store) => store.state);
  const navigate = useNavigate();

  const getItemsData = useCallback(
    async (opt: IGetItemsOptions) => {
      setIsDataLoading(true);
      const data = await getItems(opt);
      setIsDataLoading(false);
      dispatch(
        saveItemsData({
          itemsData: data.items,
          errMsg: data.errMsg,
          pages: data.pages,
          search: opt.search,
          sorting: opt.sorting,
          page: opt.page,
          itemsPerPage: opt.limit,
        })
      );
    },
    [dispatch]
  );

  const showDetails: React.MouseEventHandler = (e) => {
    dispatch(setDetailsIdx(parseInt(e.currentTarget.id)));
    navigate('/details');
  };

  useEffect(() => {
    if (!state.itemsData || (!state.itemsData.length && !state.errMsg.length)) {
      getItemsData({
        search: '',
        sorting: state.sorting,
        page: state.page,
        limit: state.itemsPerPage,
      });
    }
  }, [getItemsData, state]);

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
      {isDataLoading && <DownloadIndicator />}
      {!isDataLoading && (
        <ItemsCardsList items={state.itemsData || []} errMsg={state.errMsg} onClick={showDetails} />
      )}
    </>
  );
}

export default Main;
