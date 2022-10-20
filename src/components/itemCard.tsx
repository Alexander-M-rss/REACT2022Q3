import React from 'react';
import './itemCard.css';
import { IItemData } from '../api/api';
import ItemCardValue from './itemCardValue';

type ItemCardKeys = keyof IItemData;
type ItemCardProps = {
  item: IItemData;
  itemIdx?: string;
  isFullInfo: boolean;
  onClick: (event: React.MouseEvent) => void;
};

export const valueNamesFullCard: ItemCardKeys[] = [
  'race',
  'gender',
  'birth',
  'height',
  'hair',
  'spouse',
  'realm',
  'death',
];

export const valueNamesShortCard: ItemCardKeys[] = ['race'];

function ItemCard({ item, itemIdx, isFullInfo, onClick }: ItemCardProps) {
  const valueNames = isFullInfo ? valueNamesFullCard : valueNamesShortCard;

  return (
    <div id={itemIdx} className="item-card" onClick={onClick} key={item._id}>
      <h2>{item.name}</h2>
      {valueNames
        .filter((valueName) => item[valueName as keyof IItemData])
        .map((valueName) => {
          const value = item[valueName as keyof IItemData];
          return <ItemCardValue key={valueName} valueName={valueName} value={value} />;
        })}
      {isFullInfo && (
        <a className="item-card__btn" href={item.wikiUrl} target="blank">
          More info
        </a>
      )}
    </div>
  );
}

export default ItemCard;
