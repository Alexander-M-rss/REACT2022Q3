import React from 'react';
import './itemCard.css';
import { IItemData } from 'data/items';
import ItemCardValue from './itemCardValue';

type ItemCardKeys = keyof IItemData;
type ItemCardProps = {
  item: IItemData;
  itemIdx: string;
  isMoreInfo: boolean;
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

const valueNamesShortCard: ItemCardKeys[] = ['race'];

function ItemCard({ item, itemIdx, isMoreInfo }: ItemCardProps) {
  const valueNames = isMoreInfo ? valueNamesFullCard : valueNamesShortCard;

  return (
    <div id={itemIdx} className="item-card">
      <h2>{item.name}</h2>
      {valueNames.map((valueName) => {
        const value = item[valueName as keyof IItemData];
        return (
          <>{value && <ItemCardValue key={valueName} valueName={valueName} value={value} />}</>
        );
      })}
      {isMoreInfo && (
        <a className="item-card__btn" href={item.wikiUrl} target="blank">
          More info
        </a>
      )}
    </div>
  );
}

export default ItemCard;
