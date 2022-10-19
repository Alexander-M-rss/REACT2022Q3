import React from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import itemsData, { IItemData } from '../data/items';
import Modal, { OVERLAY_ID, CLOSE_ID } from 'components/modal';
import ItemCard from 'components/itemCard';

interface IMainPageState {
  itemsData: IItemData[];
  isModalVisible: boolean;
  itemModalIdx: number;
}

class Main extends React.Component<unknown, IMainPageState> {
  constructor(props = {}) {
    super(props);
    this.state = { itemsData: [], isModalVisible: false, itemModalIdx: 0 };
  }

  componentDidMount = () => {
    this.getItemsData();
  };

  getItemsData = () => {
    this.setState({ itemsData: itemsData });
  };

  showModal: React.MouseEventHandler = (e) => {
    this.setState({ isModalVisible: true, itemModalIdx: parseInt(e.currentTarget.id) });
  };

  closeModal: React.MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;

    if (!target || (target && target.id !== OVERLAY_ID && target.id !== CLOSE_ID)) {
      return;
    }

    this.setState({ isModalVisible: false });
  };

  render() {
    return (
      <>
        <Header title="Main Page" links={[links.forms, links.about]} />
        <SearchBar placeholder="Search" />
        <ItemsCardsList items={itemsData} onClick={this.showModal} />
        {this.state.isModalVisible && (
          <Modal closeHandler={this.closeModal}>
            <ItemCard
              item={this.state.itemsData[this.state.itemModalIdx]}
              isFullInfo={true}
              onClick={() => {}}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default Main;
