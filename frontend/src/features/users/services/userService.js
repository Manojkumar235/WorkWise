import api from '../../../services/api';

export const userAPI = {
  getAll: () => api.get('/users/all'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/count'),
};

export default userAPI;
