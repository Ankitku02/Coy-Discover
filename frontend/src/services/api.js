import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchFeed = async () => {
  const response = await api.get('/feed');
  return response.data;
};

export const submitSwipe = async (targetProfileId, action) => {
  const response = await api.post('/swipe', { targetProfileId, action });
  return response.data;
};

export const fetchMatches = async () => {
  const response = await api.get('/matches');
  return response.data;
};

export const resetSwipesAndMatches = async () => {
  const response = await api.post('/reset');
  return response.data;
};

export default api;
