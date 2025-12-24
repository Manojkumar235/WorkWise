import api from '../../../services/api';

export const skillAPI = {
  add: (skillData) => api.post('/skills/add', skillData),
  getMySkills: () => api.get('/skills/my-skills'),
  getUserSkills: (userId) => api.get(`/skills/user/${userId}`),
  getByCategory: (category) => api.get(`/skills/category/${category}`),
  search: (skillName) => api.get(`/skills/search?skillName=${skillName}`),
  update: (id, skillData) => api.put(`/skills/${id}`, skillData),
  delete: (id) => api.delete(`/skills/${id}`),
};

export default skillAPI;
