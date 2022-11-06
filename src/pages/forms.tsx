import React, { useState } from 'react';
import Header, { links } from 'components/header';
import Form from 'components/form';
import PersonCard, { IPersonCardProps } from 'components/personCard';
import PopupMsg from 'components/popupMsg';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { savePersonCard } from 'store/stateSlice';

function Forms() {
  const [isPopupMsgShown, setIsPopupMsgShown] = useState(false);
  const personCards = useAppSelector((store) => store.state.personCards);
  const dispatch = useAppDispatch();

  const addPersonCard = (personCard: IPersonCardProps) => {
    dispatch(savePersonCard(personCard));
    setIsPopupMsgShown(true);
  };

  const closePopupMsg = () => {
    setIsPopupMsgShown(false);
  };

  return (
    <>
      <Header title="Forms Page" links={[links.main, links.about]} />
      <Form addPersonCard={addPersonCard} />
      {personCards.map((card, i) => {
        return (
          <PersonCard
            key={card.name + card.surname + card.birthday + card.country + +i}
            name={card.name}
            surname={card.surname}
            birthday={card.birthday}
            gender={card.gender}
            country={card.country}
            picture={card.picture}
          />
        );
      })}
      {isPopupMsgShown && (
        <PopupMsg text="Successfully added!" timeout={1500} closeHandler={closePopupMsg} />
      )}
    </>
  );
}

export default Forms;
