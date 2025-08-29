// src/App.jsx

import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import DashboardRightSide from "./components/DashboardRightSide";
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Casablanca');

  const fetchData = async (cityName) => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=yes`),
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7&aqi=yes`)
      ]);

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      
      if (weatherData.error || forecastData.error) {
        throw new Error(weatherData.error?.message || forecastData.error?.message);
      }

      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeatherData({ error: { message: "City not found." } });
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(city);
  }, [city]);

  const handleSearch = (newCity) => {
    if (newCity.trim() !== '') {
      setCity(newCity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black text-white">
      <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen p-6">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen w-full">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-xl text-gray-300">Loading weather data...</div>
            </div>
          </div>
        ) : weatherData?.error ? (
          <div className="flex items-center justify-center min-h-screen w-full">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center max-w-md">
              <div className="text-6xl mb-4">🌍</div>
              <div className="text-xl text-red-400 mb-4">City not found</div>
              <div className="text-gray-300 mb-6">Please check the city name and try again.</div>
              <div className="w-full max-w-sm">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full max-w-sm lg:w-1/3 p-4 bg-stone-900 rounded-3xl mx-6">
              <SearchBar onSearch={handleSearch} />
              <WeatherCard weatherData={weatherData} />
            </div>

            <DashboardRightSide weatherData={weatherData} forecastData={forecastData} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;