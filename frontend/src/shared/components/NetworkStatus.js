import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import './NetworkStatus.css';

/**
 * Global network status indicator
 * Shows offline warning and reconnection toast
 */
const NetworkStatus = () => {
  const { isOnline, wasOffline } = useNetworkStatus();

  if (isOnline && !wasOffline) {
    return null;
  }

  return (
    <>
      {!isOnline && (
        <div className="network-status offline">
          <span className="status-icon">📡</span>
          <span className="status-text">You are offline. Some features may not work.</span>
        </div>
      )}

      {isOnline && wasOffline && (
        <div className="network-status online">
          <span className="status-icon">✓</span>
          <span className="status-text">Back online</span>
        </div>
      )}
    </>
  );
};

export default NetworkStatus;
