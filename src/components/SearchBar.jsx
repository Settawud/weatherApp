import { useState } from 'react';

/**
 * SearchBar component for entering city names.
 * Uses controlled input and handles "Enter" key submission.
 * 
 * @param {Object} props
 * @param {Function} props.onSearch - Callback function to trigger search with city name
 * @param {boolean} props.isLoading - Whether a search is currently in progress
 */
const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      // Optional: Clear input or keep it so user sees what they searched
      // setCity(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8 relative">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full px-6 py-4 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/40 transition-all shadow-lg text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          aria-label="Search city"
        />
        <button
          type="submit"
          disabled={!city.trim() || isLoading}
          className="absolute right-2 p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-white/30"
          aria-label="Submit search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
