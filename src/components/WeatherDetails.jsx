import React from 'react';

/**
 * Weather details component for displaying auxiliary stats
 * Grid layout handling missing values gracefully.
 * 
 * @param {Object} props
 * @param {Object} props.weather - Weather data object (humidity, wind, pressure, feelsLike)
 */
const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  // Defensive values
  const humidity = weather?.humidity ?? '--';
  const windSpeed = weather?.windSpeed !== null ? Math.round(weather.windSpeed) : '--';
  const feelsLike = weather?.feelsLike !== null ? Math.round(weather.feelsLike) : '--';
  const pressure = weather?.pressure ?? '--';

  return (
    <div className="grid grid-cols-2 gap-4 text-white">
      {/* Feels Like */}
      <div className="glass-card p-4 flex items-center hover:bg-white/20 transition-colors">
        <div className="bg-white/20 p-3 rounded-full mr-4 shadow-sm border border-white/10">
          <span className="text-xl">🌡️</span>
        </div>
        <div>
          <p className="text-sm text-white/70 uppercase tracking-wider font-semibold">Feels Like</p>
          <p className="text-2xl font-bold">{feelsLike}°</p>
        </div>
      </div>

      {/* Humidity */}
      <div className="glass-card p-4 flex items-center hover:bg-white/20 transition-colors">
        <div className="bg-white/20 p-3 rounded-full mr-4 shadow-sm border border-white/10">
          <span className="text-xl">💧</span>
        </div>
        <div>
          <p className="text-sm text-white/70 uppercase tracking-wider font-semibold">Humidity</p>
          <p className="text-2xl font-bold">{humidity}%</p>
        </div>
      </div>

      {/* Wind */}
      <div className="glass-card p-4 flex items-center hover:bg-white/20 transition-colors">
        <div className="bg-white/20 p-3 rounded-full mr-4 shadow-sm border border-white/10">
          <span className="text-xl">💨</span>
        </div>
        <div>
          <p className="text-sm text-white/70 uppercase tracking-wider font-semibold">Wind</p>
          <p className="text-2xl font-bold">{windSpeed} <span className="text-sm font-normal">km/h</span></p>
        </div>
      </div>

      {/* Pressure */}
      <div className="glass-card p-4 flex items-center hover:bg-white/20 transition-colors">
        <div className="bg-white/20 p-3 rounded-full mr-4 shadow-sm border border-white/10">
          <span className="text-xl">📊</span>
        </div>
        <div>
          <p className="text-sm text-white/70 uppercase tracking-wider font-semibold">Pressure</p>
          <p className="text-2xl font-bold">{pressure} <span className="text-sm font-normal">hPa</span></p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
