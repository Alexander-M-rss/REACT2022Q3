import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemsCardsList from './itemsCardsList';
import itemsData from '../data/items';
import userEvent from '@testing-library/user-event';

const onClickHendler = jest.fn();

describe('ItemsCardsList', () => {
  it('renders component', () => {
    render(<ItemsCardsList items={itemsData} onClick={onClickHendler} />);
    expect(screen.getAllByRole('heading').length).toBe(itemsData.length);
  });
  it('calls onClick handler', () => {
    render(<ItemsCardsList items={itemsData} onClick={onClickHendler} />);
    const names = screen.getAllByRole('heading');
    names.forEach((el) => userEvent.click(el));
    expect(onClickHendler).toBeCalledTimes(names.length);
  });
});
