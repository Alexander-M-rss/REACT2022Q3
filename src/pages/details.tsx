import React, { useContext, useEffect } from 'react';
import GlobalStateContext from 'state/context';
import Header, { HEADER_HEIGHT } from '../components/header';
import ItemCard from 'components/itemCard';
import { ACTION } from 'state/reducer';
import { useNavigate } from 'react-router-dom';
import './details.css';

function Details() {
  const {
    globalState: { itemsData, detailsIdx },
    dispatch,
  } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: ACTION.resetDetailsIdx });
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
