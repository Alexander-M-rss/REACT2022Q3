import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemCard, { valueNamesFullCard } from './itemCard';
import { testItem } from 'data/items';

describe('ItemCard', () => {
  it('renders component', () => {
    render(<ItemCard itemIdx={'indexValue'} item={testItem} isMoreInfo={true} />);
    expect(screen.getByText(new RegExp(testItem.name.toString()))).toBeInTheDocument();
    valueNamesFullCard.forEach((valueName) =>
      expect(screen.getByText(new RegExp(testItem[valueName].toString()))).toBeInTheDocument()
    );
    expect(screen.getByText(/More info/)).toBeInTheDocument();
  });
});
