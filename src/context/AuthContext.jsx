import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load saved watchlist
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(savedWatchlist);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const addToWatchlist = (movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (movieId) => {
    const newWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      watchlist,
      theme,
      toggleTheme,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 