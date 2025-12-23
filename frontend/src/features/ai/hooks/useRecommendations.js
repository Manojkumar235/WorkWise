import { useState, useCallback } from 'react';
import aiAPI from '../services/aiService';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await aiAPI.getRecommendations();
      setRecommendations(response.data.recommendations || []);
    } catch (err) {
      setError('Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations
  };
};

export default useRecommendations;
