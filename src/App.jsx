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
  const [loading, setLoading] = useState(false); // <-- start with false
  const [city, setCity] = useState('Casablanca');

  const fetchData = async (cityName) => {
    setLoading(true); // only indicate data is updating
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

  useEffect(() => {
    fetchData(city);
  }, [city]);

  const handleSearch = (newCity) => {
    if (newCity.trim() !== '' && newCity !== city) {
      setCity(newCity); // triggers data fetch
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black text-white">
      <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen p-6">
        <div className="w-full max-w-sm lg:w-1/3 p-4 bg-stone-900 rounded-3xl mx-6">
          <SearchBar onSearch={handleSearch} />
          {/* Show old data while loading */}
          <WeatherCard weatherData={weatherData} loading={loading} />
        </div>

        <DashboardRightSide weatherData={weatherData} forecastData={forecastData} loading={loading} />
      </div>
    </div>
  );
}

export default App;
