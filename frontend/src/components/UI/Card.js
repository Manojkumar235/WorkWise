import React from 'react';
import './Card.css';

const Card = ({ className = '', children, ...props }) => {
  return (
    <div className={`ds-card${className ? ' ' + className : ''}`} {...props}>
      {children}
    </div>
  );
};

export default Card;

