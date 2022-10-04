import React from 'react';
import ItemCard from './itemCard';
import { IItemData } from '../data/items';
import './itemsCardsList.css';

interface IItemsCardsListProps {
  heightOffset: string;
  baseImgUrl: string;
  items: IItemData[];
}

function ItemsCardsList({ heightOffset, baseImgUrl, items }: IItemsCardsListProps) {
  return (
    <section
      className="items-cards-list"
      style={{ height: `calc(100vh - (${heightOffset}))` }}
      data-testid="items-cards-list"
    >
      {items.map((item) => {
        return (
          <ItemCard
            key={item.id}
            title={item.title}
            imgUrl={baseImgUrl + item.poster_path}
            overview={item.overview}
            popularity={item.popularity.toString()}
            vote_average={item.vote_average.toFixed(1)}
            vote_count={item.vote_count.toString()}
            release_date={item.release_date}
          />
        );
      })}
    </section>
  );
}

export default ItemsCardsList;
