import { useState, useCallback } from 'react';
import { fetchWeather as fetchWeatherApi } from '../services/weatherService';

/**
 * Custom hook to manage weather data state, loading, and error handling.
 * Provides a clean interface for components to consume.
 */
export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Clears the current error message
   */
  const clearError = useCallback(() => {
    setError('');
  }, []);

  /**
   * Fetches weather data for a specific city and updates local state.
   * Uses defensive programming to handle all edge cases smoothly.
   * 
   * @param {string} city - The name of the city to search for
   */
  const searchWeather = useCallback(async (city) => {
    if (!city || typeof city !== 'string' || !city.trim()) {
      setError('Please enter a valid city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeatherApi(city.trim());
      setWeather(data);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err?.message || 'An unexpected error occurred while fetching weather');
      setWeather(null); // Clear previous weather data on error
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array as it doesn't rely on internal scope variables changing

  // TODO: Add feature to get weather by current Geolocation
  // const fetchWeatherByLocation = useCallback(async (lat, lon) => { ... }, []);

  return {
    weather,
    loading,
    error,
    searchWeather,
    clearError
  };
};
