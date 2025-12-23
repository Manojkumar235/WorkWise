import React from 'react';
import './ErrorMessage.css';

/**
 * Reusable error message component
 * Shows different UI for network vs server errors
 */
const ErrorMessage = ({ error, onRetry, type = 'inline' }) => {
  const isNetworkError = error?.isNetworkError || error?.message?.includes('Network');
  const isServerError = error?.isServerError || error?.response?.status >= 500;

  const getErrorMessage = () => {
    if (isNetworkError) {
      return 'No internet connection. Check your network and try again.';
    }
    if (isServerError) {
      return 'Server error. Our team has been notified. Please try again later.';
    }
    return error?.response?.data?.error || error?.message || 'Something went wrong';
  };

  const getIcon = () => {
    if (isNetworkError) return '📡';
    if (isServerError) return '🔧';
    return '⚠️';
  };

  return (
    <div className={`error-message ${type}`}>
      <div className="error-icon">{getIcon()}</div>
      <div className="error-content">
        <p className="error-text">{getErrorMessage()}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
