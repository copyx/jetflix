import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'ac3cac094225c9ea0022a8d0705ae88c',
    language: 'ko-KR',
  },
});

export const movieApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  detail: (id) =>
    api.get(`movie/${id}`, { params: { append_to_response: 'videos' } }),
  search: (term) =>
    api.get('search/movie', { params: { query: encodeURIComponent(term) } }),
};
export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  detail: (id) =>
    api.get(`tv/${id}`, { params: { append_to_response: 'videos' } }),
  search: (term) =>
    api.get('search/tv', { params: { query: encodeURIComponent(term) } }),
  externalIds: (id) => api.get(`tv/${id}/external_ids`),
  videos: (id) => api.get(`tv/${id}/videos`),
};

export default api;
