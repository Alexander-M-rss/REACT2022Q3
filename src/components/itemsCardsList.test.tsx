import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemsCardsList from './itemsCardsList';
import itemsData from '../data/items';

describe('ItemsCardsList', () => {
  it('renders component', () => {
    expect(itemsData.length).toBeGreaterThan(1);
    render(<ItemsCardsList items={itemsData} />);
    expect(screen.getAllByRole('heading').length).toBe(itemsData.length);
  });
});
