import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieRecommendations } from '../services/movieService';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        
        const recommendationsData = await getMovieRecommendations(id);
        setRecommendations(recommendationsData.results.slice(0, 6));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieData();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="error-message">Movie not found.</div>;
  }

  // Format movie runtime from minutes to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format movie release date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="movie-details-page">
      <div className="movie-details">
        <div className="movie-poster">
          <img 
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image+Available'
            } 
            alt={movie.title} 
          />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="movie-rating">★ {movie.vote_average.toFixed(1)}</span>
            <span className="movie-year">{movie.release_date?.split('-')[0]}</span>
            {movie.runtime > 0 && <span className="movie-runtime">{formatRuntime(movie.runtime)}</span>}
          </div>
          
          <div className="movie-genres">
            {movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          
          <div className="movie-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          
          <div className="movie-details-info">
            <p><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
            {movie.budget > 0 && (
              <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
            )}
            {movie.revenue > 0 && (
              <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
            )}
            <p><strong>Status:</strong> {movie.status}</p>
            {movie.production_companies.length > 0 && (
              <p><strong>Production:</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
            )}
          </div>
        </div>
      </div>
      
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h2>Recommendations</h2>
          <div className="movie-grid">
            {recommendations.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;