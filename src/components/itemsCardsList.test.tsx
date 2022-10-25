import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemsCardsList from './itemsCardsList';
import itemsData from '../data/items';
import userEvent from '@testing-library/user-event';

const onClickHendler = jest.fn();

describe('ItemsCardsList', () => {
  it('renders component with cards', () => {
    render(<ItemsCardsList items={itemsData} errMsg="error Message" onClick={onClickHendler} />);
    expect(screen.getAllByRole('heading').length).toBe(itemsData.length);
    expect(screen.queryAllByText('error Message')).not.toBeInTheDocument;
  });
  it('renders component with error message', () => {
    render(<ItemsCardsList items={[]} errMsg="error Message" onClick={onClickHendler} />);
    expect(screen.queryAllByRole('heading').length).toBe(0);
    expect(screen.findByText('error Message')).toBeInTheDocument;
  });
  it('calls onClick handler', () => {
    render(<ItemsCardsList items={itemsData} errMsg="error Message" onClick={onClickHendler} />);
    const names = screen.getAllByRole('heading');
    names.forEach((el) => userEvent.click(el));
    expect(onClickHendler).toBeCalledTimes(names.length);
  });
});
