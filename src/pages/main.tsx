import React from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import itemsData from '../data/items';

class Main extends React.Component {
  constructor(props = {}) {
    super(props);
    this.state = { itemsData: [] };
  }

  componentDidMount = () => {
    this.getItemsData();
  };

  getItemsData = () => {
    this.setState({ itemsData: itemsData });
  };

  render() {
    return (
      <>
        <Header title="Main Page" links={[links.forms, links.about]} />
        <SearchBar placeholder="Search" />
        <ItemsCardsList items={itemsData} />
      </>
    );
  }
}

export default Main;
