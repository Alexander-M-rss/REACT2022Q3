import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemCard, { valueNamesFullCard, valueNamesShortCard } from './itemCard';
import { testItem } from 'data/items';
import userEvent from '@testing-library/user-event';

const onClickHendler = jest.fn();

describe('ItemCard', () => {
  it('renders full component', () => {
    render(
      <ItemCard itemIdx={'indexValue'} item={testItem} isFullInfo={true} onClick={onClickHendler} />
    );
    expect(screen.getByText(new RegExp(testItem.name.toString()))).toBeInTheDocument();
    valueNamesFullCard.forEach((valueName) =>
      expect(screen.getByText(new RegExp(testItem[valueName].toString()))).toBeInTheDocument()
    );
    expect(screen.getByText(/More info/)).toBeInTheDocument();
  });
  it('renders short component', () => {
    render(
      <ItemCard
        itemIdx={'indexValue'}
        item={testItem}
        isFullInfo={false}
        onClick={onClickHendler}
      />
    );
    expect(screen.getByText(new RegExp(testItem.name.toString()))).toBeInTheDocument();
    valueNamesShortCard.forEach((valueName) =>
      expect(screen.getByText(new RegExp(testItem[valueName].toString()))).toBeInTheDocument()
    );
    valueNamesFullCard
      .filter((x) => !valueNamesShortCard.includes(x))
      .forEach((valueName) =>
        expect(
          screen.queryByText(new RegExp(testItem[valueName].toString()))
        ).not.toBeInTheDocument()
      );
    expect(screen.queryByText(/More info/)).not.toBeInTheDocument();
  });
  it('checks short card onClick handler call count', () => {
    render(
      <ItemCard
        itemIdx={'indexValue'}
        item={testItem}
        isFullInfo={false}
        onClick={onClickHendler}
      />
    );
    const name = screen.getByText(new RegExp(testItem.name.toString()));
    userEvent.click(name);
    userEvent.click(name);
    expect(onClickHendler).toBeCalledTimes(2);
  });
  it('checks full card onClick handler call count', () => {
    render(
      <ItemCard itemIdx={'indexValue'} item={testItem} isFullInfo={true} onClick={onClickHendler} />
    );
    const name = screen.getByText(new RegExp(testItem.name.toString()));
    userEvent.click(name);
    userEvent.click(name);
    expect(onClickHendler).toBeCalledTimes(2);
  });
});
