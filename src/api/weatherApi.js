// src/api/weatherApi.js
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeather = async (cityName) => {
  const [weatherResponse, forecastResponse] = await Promise.all([
    fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${cityName}&aqi=yes`),
    fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=yes`)
  ]);

  const weatherData = await weatherResponse.json();
  const forecastData = await forecastResponse.json();

  if (weatherData.error || forecastData.error) {
    throw new Error(weatherData.error?.message || forecastData.error?.message);
  }

  return { weatherData, forecastData };
};

// Make sure this export exists
export const fetchSuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  try {
    const res = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    return [];
  }
};
