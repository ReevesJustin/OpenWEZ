/**
 * Weather Widget Component
 * Allows users to fetch current weather data for environmental inputs
 */

import { useState } from 'react';
import { useStore } from '../agents/state-management/store';
import { fetchWeatherByZip, fetchWeatherByCity, formatLocation } from '../utils/weatherApi';

export function WeatherWidget() {
  const { setBallisticInputs, ballisticInputs } = useStore();
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastLocation, setLastLocation] = useState<string | null>(null);

  const handleFetchWeather = async () => {
    if (!location.trim()) {
      setError('Please enter a zip code or city name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let weatherData;

      // Check if input is a zip code (5 digits)
      if (/^\d{5}$/.test(location.trim())) {
        weatherData = await fetchWeatherByZip(location.trim());
      } else {
        // Treat as city name
        weatherData = await fetchWeatherByCity(location.trim());
      }

      // Update environmental conditions
      setBallisticInputs({
        environment: {
          ...ballisticInputs.environment,
          ...weatherData,
        },
      });

      setLastLocation(formatLocation(location.trim()));
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data');
      }
      setLastLocation(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFetchWeather();
    }
  };

  return (
    <div className="weather-widget">
      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f8ff',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: '1px solid #b0d4f1'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>
          Load Weather Data
        </h3>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter zip code or city name"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '0.9rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <button
            onClick={handleFetchWeather}
            disabled={isLoading}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              backgroundColor: isLoading ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {isLoading ? 'Loading...' : 'Fetch Weather'}
          </button>
        </div>

        {error && (
          <div style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            fontSize: '0.85rem'
          }}>
            {error}
          </div>
        )}

        {lastLocation && !error && (
          <div style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            borderRadius: '4px',
            fontSize: '0.85rem'
          }}>
            ✓ Weather data loaded from {lastLocation}
          </div>
        )}

        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#666',
          lineHeight: '1.4'
        }}>
          <strong>Note:</strong> Weather data updates temperature, pressure, humidity, wind speed,
          wind direction, and altitude. You can manually adjust these values after loading.
          <br />
          <em>API key required: Set VITE_OPENWEATHER_API_KEY in .env file</em>
        </div>
      </div>
    </div>
  );
}
