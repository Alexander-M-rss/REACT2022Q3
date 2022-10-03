import React from 'react';
import Header, { links, HEADER_HEIGHT } from '../components/header';
import SearchBar, { SEARCH_HEIGHT } from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import itemsData, { BASE_IMG_URL } from '../data/items';

function Main() {
  return (
    <>
      <Header title="Main Page" links={[links.about]} />
      <SearchBar placeholder="Search" />
      <ItemsCardsList
        items={itemsData}
        heightOffset={`${HEADER_HEIGHT} + ${SEARCH_HEIGHT}`}
        baseImgUrl={BASE_IMG_URL}
      />
    </>
  );
}

export default Main;
