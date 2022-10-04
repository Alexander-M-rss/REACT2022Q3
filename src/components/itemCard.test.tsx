import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemCard from './itemCard';
import itemsData, { BASE_IMG_URL } from '../data/items';

describe('ItemCard', () => {
  it('renders component', () => {
    const item = itemsData[0];
    render(
      <ItemCard
        key={item.id}
        title={item.title}
        imgUrl={BASE_IMG_URL + item.poster_path}
        overview={item.overview}
        popularity={item.popularity.toString()}
        vote_average={item.vote_average.toFixed(1)}
        vote_count={item.vote_count.toString()}
        release_date={item.release_date}
      />
    );

    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(item.overview)).toBeInTheDocument();
    expect(screen.getByText(item.popularity.toString())).toBeInTheDocument();
    expect(screen.getAllByText(item.vote_average.toFixed(1)).length).toBe(2);
    expect(screen.getByText(new RegExp(item.vote_count.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(item.release_date)).toBeInTheDocument();
  });
});
