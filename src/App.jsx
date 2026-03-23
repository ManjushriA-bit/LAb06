import { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '1e0a7572409095e8d5d14bbf4da413c'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [loading, setLoading] = useState(false);

  // 1. Auto-load trending movies on start or language change
  useEffect(() => {
    fetchTrending();
  }, [language]);

  const fetchTrending = async () => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=${language}`;
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results || []);
    setLoading(false);
  };

  const searchMovie = async () => {
    if (!query) return;
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=${language}`;
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results || []);
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="header-nav">
        <h1>🎬 CineFlash AI</h1>
        <select className="lang-dropdown" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="te-IN">Telugu</option>
          <option value="ta-IN">Tamil</option>
          <option value="ml-IN">Malayalam</option>
          <option value="kn-IN">Kannada</option>
        </select>
      </div>

      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search old or new films..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchMovie()}
        />
        <button onClick={searchMovie}>{loading ? '...' : 'Search'}</button>
      </div>

      <div className="movie-grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} apiKey={API_KEY} />
        ))}
      </div>
    </div>
  );
}

// Sub-component for the interactive card
function MovieCard({ movie, apiKey }) {
  const [providers, setProviders] = useState([]);

  // Fetch streaming info when user clicks the card
  const fetchProviders = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${apiKey}`);
    const data = await res.json();
    const regionData = data.results?.IN || data.results?.US; // Priority for India/US regions
    setProviders(regionData?.flatrate || []);
  };

  return (
    <div className="flashcard" onClick={fetchProviders}>
      <div className="flashcard-inner">
        {/* FRONT */}
        <div className="card-front">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
          <div className="card-overlay">
            <h3>{movie.title}</h3>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        
        {/* BACK */}
        <div className="card-back">
          <h4>Plot</h4>
          <p className="plot-text">{movie.overview || "No description available."}</p>
          <p className="release-date">📅 {movie.release_date}</p>
          
          <div className="streaming-section">
            <h5>Available On:</h5>
            <div className="provider-icons">
              {providers.length > 0 ? (
                providers.map(p => (
                  <img key={p.provider_id} src={`https://image.tmdb.org/t/p/original${p.logo_path}`} className="brand-logo" title={p.provider_name} />
                ))
              ) : (
                <small>Tap to check streaming...</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;