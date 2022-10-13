import React from 'react';
import Header, { links } from '../components/header';
import Form from 'components/form';
import PersonCard, { IPersonCardProps } from '../components/personCard';
import PopupMsg from 'components/popupMsg';

interface IFormsState {
  isPopupMsgShown: boolean;
  personCards: IPersonCardProps[];
}

class Forms extends React.Component<unknown, IFormsState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      isPopupMsgShown: false,
      personCards: [],
    };
  }

  addPersonCard = (personCard: IPersonCardProps) => {
    this.setState((prevState) => {
      const personCards = prevState.personCards.slice();

      personCards.push(personCard);
      return { isPopupMsgShown: true, personCards: personCards };
    });
  };

  closePopupMsg = () => {
    this.setState({ isPopupMsgShown: false });
  };

  render() {
    return (
      <>
        <Header title="Forms Page" links={[links.main, links.about]} />
        <Form addPersonCard={this.addPersonCard} />
        {this.state.personCards.map((card, i) => {
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
        {this.state.isPopupMsgShown && (
          <PopupMsg text="Successfully added!" timeout={1500} closeHandler={this.closePopupMsg} />
        )}
      </>
    );
  }
}

export default Forms;
