import React from 'react';
import './EmptyState.css';

/**
 * Reusable empty state component
 * Shows when lists/searches return no results
 */
const EmptyState = ({
  icon = '📭',
  title = 'No Results Found',
  message = '',
  actionText = '',
  onAction
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      {message && <p className="empty-message">{message}</p>}
      {actionText && onAction && (
        <button onClick={onAction} className="empty-action-btn">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
