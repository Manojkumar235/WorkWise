import { useState, useCallback } from 'react';
import workerAPI from '../services/workerService';

export const useWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWorkersByType = useCallback(async (type = 'WORKER') => {
    setLoading(true);
    setError('');
    try {
      const response = await workerAPI.getByType(type);
      setWorkers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch workers');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchWorkersBySkill = useCallback(async (skill) => {
    setLoading(true);
    setError('');
    try {
      const response = await workerAPI.getWorkersBySkill(skill);
      setWorkers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to search workers');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNearbyWorkers = useCallback(async (lat, lng, radius = 10) => {
    setLoading(true);
    setError('');
    try {
      const response = await workerAPI.getNearbyWorkers(lat, lng, radius);
      setWorkers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch nearby workers');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    workers,
    loading,
    error,
    fetchWorkersByType,
    searchWorkersBySkill,
    fetchNearbyWorkers,
    setWorkers
  };
};

export default useWorkers;
