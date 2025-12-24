import { useState, useCallback } from 'react';
import { enhancedJobAPI as jobAPI } from '../services/jobService';

export const useJob = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchJob = useCallback(async (id) => {
    setLoading(true);
    setError('');
    try {
      const response = await jobAPI.getById(id);
      setJob(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch job details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const applyForJob = useCallback(async (id) => {
    setSubmitting(true);
    try {
      const response = await jobAPI.apply(id);
      // Refresh job data if needed or just return success
      await fetchJob(id);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to apply for job';
      throw new Error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [fetchJob]);

  const updateJobStatus = useCallback(async (id, status) => {
    setSubmitting(true);
    try {
      const response = await jobAPI.updateStatus(id, status);
      await fetchJob(id);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to update job status';
      throw new Error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [fetchJob]);

  return {
    job,
    loading,
    error,
    submitting,
    fetchJob,
    applyForJob,
    updateJobStatus,
    setJob
  };
};

export default useJob;
