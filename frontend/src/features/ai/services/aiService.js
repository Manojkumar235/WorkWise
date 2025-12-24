import api from '../../../services/api';

export const aiAPI = {
  getRecommendations: () => api.get('/matching/recommendations'),
  getWorkersForJob: (jobId) => api.get(`/matching/job/${jobId}/workers`),
  getRecommendationsForWorker: (workerId) => api.get(`/matching/worker/${workerId}/recommendations`),
};

export default aiAPI;
