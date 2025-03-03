import axios from 'axios';

// Replace with your own TMDB API key
const API_KEY = '8c3972a46b29fa605f35720bc9f434c5';
const BASE_URL = 'https://api.themoviedb.org/3';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
});

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie ${movieId} details:`, error);
    throw error;
  }
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get movie recommendations
export const getMovieRecommendations = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recommendations for movie ${movieId}:`, error);
    throw error;
  }
};