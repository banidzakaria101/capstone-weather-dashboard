// App.jsx
import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import DashboardRightSide from "./components/DashboardRightSide";
import { fetchWeather } from "./api/weatherApi";
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('Casablanca');

  const fetchData = async (cityName) => {
    setLoading(true);
    try {
      const { weatherData, forecastData } = await fetchWeather(cityName);
      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (error) {
      setWeatherData({ error: { message: "City not found." } });
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Detect user location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchData(`${latitude},${longitude}`);
        },
        (error) => {
          console.warn("Geolocation failed:", error.message);
          fetchData(city); // fallback
        }
      );
    } else {
      fetchData(city); // fallback if not supported
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (newCity) => {
    if (newCity.trim() !== '' && newCity !== city) {
      setCity(newCity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:min-h-screen">
        <div className="w-full max-w-sm lg:w-1/3 p-2 sm:p-4 bg-stone-900 rounded-3xl mx-auto lg:mx-6 mb-4 lg:mb-0">
          <SearchBar onSearch={handleSearch} />
          <WeatherCard weatherData={weatherData} loading={loading} />
        </div>

        <DashboardRightSide 
          weatherData={weatherData} 
          forecastData={forecastData} 
          loading={loading} 
        />
      </div>
    </div>
  );
}

export default App;
