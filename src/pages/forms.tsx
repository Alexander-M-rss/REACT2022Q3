import React, { useContext, useState } from 'react';
import Header, { links } from '../components/header';
import Form from 'components/form';
import PersonCard, { IPersonCardProps } from '../components/personCard';
import PopupMsg from 'components/popupMsg';
import GlobalStateContext from 'state/context';
import { ACTION } from 'state/reducer';

function Forms() {
  const [isPopupMsgShown, setIsPopupMsgShown] = useState(false);
  const { globalState, dispatch } = useContext(GlobalStateContext);

  const addPersonCard = (personCard: IPersonCardProps) => {
    dispatch({ type: ACTION.addPersonCard, payload: personCard });
    setIsPopupMsgShown(true);
  };

  const closePopupMsg = () => {
    setIsPopupMsgShown(false);
  };

  return (
    <>
      <Header title="Forms Page" links={[links.main, links.about]} />
      <Form addPersonCard={addPersonCard} />
      {globalState.personCards.map((card, i) => {
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
