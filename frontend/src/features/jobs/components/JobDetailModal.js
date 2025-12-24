import React, { useState, useEffect } from 'react';
import { useJob } from '../hooks/useJob';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import RatingModal from '../../ratings/components/RatingModal';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const JobDetailModal = ({ jobId, onClose, onJobUpdated }) => {
  const {
    job,
    loading,
    error,
    submitting,
    fetchJob,
    applyForJob,
    updateJobStatus
  } = useJob();

  const [showRatingModal, setShowRatingModal] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    fetchJob(jobId).catch(() => {});
  }, [jobId, fetchJob]);

  const handleApply = async () => {
    if (!user) {
      toast.error('Please login to apply for jobs');
      return;
    }

    if (user.userType === 'HIRER') {
      toast.error('Hirers cannot apply for jobs');
      return;
    }

    try {
      const result = await applyForJob(jobId);
      toast.success(result.message || 'Successfully applied for job!');
      if (onJobUpdated) onJobUpdated();
    } catch (err) {
      if (err.isNetworkError) {
        toast.error('No internet connection. Please try again.');
      } else {
        toast.error(err.message || 'Failed to apply for job');
      }
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);
      toast.success('Job status updated successfully');
      if (onJobUpdated) onJobUpdated();
    } catch (err) {
      if (err.isNetworkError) {
        toast.error('No internet connection. Please try again.');
      } else {
        toast.error(err.message || 'Failed to update job status');
      }
    }
  };

  const formatPrice = (price, paymentType) => {
    if (!price) return 'Price not specified';
    const paymentLabel = paymentType ? paymentType.toLowerCase().replace(/_/g, ' ') : '';
    return `₹${price.toLocaleString()}${paymentLabel ? ` per ${paymentLabel}` : ''}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      POSTED: '#4CAF50',
      APPLICATIONS_RECEIVED: '#FF9800',
      WORKER_ASSIGNED: '#2196F3',
      IN_PROGRESS: '#2196F3',
      COMPLETED: '#9C27B0',
      CANCELLED: '#f44336',
      PAYMENT_PENDING: '#FF9800',
      PAYMENT_COMPLETED: '#4CAF50',
      DISPUTED: '#f44336'
    };
    return colors[status] || '#666';
  };

  const isWorker = user && (user.userType === 'WORKER' || user.userType === 'BOTH');
  const isJobOwner = user && job && user.userId === job.hirer?.id;
  const canApply = isWorker && job && job.status === 'POSTED' && !job.assignedWorker;
  const canRate = isJobOwner && job && job.status === 'COMPLETED' && job.assignedWorker;

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="job-detail-modal">
          <LoadingSpinner size="medium" text="Loading job details..." />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="job-detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-error">
            <p>{error || 'Job not found'}</p>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="job-detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{job.title}</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="modal-content">
            {/* Job Status Badge */}
            <div className="job-status-badge" style={{ backgroundColor: getStatusColor(job.status) }}>
              {job.status?.replace(/_/g, ' ')}
            </div>

            {/* Basic Information */}
            <div className="job-detail-section">
              <h3>Job Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{job.skillCategory?.replace(/_/g, ' ')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Skill Required:</span>
                  <span className="detail-value">{job.skillRequired}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{formatPrice(job.offeredPrice, job.paymentType)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Workers Needed:</span>
                  <span className="detail-value">{job.workersNeeded}</span>
                </div>
                {job.estimatedHours && (
                  <div className="detail-item">
                    <span className="detail-label">Estimated Hours:</span>
                    <span className="detail-value">{job.estimatedHours} hours</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {job.description && (
              <div className="job-detail-section">
                <h3>Description</h3>
                <p className="job-description-text">{job.description}</p>
              </div>
            )}

            {/* Location */}
            <div className="job-detail-section">
              <h3>Location</h3>
              <div className="location-info">
                <span className="location-icon">📍</span>
                <div>
                  <p>{job.address}</p>
                  <p>{job.city}, {job.state} {job.pincode}</p>
                  {job.latitude && job.longitude && (
                    <small>Coordinates: {job.latitude.toFixed(4)}, {job.longitude.toFixed(4)}</small>
                  )}
                </div>
              </div>
            </div>

            {/* Timing */}
            {(job.startDate || job.endDate) && (
              <div className="job-detail-section">
                <h3>Schedule</h3>
                <div className="timing-info">
                  {job.startDate && (
                    <div className="timing-item">
                      <span className="timing-label">Start:</span>
                      <span>{new Date(job.startDate).toLocaleString()}</span>
                    </div>
                  )}
                  {job.endDate && (
                    <div className="timing-item">
                      <span className="timing-label">End:</span>
                      <span>{new Date(job.endDate).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Agricultural Specific Info */}
            {job.cropType && (
              <div className="job-detail-section agricultural-info-section">
                <h3>🌾 Agricultural Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Crop Type:</span>
                    <span className="detail-value">{job.cropType}</span>
                  </div>
                  {job.areaSize && (
                    <div className="detail-item">
                      <span className="detail-label">Area Size:</span>
                      <span className="detail-value">{job.areaSize} acres</span>
                    </div>
                  )}
                  {job.weatherDependency && (
                    <div className="detail-item">
                      <span className="detail-label">Weather Dependent:</span>
                      <span className="detail-value">Yes</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Perks */}
            {(job.toolsProvided || job.foodProvided || job.accommodationProvided) && (
              <div className="job-detail-section">
                <h3>Perks & Benefits</h3>
                <div className="perks-list">
                  {job.toolsProvided && <span className="perk-badge">🔧 Tools Provided</span>}
                  {job.foodProvided && <span className="perk-badge">🍽️ Food Provided</span>}
                  {job.accommodationProvided && <span className="perk-badge">🏠 Accommodation Provided</span>}
                </div>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="job-detail-section">
                <h3>Special Requirements</h3>
                <p className="requirements-text">{job.requirements}</p>
              </div>
            )}

            {/* Assigned Worker (for hirers) */}
            {isJobOwner && job.assignedWorker && (
              <div className="job-detail-section">
                <h3>Assigned Worker</h3>
                <div className="worker-info-card">
                  <div className="worker-basic-info">
                    <h4>{job.assignedWorker.name}</h4>
                    <p>{job.assignedWorker.email}</p>
                    {job.assignedWorker.phoneNumber && (
                      <p>📞 {job.assignedWorker.phoneNumber}</p>
                    )}
                    {job.assignedWorker.city && (
                      <p>📍 {job.assignedWorker.city}, {job.assignedWorker.state}</p>
                    )}
                    {job.assignedWorker.trustScore && (
                      <p>⭐ Trust Score: {job.assignedWorker.trustScore}/5.0</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Job Timeline */}
            <div className="job-detail-section">
              <h3>Job Timeline</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <span className="timeline-date">{new Date(job.createdAt).toLocaleDateString()}</span>
                  <span className="timeline-event">Job Posted</span>
                </div>
                {job.assignedWorker && (
                  <div className="timeline-item">
                    <span className="timeline-date">
                      {job.status === 'WORKER_ASSIGNED' || job.status === 'IN_PROGRESS' || job.status === 'COMPLETED' 
                        ? 'Assigned' 
                        : 'Pending'}
                    </span>
                    <span className="timeline-event">Worker Assigned</span>
                  </div>
                )}
                {job.status === 'COMPLETED' && (
                  <div className="timeline-item">
                    <span className="timeline-date">
                      {job.completedAt ? new Date(job.completedAt).toLocaleDateString() : 'Completed'}
                    </span>
                    <span className="timeline-event">Work Completed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              {canApply && (
                <button 
                  className="btn-primary" 
                  onClick={handleApply}
                  disabled={submitting}
                >
                  {submitting ? 'Applying...' : 'Apply Now'}
                </button>
              )}

              {isJobOwner && job.status === 'POSTED' && (
                <button 
                  className="btn-secondary"
                  onClick={() => handleStatusUpdate('CANCELLED')}
                >
                  Cancel Job
                </button>
              )}

              {isJobOwner && job.status === 'WORKER_ASSIGNED' && (
                <button 
                  className="btn-primary"
                  onClick={() => handleStatusUpdate('IN_PROGRESS')}
                >
                  Mark as In Progress
                </button>
              )}

              {isJobOwner && job.status === 'IN_PROGRESS' && (
                <button 
                  className="btn-primary"
                  onClick={() => handleStatusUpdate('COMPLETED')}
                >
                  Mark as Completed
                </button>
              )}

              {canRate && (
                <button 
                  className="btn-primary"
                  onClick={() => setShowRatingModal(true)}
                >
                  Rate Worker
                </button>
              )}

              <button className="btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRatingModal && job.assignedWorker && (
        <RatingModal
          job={job}
          ratedUser={job.assignedWorker}
          onClose={() => setShowRatingModal(false)}
          onRatingSubmitted={() => {
            setShowRatingModal(false);
            fetchJob(jobId);
            toast.success('Rating submitted successfully');
            if (onJobUpdated) onJobUpdated();
          }}
        />
      )}
    </>
  );
};

export default JobDetailModal;

