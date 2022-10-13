import React from 'react';
import Header, { links } from '../components/header';
import Form from 'components/form';
import PersonCard, { IPersonCardProps } from '../components/personCard';

interface IFormsState {
  personCards: IPersonCardProps[];
}

class Forms extends React.Component<unknown, IFormsState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      personCards: [],
    };
  }
  addPersonCard = (personCard: IPersonCardProps) => {
    this.setState((prevState) => {
      const personCards = prevState.personCards.slice();

      personCards.push(personCard);
      return { personCards: personCards };
    });
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
              profilePicture={card.profilePicture}
            />
          );
        })}
      </>
    );
  }
}

export default Forms;
