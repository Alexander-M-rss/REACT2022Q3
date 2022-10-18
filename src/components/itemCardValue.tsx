import React from 'react';

function ItemCardValue({ valueName, value }: { valueName: string; value: string }) {
  return (
    <p>
      <span>{valueName}: </span>
      <span> {value}</span>
    </p>
  );
}

export default ItemCardValue;
