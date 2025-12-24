import api from '../../../services/api';

export const workerAPI = {
  getByType: (type) => api.get(`/users/type/${type}`),
  getNearbyWorkers: (lat, lng, radius = 10) =>
    api.get(`/users/workers/nearby?latitude=${lat}&longitude=${lng}&radius=${radius}`),
  getWorkersBySkill: (skill) => api.get(`/users/workers/skill/${skill}`),
  getSeasonalWorkers: () => api.get('/users/workers/seasonal'),
};

export default workerAPI;
