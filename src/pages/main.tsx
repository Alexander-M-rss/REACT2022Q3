import React from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';

function Main() {
  return (
    <>
      <Header title="Main Page" links={[links.about]} />
      <SearchBar placeholder="Search" />
    </>
  );
}

export default Main;
