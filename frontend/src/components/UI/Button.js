import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  block = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`ds-btn ds-btn-${variant} ds-btn-${size}${block ? ' ds-btn-block' : ''}${className ? ' ' + className : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

