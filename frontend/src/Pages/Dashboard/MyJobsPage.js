import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { enhancedJobAPI } from '../../features/jobs/services/jobService';
import JobDetailModal from '../../features/jobs/components/JobDetailModal';
import RatingModal from '../../features/ratings/components/RatingModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorMessage from '../../shared/components/ErrorMessage';
import EmptyState from '../../shared/components/EmptyState';

const MyJobsPage = () => {
    const [postedJobs, setPostedJobs] = useState([]);
    const [assignedJobs, setAssignedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('posted');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [jobToRate, setJobToRate] = useState(null);
    const [updatingJobId, setUpdatingJobId] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const isHirer = user && (user.userType === 'HIRER' || user.userType === 'BOTH');
    const isWorker = user && (user.userType === 'WORKER' || user.userType === 'BOTH');

    const fetchJobs = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            if (isHirer) {
                const response = await enhancedJobAPI.getMyJobs();
                setPostedJobs(Array.isArray(response.data) ? response.data : []);
            }

            if (isWorker) {
                const response = await enhancedJobAPI.getAssignedJobs();
                setAssignedJobs(Array.isArray(response.data) ? response.data : []);
            }
        } catch (err) {
            setError(err);
            if (!err.isNetworkError) {
                toast.error('Failed to fetch your jobs');
            }
        } finally {
            setLoading(false);
        }
    }, [user, isHirer, isWorker, toast]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleStatusUpdate = async (jobId, newStatus) => {
        setUpdatingJobId(jobId);
        try {
            await enhancedJobAPI.updateStatus(jobId, newStatus);
            toast.success('Job status updated successfully');
            fetchJobs();
        } catch (err) {
            if (err.isNetworkError) {
                toast.error('No internet connection. Please try again.');
            } else {
                toast.error(err.response?.data?.error || 'Failed to update job status');
            }
        } finally {
            setUpdatingJobId(null);
        }
    };

    const handleViewDetails = (jobId) => {
        setSelectedJobId(jobId);
    };

    const handleRateWorker = (job) => {
        if (job.assignedWorker) {
            setJobToRate(job);
            setShowRatingModal(true);
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

    const getTimeSince = (dateString) => {
        if (!dateString) return '';
        const now = new Date();
        const date = new Date(dateString);
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} weeks ago`;
    };

    const filterJobs = (jobs) => {
        if (statusFilter === 'all') return jobs;
        return jobs.filter(job => job.status === statusFilter);
    };

    const getFilteredJobs = () => {
        if (activeTab === 'posted') {
            return filterJobs(postedJobs);
        } else {
            return filterJobs(assignedJobs);
        }
    };

    const getStatusOptions = () => {
        const allStatuses = new Set();
        const jobs = activeTab === 'posted' ? postedJobs : assignedJobs;
        jobs.forEach(job => allStatuses.add(job.status));
        return ['all', ...Array.from(allStatuses)];
    };

    if (loading) {
        return (
            <div className="dashboard-page">
                <LoadingSpinner size="large" text="Loading your jobs..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <ErrorMessage error={error} onRetry={fetchJobs} type="fullpage" />
            </div>
        );
    }

    const filteredJobs = getFilteredJobs();
    const statusOptions = getStatusOptions();

    return (
        <>
            <div className="dashboard-page">
                <header className="page-header">
                    <h1>My Jobs</h1>
                    <p>Track the status of your posted and assigned jobs.</p>
                </header>

                {/* Tabs */}
                {(isHirer && isWorker) && (
                    <div className="tabs-container">
                        <button
                            className={`tab-button ${activeTab === 'posted' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('posted');
                                setStatusFilter('all');
                            }}
                        >
                            📝 Posted Jobs ({postedJobs.length})
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'assigned' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('assigned');
                                setStatusFilter('all');
                            }}
                        >
                            💼 Assigned Jobs ({assignedJobs.length})
                        </button>
                    </div>
                )}

                {/* Status Filter */}
                {filteredJobs.length > 0 && (
                    <div className="filter-container">
                        <label htmlFor="status-filter">Filter by Status:</label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="status-filter-select"
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {status === 'all' ? 'All Statuses' : status.replace(/_/g, ' ')}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Jobs List */}
                {filteredJobs.length === 0 ? (
                    <EmptyState
                        icon="📋"
                        title="No Jobs Found"
                        message={
                            activeTab === 'posted'
                                ? "You haven't posted any jobs yet. Post your first job to get started!"
                                : "You don't have any assigned jobs yet. Browse available jobs to apply."
                        }
                        actionText={activeTab === 'posted' && isHirer ? 'Post a Job' : activeTab === 'assigned' && isWorker ? 'Find Jobs' : ''}
                        onAction={
                            activeTab === 'posted' && isHirer
                                ? () => navigate('/dashboard/post-job')
                                : activeTab === 'assigned' && isWorker
                                ? () => navigate('/dashboard/find-jobs')
                                : undefined
                        }
                    />
                ) : (
                    <div className="my-jobs-grid">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="my-job-card">
                                <div className="job-card-header">
                                    <div>
                                        <h3 className="job-card-title">{job.title}</h3>
                                        <div className="job-card-meta">
                                            <span className="job-category">{job.skillCategory?.replace(/_/g, ' ')}</span>
                                            <span className="job-price">{formatPrice(job.offeredPrice, job.paymentType)}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="job-status-badge-small"
                                        style={{ backgroundColor: getStatusColor(job.status) }}
                                    >
                                        {job.status?.replace(/_/g, ' ')}
                                    </div>
                                </div>

                                <div className="job-card-body">
                                    <div className="job-card-info">
                                        <div className="info-row">
                                            <span className="info-icon">📍</span>
                                            <span>{job.city}, {job.state}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-icon">🛠️</span>
                                            <span>{job.skillRequired}</span>
                                        </div>
                                        {job.assignedWorker && activeTab === 'posted' && (
                                            <div className="info-row">
                                                <span className="info-icon">👤</span>
                                                <span>Worker: {job.assignedWorker.name}</span>
                                            </div>
                                        )}
                                        {job.hirer && activeTab === 'assigned' && (
                                            <div className="info-row">
                                                <span className="info-icon">👤</span>
                                                <span>Posted by: {job.hirer.name}</span>
                                            </div>
                                        )}
                                        <div className="info-row">
                                            <span className="info-icon">📅</span>
                                            <span>Posted {getTimeSince(job.createdAt)}</span>
                                        </div>
                                    </div>

                                    {job.description && (
                                        <p className="job-card-description">
                                            {job.description.length > 150
                                                ? `${job.description.substring(0, 150)}...`
                                                : job.description}
                                        </p>
                                    )}
                                </div>

                                <div className="job-card-actions">
                                    <button
                                        className="btn-view-details"
                                        onClick={() => handleViewDetails(job.id)}
                                    >
                                        View Details
                                    </button>

                                    {activeTab === 'posted' && isHirer && (
                                        <>
                                            {job.status === 'POSTED' && (
                                                <button
                                                    className="btn-secondary-small"
                                                    onClick={() => handleStatusUpdate(job.id, 'CANCELLED')}
                                                    disabled={updatingJobId === job.id}
                                                >
                                                    {updatingJobId === job.id ? 'Updating...' : 'Cancel'}
                                                </button>
                                            )}
                                            {job.status === 'WORKER_ASSIGNED' && (
                                                <button
                                                    className="btn-primary-small"
                                                    onClick={() => handleStatusUpdate(job.id, 'IN_PROGRESS')}
                                                    disabled={updatingJobId === job.id}
                                                >
                                                    {updatingJobId === job.id ? 'Starting...' : 'Start Work'}
                                                </button>
                                            )}
                                            {job.status === 'IN_PROGRESS' && (
                                                <button
                                                    className="btn-primary-small"
                                                    onClick={() => handleStatusUpdate(job.id, 'COMPLETED')}
                                                    disabled={updatingJobId === job.id}
                                                >
                                                    {updatingJobId === job.id ? 'Updating...' : 'Mark Complete'}
                                                </button>
                                            )}
                                            {job.status === 'COMPLETED' && job.assignedWorker && (
                                                <button
                                                    className="btn-primary-small"
                                                    onClick={() => handleRateWorker(job)}
                                                >
                                                    Rate Worker
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary Stats */}
                {filteredJobs.length > 0 && (
                    <div className="jobs-summary">
                        <div className="summary-item">
                            <span className="summary-label">Total:</span>
                            <span className="summary-value">{filteredJobs.length}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Active:</span>
                            <span className="summary-value">
                                {filteredJobs.filter(j => ['POSTED', 'WORKER_ASSIGNED', 'IN_PROGRESS'].includes(j.status)).length}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Completed:</span>
                            <span className="summary-value">
                                {filteredJobs.filter(j => j.status === 'COMPLETED').length}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Job Detail Modal */}
            {selectedJobId && (
                <JobDetailModal
                    jobId={selectedJobId}
                    onClose={() => setSelectedJobId(null)}
                    onJobUpdated={fetchJobs}
                />
            )}

            {/* Rating Modal */}
            {showRatingModal && jobToRate && jobToRate.assignedWorker && (
                <RatingModal
                    job={jobToRate}
                    ratedUser={jobToRate.assignedWorker}
                    onClose={() => {
                        setShowRatingModal(false);
                        setJobToRate(null);
                    }}
                    onRatingSubmitted={() => {
                        setShowRatingModal(false);
                        setJobToRate(null);
                        fetchJobs();
                    }}
                />
            )}
        </>
    );
};

export default MyJobsPage;
