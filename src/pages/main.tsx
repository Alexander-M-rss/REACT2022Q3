import React, { useEffect, useRef, useState } from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import { getItems, IItemData } from '../api/api';
import Modal, { OVERLAY_ID, CLOSE_ID } from 'components/modal';
import ItemCard from 'components/itemCard';
import DownloadIndicator from 'components/downloadIndicator';

function Main() {
  const [itemsData, setItemsData] = useState([] as IItemData[]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const itemModalIdx = useRef(0);
  const errMsg = useRef('');
  const [isDataLoading, setIsDataLoading] = useState(true);

  const getItemsData = async (search: string) => {
    setItemsData([]);
    setIsDataLoading(true);
    const data = await getItems(search);
    errMsg.current = data.errMsg;
    setIsDataLoading(false);
    setItemsData(data.items);
  };

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
    getItemsData('');
  }, []);

  return (
    <>
      <Header title="Main Page" links={[links.forms, links.about]} />
      <SearchBar placeholder="Search" searchHandler={getItemsData} />
      {isDataLoading && <DownloadIndicator />}
      {!isDataLoading && (
        <ItemsCardsList items={itemsData} errMsg={errMsg.current} onClick={showModal} />
      )}
      {isModalVisible && (
        <Modal closeHandler={closeModal}>
          <ItemCard item={itemsData[itemModalIdx.current]} isFullInfo={true} onClick={() => {}} />
        </Modal>
      )}
    </>
  );
}

export default Main;
