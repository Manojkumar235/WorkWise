import React from 'react';
import './LoadingSpinner.css';

/**
 * Reusable loading spinner with different sizes
 */
const LoadingSpinner = ({ size = 'medium', text = '' }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="loading-spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
