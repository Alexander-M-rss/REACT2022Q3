import React from 'react';
import Header, { links } from '../components/header';
import SearchBar from '../components/searchBar';
import ItemsCardsList from '../components/itemsCardsList';
import { getItems, IItemData } from '../api/api';
import Modal, { OVERLAY_ID, CLOSE_ID } from 'components/modal';
import ItemCard from 'components/itemCard';
import DownloadIndicator from 'components/downloadIndicator';

interface IMainPageState {
  itemsData: IItemData[];
  isModalVisible: boolean;
  itemModalIdx: number;
  errMsg: string;
  isDataLoading: boolean;
}

class Main extends React.Component<unknown, IMainPageState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      itemsData: [],
      isModalVisible: false,
      itemModalIdx: 0,
      errMsg: '',
      isDataLoading: true,
    };
  }

  componentDidMount = () => {
    this.getItemsData('');
  };

  getItemsData = async (search: string) => {
    this.setState({ itemsData: [], isDataLoading: true });
    const data = await getItems(search);
    this.setState({ itemsData: data.items, errMsg: data.errMsg, isDataLoading: false });
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
        <SearchBar placeholder="Search" searchHandler={this.getItemsData} />
        {this.state.isDataLoading && <DownloadIndicator />}
        {!this.state.isDataLoading && (
          <ItemsCardsList
            items={this.state.itemsData}
            errMsg={this.state.errMsg}
            onClick={this.showModal}
          />
        )}
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
