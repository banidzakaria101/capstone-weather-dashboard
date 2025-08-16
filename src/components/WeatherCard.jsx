import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || weatherData.error) {
    return (
      <div className="bg-[#242424] p-6 rounded-lg shadow-lg text-white w-full max-w-xs mx-auto">
        <div className="text-center text-red-400">
          City not found. Please try again.
        </div>
      </div>
    );
  }

  const { location, current } = weatherData;

  const getDayOfWeek = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  return (
    <div className="bg-[#242424] p-6 rounded-lg shadow-lg text-white w-full max-w-xs mx-auto flex flex-col items-center">
      {/* Weather Icon */}
      <img src={current.condition.icon} alt={current.condition.text} className="w-32 h-32 mb-4" />
        
      {/* Temperature */}
      <div className="text-7xl font-light mb-2">
        {Math.round(current.temp_c)}°C
      </div>
      
      {/* City and Day */}
      <div className="flex justify-between items-center w-full px-4 mb-4 text-gray-400">
        <span className="text-xl">{location.name}</span>
        <span className="text-xl">{getDayOfWeek()}</span>
      </div>

      {/* Separator line */}
      <hr className="w-full border-t border-gray-600 mb-4" />

      {/* Detailed Weather Info Section */}
      <div className="w-full px-4 mb-4">
        {/* Weather Condition Text */}
        <div className="flex items-center space-x-2 text-white">
          <span className="text-2xl">🌦️</span>
          <span className="text-md">{current.condition.text}</span>
        </div>
        
        {/* Min/Max Temperature (Placeholders for now) */}
        <div className="flex items-center space-x-2 text-white mt-2">
          <span className="text-2xl">🌡️</span>
          <div className="flex flex-col">
            <span className="text-sm">Min Temperature - 28°C</span>
            <span className="text-sm">Max Temperature - 31°C</span>
          </div>
        </div>
      </div>

      {/* Separator line */}
      <hr className="w-full border-t border-gray-600 mb-4" />

      {/* Humidity and Wind Speed */}
      <div className="w-full flex justify-around items-center px-4">
        {/* Humidity */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span className="text-2xl">💧</span>
            <span className="font-bold">{current.humidity}%</span>
          </div>
          <div className="text-sm text-gray-400">Humidity</div>
        </div>

        {/* Wind Speed */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
            <span className="text-2xl">💨</span>
            <span className="font-bold">{current.wind_kph} km/h</span>
          </div>
          <div className="text-sm text-gray-400">Wind Speed</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;