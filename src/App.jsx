import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import Categories from './pages/Categories';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/genre/:id" element={<Categories />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© {new Date().getFullYear()} Movie Site</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;