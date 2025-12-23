import { useState, useCallback } from 'react';
import jobAPI from '../services/jobService';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobAPI.getAll();
      setJobs(response.data.jobs || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchJobs = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobAPI.searchAdvanced(filters);
      setJobs(response.data.jobs || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNearbyJobs = useCallback(async (lat, lng, radius = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobAPI.getNearbyJobs(lat, lng, radius);
      setJobs(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchAllJobs,
    searchJobs,
    fetchNearbyJobs
  };
};

export default useJobs;
