import React from 'react';

/**
 * Display main weather information (Temp, City, Icon, Condition)
 * Features defensive programming to ensure app doesn't crash on missing data
 * 
 * @param {Object} props
 * @param {Object} props.weather - Weather data object
 */
const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  // Defensive defaults using nullish coalescing
  const name = weather?.name ?? 'Unknown Location';
  const country = weather?.country ? `, ${weather.country}` : '';
  const temp = weather?.temperature !== null ? Math.round(weather.temperature) : '--';
  const desc = weather?.description ?? 'No description available';
  
  // Choose an appropriate emoji or SVG path based on iconType
  const getIcon = (type) => {
    switch (type) {
      case 'clear-day': return '☀️';
      case 'clear-night': return '🌙';
      case 'partly-cloudy-day': return '⛅';
      case 'cloudy': return '☁️';
      case 'fog': return '🌫️';
      case 'drizzle': return '🌧️';
      case 'rain': return '☔';
      case 'snow': return '❄️';
      case 'thunderstorm': return '⛈️';
      default: return '🌡️';
    }
  };

  return (
    <div className="glass-card p-8 mb-6 text-center text-white relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-light tracking-wider mb-1">
          {name}{country}
        </h2>
        
        <div className="flex flex-col items-center justify-center my-6">
          <div className="text-8xl mb-4 drop-shadow-md transition-transform hover:scale-110 duration-300">
            {getIcon(weather?.iconType)}
          </div>
          
          <div className="flex items-start">
            <span className="text-7xl font-bold tracking-tighter shadow-sm">{temp}</span>
            <span className="text-3xl font-light mt-2 ml-1">°C</span>
          </div>
        </div>

        <p className="text-xl font-medium tracking-wide capitalize text-white/90">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
