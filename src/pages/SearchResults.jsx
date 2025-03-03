import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/movieService';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const data = await searchMovies(query, 1);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setPage(1);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const loadMoreMovies = async () => {
    if (page >= totalPages) return;
    
    try {
      const nextPage = page + 1;
      const data = await searchMovies(query, nextPage);
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more movies. Please try again later.');
    }
  };

  if (loading && page === 1) {
    return <div className="loading">Searching for movies...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="no-results">
        <h2>No movies found for "{query}"</h2>
        <p>Try another search term or check your spelling.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {page < totalPages && (
        <button 
          className="load-more-button" 
          onClick={loadMoreMovies}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default SearchResults;