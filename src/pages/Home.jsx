import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getPopularMovies } from '../services/movieService';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Popular Movies</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <button 
          className="load-more-button" 
          onClick={loadMoreMovies}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;