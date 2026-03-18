import React, { useEffect, useState } from 'react';
import './index.css';

// Hooks
import { useWeather } from './hooks/useWeather';

// Components
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

/**
 * Main Application Component
 * Manages the background theme based on weather and assembles UI components
 */
function App() {
  const { weather, loading, error, searchWeather, clearError } = useWeather();
  const [bgClass, setBgClass] = useState('bg-default');

  // Update background when weather changes
  useEffect(() => {
    if (!weather) return;

    // Map weather iconType state to a tailwind CSS class defined in index.css
    const type = weather.iconType;
    let newBgClass = 'bg-default';

    switch (type) {
      case 'clear-day': newBgClass = 'bg-clear-day'; break;
      case 'clear-night': newBgClass = 'bg-clear-night'; break;
      case 'partly-cloudy-day':
      case 'cloudy': newBgClass = 'bg-cloudy'; break;
      case 'rain':
      case 'drizzle': newBgClass = 'bg-rain'; break;
      case 'snow': newBgClass = 'bg-snow'; break;
      case 'thunderstorm': newBgClass = 'bg-thunderstorm'; break;
      case 'fog': newBgClass = 'bg-fog'; break;
      default: newBgClass = 'bg-default';
    }

    setBgClass(newBgClass);
  }, [weather]);

  return (
    <div className={`min-h-screen w-full transition-colors duration-1000 ease-in-out flex flex-col items-center justify-center p-4 sm:p-8 ${bgClass}`}>
      
      {/* Main Container */}
      <div className="w-full max-w-lg z-10 relative">
        
        {/* App Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-md">
            Weather App
          </h1>
          <p className="text-white/80 mt-2 font-medium">Beautiful Open-Source Weather</p>
        </header>

        {/* Search Component */}
        <SearchBar onSearch={searchWeather} isLoading={loading} />

        {/* Error State */}
        {error && (
          <ErrorMessage message={error} onClear={clearError} />
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="glass-card mb-6">
            <LoadingSpinner />
          </div>
        )}

        {/* Weather Data Display */}
        {!loading && !error && weather && (
          <div className="animate-fade-in">
            <WeatherCard weather={weather} />
            <WeatherDetails weather={weather} />
          </div>
        )}

        {/* Initial Empty State / Welcome */}
        {!loading && !error && !weather && (
          <div className="glass-card p-10 text-center text-white/90 animate-fade-in">
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="text-2xl font-semibold mb-2">Welcome!</h2>
            <p className="font-light max-w-xs mx-auto">
              Search for any city in the world to get the latest open-source weather data.
            </p>
          </div>
        )}

        {/* Footer info & features */}
        {/* TODO: Add 5-day forecast toggle button here in v2 */}
        {/* TODO: Add logic to save favorite cities to localStorage */}
        <footer className="mt-12 text-center text-white/50 text-sm">
          <p>Powered by Bbest</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
