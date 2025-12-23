import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJob } from '../../features/jobs/hooks/useJob';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import RatingModal from '../../features/ratings/components/RatingModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorMessage from '../../shared/components/ErrorMessage';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
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

  useEffect(() => {
    if (id) {
      fetchJob(id).catch(() => {});
    }
  }, [id, fetchJob]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType === 'HIRER') {
      toast.error('Hirers cannot apply for jobs');
      return;
    }

    try {
      const result = await applyForJob(id);
      toast.success(result.message || 'Successfully applied for job!');
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
      await updateJobStatus(id, newStatus);
      toast.success('Job status updated successfully');
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

  if (loading) {
    return (
      <div className="dashboard-page">
        <LoadingSpinner size="large" text="Loading job details..." />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="dashboard-page">
        <ErrorMessage
          error={error || { message: 'Job not found' }}
          onRetry={() => fetchJob(id)}
          type="fullpage"
        />
        <button className="btn-primary" onClick={() => navigate(-1)} style={{marginTop: '1rem'}}>
          Go Back
        </button>
      </div>
    );
  }

  const isWorker = user && (user.userType === 'WORKER' || user.userType === 'BOTH');
  const isJobOwner = user && job && user.userId === job.hirer?.id;
  const canApply = isWorker && job && job.status === 'POSTED' && !job.assignedWorker;
  const canRate = isJobOwner && job && job.status === 'COMPLETED' && job.assignedWorker;

  return (
    <>
      <div className="dashboard-page">
        <header className="page-header">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
          <h1>{job.title}</h1>
          <div className="job-status-badge-large" style={{ backgroundColor: getStatusColor(job.status) }}>
            {job.status?.replace(/_/g, ' ')}
          </div>
        </header>

        <div className="job-detail-page-content">
          <div className="job-detail-main">
            {/* Basic Information */}
            <div className="job-detail-card">
              <h2>Job Details</h2>
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
              <div className="job-detail-card">
                <h2>Description</h2>
                <p className="job-description-text">{job.description}</p>
              </div>
            )}

            {/* Location */}
            <div className="job-detail-card">
              <h2>Location</h2>
              <div className="location-info">
                <span className="location-icon">📍</span>
                <div>
                  <p><strong>{job.address}</strong></p>
                  <p>{job.city}, {job.state} {job.pincode}</p>
                  {job.latitude && job.longitude && (
                    <small>Coordinates: {job.latitude.toFixed(4)}, {job.longitude.toFixed(4)}</small>
                  )}
                </div>
              </div>
            </div>

            {/* Timing */}
            {(job.startDate || job.endDate) && (
              <div className="job-detail-card">
                <h2>Schedule</h2>
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
              <div className="job-detail-card agricultural-info-section">
                <h2>🌾 Agricultural Details</h2>
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
              <div className="job-detail-card">
                <h2>Perks & Benefits</h2>
                <div className="perks-list">
                  {job.toolsProvided && <span className="perk-badge">🔧 Tools Provided</span>}
                  {job.foodProvided && <span className="perk-badge">🍽️ Food Provided</span>}
                  {job.accommodationProvided && <span className="perk-badge">🏠 Accommodation Provided</span>}
                </div>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="job-detail-card">
                <h2>Special Requirements</h2>
                <p className="requirements-text">{job.requirements}</p>
              </div>
            )}

            {/* Assigned Worker (for hirers) */}
            {isJobOwner && job.assignedWorker && (
              <div className="job-detail-card">
                <h2>Assigned Worker</h2>
                <div className="worker-info-card">
                  <div className="worker-basic-info">
                    <h3>{job.assignedWorker.name}</h3>
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
            <div className="job-detail-card">
              <h2>Job Timeline</h2>
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
          </div>

          {/* Sidebar Actions */}
          <div className="job-detail-sidebar">
            <div className="action-card">
              <h3>Actions</h3>
              {canApply && (
                <button
                  className="btn-primary full-width"
                  onClick={handleApply}
                  disabled={submitting}
                >
                  {submitting ? 'Applying...' : 'Apply Now'}
                </button>
              )}

              {isJobOwner && job.status === 'POSTED' && (
                <button
                  className="btn-secondary full-width"
                  onClick={() => handleStatusUpdate('CANCELLED')}
                  disabled={submitting}
                >
                  {submitting ? 'Cancelling...' : 'Cancel Job'}
                </button>
              )}

              {isJobOwner && job.status === 'WORKER_ASSIGNED' && (
                <button
                  className="btn-primary full-width"
                  onClick={() => handleStatusUpdate('IN_PROGRESS')}
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Mark as In Progress'}
                </button>
              )}

              {isJobOwner && job.status === 'IN_PROGRESS' && (
                <button
                  className="btn-primary full-width"
                  onClick={() => handleStatusUpdate('COMPLETED')}
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Mark as Completed'}
                </button>
              )}

              {canRate && (
                <button
                  className="btn-primary full-width"
                  onClick={() => setShowRatingModal(true)}
                  disabled={submitting}
                >
                  Rate Worker
                </button>
              )}
            </div>

            {/* Hirer Info */}
            {job.hirer && (
              <div className="hirer-info-card">
                <h3>Posted By</h3>
                <p><strong>{job.hirer.name}</strong></p>
                {job.hirer.city && (
                  <p>📍 {job.hirer.city}, {job.hirer.state}</p>
                )}
                {job.hirer.trustScore && (
                  <p>⭐ Trust Score: {job.hirer.trustScore}/5.0</p>
                )}
              </div>
            )}
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
            fetchJob(id);
            toast.success('Rating submitted successfully');
          }}
        />
      )}
    </>
  );
};

export default JobDetailPage;

