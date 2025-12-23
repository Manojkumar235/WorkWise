import React, { useState, useEffect } from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { useToast } from '../../../context/ToastContext';
import jobAPI from '../../jobs/services/jobService';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import EmptyState from '../../../shared/components/EmptyState';

const JobRecommendations = ({ user }) => {
  const { recommendations, loading, fetchRecommendations } = useRecommendations();
  const toast = useToast();
  const [applyingJobId, setApplyingJobId] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const applyForJob = async (jobId) => {
    setApplyingJobId(jobId);
    try {
      const response = await jobAPI.apply(jobId);
      toast.success(response.data.message || 'Application submitted successfully!');
      fetchRecommendations();
    } catch (error) {
      if (error.isNetworkError) {
        toast.error('No internet connection. Please try again.');
      } else {
        toast.error(error.response?.data?.error || 'Failed to apply for job');
      }
    } finally {
      setApplyingJobId(null);
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 0.8) return '#4CAF50';
    if (score >= 0.6) return '#FF9800';
    return '#2196F3';
  };

  const getMatchScoreLabel = (score) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    if (score >= 0.4) return 'Fair Match';
    return 'Basic Match';
  };

  if (loading) {
    return <LoadingSpinner size="large" text="🤖 AI is finding the best jobs for you..." />;
  }

  if (recommendations.length === 0) {
    return (
      <EmptyState
        icon="🎯"
        title="No Recommendations Yet"
        message="Update your skills and location to get personalized job recommendations"
        actionText="Refresh Recommendations"
        onAction={fetchRecommendations}
      />
    );
  }

  return (
    <div className="job-recommendations">
      <div className="recommendations-header">
        <div className="header-content">
          <h2>🤖 AI-Powered Job Recommendations</h2>
          <p>Jobs matched specifically for your skills and location</p>
        </div>
        <button className="btn-refresh" onClick={fetchRecommendations}>
          🔄 Refresh
        </button>
      </div>

      <div className="recommendations-stats">
        <div className="stat-item">
          <span className="stat-number">{recommendations.length}</span>
          <span className="stat-label">Jobs Found</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {recommendations.filter(r => r.matchScore >= 0.8).length}
          </span>
          <span className="stat-label">Excellent Matches</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {recommendations.filter(r => r.distance <= 10).length}
          </span>
          <span className="stat-label">Within 10km</span>
        </div>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((rec, index) => (
          <div key={rec.jobId} className="recommendation-card">
            <div className="recommendation-header">
              <div className="job-info">
                <h3 className="job-title">{rec.jobTitle}</h3>
                <div className="match-info">
                  <div
                    className="match-score"
                    style={{ backgroundColor: getMatchScoreColor(rec.matchScore) }}
                  >
                    {Math.round(rec.matchScore * 100)}% Match
                  </div>
                  <span className="match-label">
                    {getMatchScoreLabel(rec.matchScore)}
                  </span>
                </div>
              </div>
              <div className="recommendation-rank">
                #{index + 1}
              </div>
            </div>

            <div className="distance-info">
              <span className="distance-icon">📍</span>
              <span>{rec.distance.toFixed(1)}km away</span>
            </div>

            <div className="match-reasons">
              <h4>Why this job is perfect for you:</h4>
              <ul className="reasons-list">
                {Object.entries(rec.reasons).map(([key, reason]) => (
                  <li key={key} className="reason-item">
                    <span className="reason-icon">{getReasonIcon(key)}</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="recommendation-actions">
              <button
                className="btn-apply-now"
                onClick={() => applyForJob(rec.jobId)}
                disabled={applyingJobId === rec.jobId}
              >
                {applyingJobId === rec.jobId ? 'Applying...' : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-insights">
        <div className="insights-card">
          <h3>💡 AI Insights</h3>
          <div className="insights-content">
            <div className="insight-item">
              <span className="insight-icon">🎯</span>
              <div>
                <strong>Best Match:</strong> {recommendations[0]?.jobTitle}
                <p>This job matches {Math.round(recommendations[0]?.matchScore * 100)}% of your profile</p>
              </div>
            </div>

            <div className="insight-item">
              <span className="insight-icon">📍</span>
              <div>
                <strong>Nearest Opportunity:</strong>
                {(() => {
                  const nearest = recommendations.reduce((min, curr) =>
                    curr.distance < min.distance ? curr : min, recommendations[0]);
                  return ` ${nearest.distance.toFixed(1)}km away`;
                })()}
              </div>
            </div>

            <div className="insight-item">
              <span className="insight-icon">💡</span>
              <div>
                <strong>Tip:</strong> Jobs with 80%+ match have 3x higher success rates
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function getReasonIcon(reasonKey) {
    const icons = {
      skillMatch: '🛠️',
      proximity: '📍',
      goodPay: '💰',
      urgent: '⚡',
      experience: '⭐'
    };
    return icons[reasonKey] || '✨';
  }
};

export default JobRecommendations;
