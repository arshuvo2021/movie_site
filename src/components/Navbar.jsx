import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, theme, toggleTheme, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ARMovieFlix
        </Link>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/categories" className="navbar-link">Categories</Link>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {user ? (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user.name || user.email}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/watchlist" className="dropdown-item">Watchlist</Link>
                  <button onClick={logout} className="dropdown-item">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;