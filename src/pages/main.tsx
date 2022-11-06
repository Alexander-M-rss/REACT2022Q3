import React, { useCallback, useContext, useEffect, useState } from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import { getItems, IGetItemsOptions } from '../api/api';
import DownloadIndicator from 'components/downloadIndicator';
import GlobalStateContext from 'state/context';
import { ACTION } from 'state/reducer';
import SortingSwitcher from 'components/sortingSwitcher';
import PaginationSwitcher from 'components/paginationSwitcher';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { globalState, dispatch } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const getItemsData = useCallback(
    async (opt: IGetItemsOptions) => {
      setIsDataLoading(true);
      const data = await getItems(opt);
      setIsDataLoading(false);
      dispatch({
        type: ACTION.saveItemsData,
        payload: {
          itemsData: data.items,
          errMsg: data.errMsg,
          pages: data.pages,
          search: opt.search,
          sorting: opt.sorting,
          page: opt.page,
          itemsPerPage: opt.limit,
        },
      });
    },
    [dispatch]
  );

  const showDetails: React.MouseEventHandler = (e) => {
    dispatch({ type: ACTION.setDetailsIdx, payload: parseInt(e.currentTarget.id) });
    navigate('/details');
  };

  useEffect(() => {
    if (!globalState.itemsData || (!globalState.itemsData.length && !globalState.errMsg.length)) {
      getItemsData({
        search: '',
        sorting: globalState.sorting,
        page: globalState.page,
        limit: globalState.itemsPerPage,
      });
    }
  }, [getItemsData, globalState]);

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
        <ItemsCardsList
          items={globalState.itemsData || []}
          errMsg={globalState.errMsg}
          onClick={showDetails}
        />
      )}
    </>
  );
}

export default Main;
