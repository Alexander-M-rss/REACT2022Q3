import React from 'react';
import PersonCardValue from './personCardValue';
import './personCard.css';

export interface IPersonCardProps {
  name: string;
  surname: string;
  birthday: string;
  gender: string;
  country: string;
  profilePicture: string;
}

function PersonCard({
  name,
  surname,
  birthday,
  gender,
  country,
  profilePicture,
}: IPersonCardProps) {
  return (
    <div className="person-card">
      <PersonCardValue name="Name" value={name} />
      <PersonCardValue name="Surname" value={surname} />
      <PersonCardValue name="Birthday" value={birthday} />
      <PersonCardValue name="Gender" value={gender} />
      <PersonCardValue name="Country" value={country} />
      <PersonCardValue name="Profile picture" value={profilePicture} />
    </div>
  );
}

export default PersonCard;
