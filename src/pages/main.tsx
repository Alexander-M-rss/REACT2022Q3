import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import { getItems, IGetItemsOptions } from '../api/api';
import Modal, { OVERLAY_ID, CLOSE_ID } from 'components/modal';
import ItemCard from 'components/itemCard';
import DownloadIndicator from 'components/downloadIndicator';
import GlobalStateContext from 'state/context';
import { ACTION } from 'state/reducer';
import SortingSwitcher from 'components/sortingSwitcher';
import PaginationSwitcher from 'components/paginationSwitcher';

function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const itemModalIdx = useRef(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { globalState, dispatch } = useContext(GlobalStateContext);

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
        },
      });
    },
    [dispatch]
  );

  const showModal: React.MouseEventHandler = (e) => {
    itemModalIdx.current = parseInt(e.currentTarget.id);
    setIsModalVisible(true);
  };

  const closeModal: React.MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;

    if (!target || (target && target.id !== OVERLAY_ID && target.id !== CLOSE_ID)) {
      return;
    }

    setIsModalVisible(false);
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
          onClick={showModal}
        />
      )}
      {isModalVisible && globalState.itemsData && (
        <Modal closeHandler={closeModal}>
          <ItemCard
            item={globalState.itemsData[itemModalIdx.current]}
            isFullInfo={true}
            onClick={() => {}}
          />
        </Modal>
      )}
    </>
  );
}

export default Main;
