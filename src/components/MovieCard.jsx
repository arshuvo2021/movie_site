import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  // Placeholder image URL in case movie poster is not available
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image+Available';

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} />
        <div className="movie-card-content">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div className="movie-card-rating">
            <span>★</span>
            <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;