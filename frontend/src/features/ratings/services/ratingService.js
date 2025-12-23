import api from '../../../services/api';

export const ratingAPI = {
  submit: (ratingData) => api.post('/ratings/submit', ratingData),
  getUserStats: (userId) => api.get(`/ratings/user/${userId}/stats`),
  getUserReviews: (userId) => api.get(`/ratings/user/${userId}/reviews`),
  getMyReviews: () => api.get('/ratings/my-reviews'),
};

export default ratingAPI;
