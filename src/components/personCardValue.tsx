import React from 'react';
import './personCardValue.css';

interface IPersonCardValueProps {
  name: string;
  value: string;
}

function PersonCardValue({ name, value }: IPersonCardValueProps) {
  return (
    <div className="person-card-value">
      <span>{name}:</span>
      <span className="person-card-value__value">{value}</span>
    </div>
  );
}

export default PersonCardValue;
