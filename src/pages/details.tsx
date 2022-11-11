import React, { useEffect } from 'react';
import Header, { HEADER_HEIGHT } from '../components/header';
import ItemCard from 'components/itemCard';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { resetDetailsIdx } from 'store/stateSlice';
import './details.css';

function Details() {
  const { itemsData, detailsIdx } = useAppSelector((store) => store.state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(resetDetailsIdx());
    navigate('/');
  };

  useEffect(() => {
    if (detailsIdx < 0) {
      navigate('/');
    }
  }, [detailsIdx, navigate]);

  return (
    <>
      <Header title="Details" links={[]} />
      <div
        className="details"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT})`,
        }}
      >
        {itemsData && detailsIdx >= 0 && (
          <ItemCard item={itemsData[detailsIdx]} isFullInfo={true} onClick={() => {}} />
        )}
        <button className="details__back-btn" onClick={handleClick}>
          Back
        </button>
      </div>
    </>
  );
}

export default Details;
