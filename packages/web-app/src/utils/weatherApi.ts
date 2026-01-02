/**
 * Weather API Integration
 * Fetches current weather data to populate environmental conditions
 */

import type { EnvironmentalConditions } from '../types';

interface WeatherResponse {
  main: {
    temp: number;       // Temperature in Kelvin
    pressure: number;   // Pressure in hPa (millibars)
    humidity: number;   // Humidity percentage
  };
  wind: {
    speed: number;      // Wind speed in m/s
    deg: number;        // Wind direction in degrees
  };
  coord: {
    lat: number;
    lon: number;
  };
}

interface GeocodeResponse {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

// OpenWeatherMap API key - Users should set this as an environment variable
// For development, you can use a free API key from https://openweathermap.org/api
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

const BASE_URL = 'https://api.openweathermap.org';

/**
 * Fetch weather data by zip code
 */
export async function fetchWeatherByZip(zipCode: string, countryCode: string = 'US'): Promise<Partial<EnvironmentalConditions>> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key not configured. Set VITE_OPENWEATHER_API_KEY environment variable.');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${API_KEY}&units=imperial`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Zip code not found. Please check the zip code and try again.');
      }
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data: WeatherResponse = await response.json();
    return parseWeatherData(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
}

/**
 * Fetch weather data by city name
 */
export async function fetchWeatherByCity(city: string, countryCode?: string): Promise<Partial<EnvironmentalConditions>> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key not configured. Set VITE_OPENWEATHER_API_KEY environment variable.');
  }

  try {
    // First geocode the city to get coordinates
    const geoUrl = countryCode
      ? `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)},${countryCode}&limit=1&appid=${API_KEY}`
      : `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;

    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error(`Geocoding error: ${geoResponse.statusText}`);
    }

    const geoData: GeocodeResponse[] = await geoResponse.json();

    if (geoData.length === 0) {
      throw new Error('City not found. Please check the city name and try again.');
    }

    const { lat, lon } = geoData[0];

    // Now fetch weather using coordinates
    const weatherResponse = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );

    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.statusText}`);
    }

    const data: WeatherResponse = await weatherResponse.json();
    return parseWeatherData(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
}

/**
 * Parse weather API response into our environmental conditions format
 */
function parseWeatherData(data: WeatherResponse): Partial<EnvironmentalConditions> {
  // Temperature is already in Fahrenheit (we requested units=imperial)
  const temperature = Math.round(data.main.temp);

  // Pressure: convert from hPa (millibars) to inHg
  // 1 hPa = 0.02953 inHg
  const pressure = Number((data.main.pressure * 0.02953).toFixed(2));

  // Humidity is already in percentage
  const humidity = data.main.humidity;

  // Wind speed: API returns in mph when units=imperial
  const windSpeed = Math.round(data.wind.speed);

  // Wind direction in meteorological convention (direction FROM which wind blows)
  // OpenWeatherMap uses meteorological degrees (0° = North, 90° = East, 180° = South, 270° = West)
  // We need to convert to our convention where 0° = headwind
  // For shooting, assume target is North, so:
  // - Wind FROM North (0°) = Headwind (our 0°)
  // - Wind FROM East (90°) = Right-to-left (our 90°)
  // This matches our convention, so we can use it directly
  const windDirection = data.wind.deg;

  // Calculate altitude from pressure (rough approximation)
  // Standard pressure at sea level: 29.92 inHg
  // Pressure decreases ~1 inHg per 1000 feet
  const altitude = Math.round((29.92 - pressure) * 1000);

  return {
    temperature,
    pressure,
    humidity,
    windSpeed,
    windDirection,
    altitude: Math.max(0, altitude), // Don't allow negative altitude
  };
}

/**
 * Format location string for display
 */
export function formatLocation(location: string): string {
  // Check if it's a zip code (5 digits)
  if (/^\d{5}$/.test(location)) {
    return `ZIP ${location}`;
  }
  // Otherwise it's a city name
  return location;
}
