import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemsCardsList from './itemsCardsList';
import itemsData, { BASE_IMG_URL } from '../data/items';

describe('ItemsCardsList', () => {
  it('renders component', () => {
    expect(itemsData.length).toBeGreaterThan(1);
    render(<ItemsCardsList items={itemsData} baseImgUrl={BASE_IMG_URL} />);
    expect(screen.getAllByRole('img').length).toBe(itemsData.length);
    expect(screen.getAllByRole('heading').length).toBe(itemsData.length * 2);
  });
});
