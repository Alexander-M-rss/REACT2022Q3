import React from 'react';
import './itemCard.css';
import { IItemData } from 'data/items';
import ItemCardValue from './itemCardValue';

type ItemCardProps = { item: IItemData; itemIdx: string };

export const valueNames: Array<keyof IItemData> = [
  'race',
  'gender',
  'birth',
  'height',
  'hair',
  'spouse',
  'realm',
  'death',
];

function ItemCard({ item, itemIdx }: ItemCardProps) {
  return (
    <div id={itemIdx} className="item-card">
      <h2>{item.name}</h2>
      {valueNames.map((valueName) => {
        const value = item[valueName as keyof IItemData];
        return (
          <>{value && <ItemCardValue key={valueName} valueName={valueName} value={value} />}</>
        );
      })}
      <a className="item-card__btn" href={item.wikiUrl} target="blank">
        More info
      </a>
    </div>
  );
}

export default ItemCard;
