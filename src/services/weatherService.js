/**
 * Weather Service mapping to Open-Meteo and Geocoding APIs.
 * This service layer uses defensive programming and returns a consistent format for the app to consume.
 */

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Map WMO Weather interpretation codes to readable descriptions and standard icon names
 * Reference: https://open-meteo.com/en/docs#weathervariables
 */
const mapWeatherCode = (code) => {
  const codeMap = {
    0: { desc: 'Clear sky', icon: 'clear-day' },
    1: { desc: 'Mainly clear', icon: 'clear-day' },
    2: { desc: 'Partly cloudy', icon: 'partly-cloudy-day' },
    3: { desc: 'Overcast', icon: 'cloudy' },
    45: { desc: 'Fog', icon: 'fog' },
    48: { desc: 'Depositing rime fog', icon: 'fog' },
    51: { desc: 'Light drizzle', icon: 'drizzle' },
    53: { desc: 'Moderate drizzle', icon: 'drizzle' },
    55: { desc: 'Dense drizzle', icon: 'drizzle' },
    56: { desc: 'Light freezing drizzle', icon: 'drizzle' },
    57: { desc: 'Dense freezing drizzle', icon: 'drizzle' },
    61: { desc: 'Slight rain', icon: 'rain' },
    63: { desc: 'Moderate rain', icon: 'rain' },
    65: { desc: 'Heavy rain', icon: 'rain' },
    66: { desc: 'Light freezing rain', icon: 'rain' },
    67: { desc: 'Heavy freezing rain', icon: 'rain' },
    71: { desc: 'Slight snow fall', icon: 'snow' },
    73: { desc: 'Moderate snow fall', icon: 'snow' },
    75: { desc: 'Heavy snow fall', icon: 'snow' },
    77: { desc: 'Snow grains', icon: 'snow' },
    80: { desc: 'Slight rain showers', icon: 'rain' },
    81: { desc: 'Moderate rain showers', icon: 'rain' },
    82: { desc: 'Violent rain showers', icon: 'rain' },
    85: { desc: 'Slight snow showers', icon: 'snow' },
    86: { desc: 'Heavy snow showers', icon: 'snow' },
    95: { desc: 'Thunderstorm', icon: 'thunderstorm' },
    96: { desc: 'Thunderstorm with slight hail', icon: 'thunderstorm' },
    99: { desc: 'Thunderstorm with heavy hail', icon: 'thunderstorm' }
  };
  
  return codeMap[code] || { desc: 'Unknown weather', icon: 'cloudy' };
};

/**
 * Fetch weather data for a given city
 * @param {string} city - The name of the city
 * @returns {Promise<Object>} Formatted weather data
 */
export const fetchWeather = async (city) => {
  if (!city || typeof city !== 'string') {
    throw new Error('City name is required');
  }

  try {
    // 1. Get Coordinates using Geocoding API
    const geoResponse = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    
    if (!geoResponse.ok) {
      throw new Error('Network response was not ok while fetching location');
    }
    
    const geoData = await geoResponse.json();

    // Check if city was found
    if (!geoData || !geoData.results || geoData.results.length === 0) {
      throw new Error('City not found. Please check the spelling and try again.');
    }

    const locationInfo = geoData.results[0];
    const { latitude, longitude, name, country } = locationInfo;

    // 2. Fetch Weather Data using Open-Meteo
    const weatherResponse = await fetch(
      `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure&windspeed_unit=kmh`
    );

    if (!weatherResponse.ok) {
      throw new Error('Network response was not ok while fetching weather data');
    }

    const weatherData = await weatherResponse.json();
    
    // Defensive checks for data
    if (!weatherData?.current_weather) {
      throw new Error('Weather data format is invalid');
    }

    const current = weatherData.current_weather;
    const weatherCodeInfo = mapWeatherCode(current?.weathercode);
    
    // Extract recent hourly data for humidity, feels like, pressure
    // By default, hourly arrays are large. We take the values at the current hour index.
    const timeIndex = weatherData?.hourly?.time?.findIndex(t => t === current.time) ?? 0;
    const safeIndex = timeIndex >= 0 ? timeIndex : 0;
    
    const humidity = weatherData?.hourly?.relative_humidity_2m?.[safeIndex] ?? null;
    const feelsLike = weatherData?.hourly?.apparent_temperature?.[safeIndex] ?? null;
    const pressure = weatherData?.hourly?.surface_pressure?.[safeIndex] ?? null;

    // Format final data
    return {
      id: `${latitude}-${longitude}`,
      name: name ?? city,
      country: country ?? '',
      description: weatherCodeInfo.desc,
      iconType: weatherCodeInfo.icon,
      weatherCode: current?.weathercode || 0,
      temperature: current?.temperature ?? null,
      windSpeed: current?.windspeed ?? null,
      humidity: humidity,
      feelsLike: feelsLike,
      pressure: pressure,
      isDay: current?.is_day === 1
    };

  } catch (error) {
    // Re-throw standardized errors
    if (error.message.includes('City not found')) {
      throw error;
    }
    throw new Error(error.message || 'Failed to fetch weather data. Please try again later.');
  }
};
