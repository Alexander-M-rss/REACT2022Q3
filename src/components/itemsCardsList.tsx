import React from 'react';
import ItemCard from './itemCard';
import { IItemData } from '../api/api';
import './itemsCardsList.css';

interface IItemsCardsListProps {
  items: IItemData[];
  errMsg: string;
  onClick: (event: React.MouseEvent) => void;
}

function ItemsCardsList({ items, errMsg, onClick }: IItemsCardsListProps) {
  return (
    <section className="items-cards-list" data-testid="items-cards-list">
      {!items.length && <div className="items-cards-list__err-msg">{errMsg}</div>}
      {items.map((item, idx) => {
        return (
          <ItemCard
            key={item._id}
            itemIdx={idx.toString()}
            item={item}
            isFullInfo={false}
            onClick={onClick}
          />
        );
      })}
    </section>
  );
}

export default ItemsCardsList;
