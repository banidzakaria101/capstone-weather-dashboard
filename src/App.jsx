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
  const [city, setCity] = useState('London');

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
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-[#1c1c1c] text-white p-4">
      {loading ? (
        <h1 className="text-xl">Loading...</h1>
      ) : weatherData?.error ? (
        <div className="text-white text-xl text-center">
          City not found. Please try again.
        </div>
      ) : (
        <>
          <div className="w-full max-w-sm md:w-1/3 p-4">
            <SearchBar onSearch={handleSearch} />
            <WeatherCard weatherData={weatherData} />
          </div>

          <DashboardRightSide weatherData={weatherData} forecastData={forecastData} />
        </>
      )}
    </div>
  );
}

export default App;