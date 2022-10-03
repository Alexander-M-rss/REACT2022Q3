import React from 'react';
import './itemCard.css';

interface IItemCardProps {
  title: string;
  imgUrl: string;
  overview: string;
  popularity: string;
  vote_average: string;
  vote_count: string;
  release_date: string;
}

function ItemCard({
  title,
  imgUrl,
  overview,
  popularity,
  vote_average,
  vote_count,
  release_date,
}: IItemCardProps) {
  return (
    <div className="item-card__wrapper">
      <div className="item-card__img">
        <img src={imgUrl} alt={title} />
        <div className="item-card__overview">
          <h3>Overview:</h3>
          <span>{overview}</span>
        </div>
      </div>
      <h2>{title}</h2>
      <div className="item-card__info">
        <p>
          <span>Popularity:</span>
          <span> {popularity}</span>
        </p>
        <p>
          <span>Rating TMdB:</span>
          <span> {vote_average}</span>
          <span>/10.0 ({vote_count} votes)</span>
        </p>
        <p>
          <span>Date of release:</span>
          <span> {release_date}</span>
        </p>
      </div>
      <div className="item-card__rating">{vote_average}</div>
    </div>
  );
}

export default ItemCard;
