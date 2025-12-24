import api from '../../../services/api';

export const jobAPI = {
  create: (jobData) => api.post('/jobs/create', jobData),
  getAll: () => api.get('/jobs/all'),
  getById: (id) => api.get(`/jobs/${id}`),
  getByStatus: (status) => api.get(`/jobs/status/${status}`),
  getNearbyJobs: (lat, lng, radius = 10) =>
    api.get(`/jobs/nearby?latitude=${lat}&longitude=${lng}&radius=${radius}`),
  getBySkill: (skill) => api.get(`/jobs/skill/${skill}`),
  getAgriculturalJobs: () => api.get('/jobs/agricultural'),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  getStats: () => api.get('/jobs/count'),
};

export const enhancedJobAPI = {
  ...jobAPI,
  apply: (jobId) => api.put(`/jobs/${jobId}/apply`),
  updateStatus: (jobId, status) => api.put(`/jobs/${jobId}/status`, { status }),
  getMyJobs: () => api.get('/jobs/my-jobs'),
  getAssignedJobs: () => api.get('/jobs/assigned-to-me'),
  searchAdvanced: (filters) => {
    const params = new URLSearchParams(filters);
    return api.get(`/jobs/search?${params}`);
  },
};

export default enhancedJobAPI;
