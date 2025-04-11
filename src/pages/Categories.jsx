import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const [genres, setGenres] = useState([
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ]);

  return (
    <div className="categories-container">
      <h1 className="categories-title">Movie Genres</h1>
      <div className="genres-grid">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            to={`/genre/${genre.id}`}
            className="genre-card"
          >
            <h2>{genre.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories; 