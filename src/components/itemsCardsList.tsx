import React from 'react';
import ItemCard from './itemCard';
import { IItemData } from '../data/items';
import './itemsCardsList.css';

interface IItemsCardsListProps {
  items: IItemData[];
  onClick: (event: React.MouseEvent) => void;
}

function ItemsCardsList({ items, onClick }: IItemsCardsListProps) {
  return (
    <section className="items-cards-list" data-testid="items-cards-list">
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
