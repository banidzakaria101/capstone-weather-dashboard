import React from 'react';
import { Droplets, Wind } from 'lucide-react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || weatherData.error) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4 md:p-8 text-white shadow-2xl w-full max-w-xs md:max-w-sm mx-auto">
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

  // API weather icon
  const getWeatherIcon = () => {
    return (
      <div className="flex justify-center items-center">
        <img 
          src={`https:${current.condition.icon}`} 
          alt={current.condition.text}
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain filter drop-shadow-lg"
        />
      </div>
    );
  };

  return (
    <div className=" p-4 md:p-8 text-white w-full max-w-xs md:max-w-sm mx-auto">
      {/* Weather Icon */}
      <div className="flex justify-center mb-4 sm:mb-8">
        <div className="h-20 sm:h-24">
          {getWeatherIcon()}
        </div>
      </div>

      {/* Temperature */}
      <div className="text-center mb-4 sm:mb-8">
        <div className="text-5xl sm:text-7xl font-light leading-none">{Math.round(current.temp_c)}°C</div>
      </div>

      {/* Location and Day */}
      <div className="flex justify-between items-center mb-4 sm:mb-8 px-2">
        <div className="text-base sm:text-lg font-medium">{location.name}</div>
        <div className="text-gray-400 text-base sm:text-lg">{getDayOfWeek()}</div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-600/50 mb-4 sm:mb-6"></div>

      {/* Weather Details */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pt-2 sm:pt-7">
        <div className="flex items-center text-gray-300">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
          <span className="text-xs sm:text-sm">{current.condition.text}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
          <span className="text-xs sm:text-sm">Min Temperature - {Math.round(current.temp_c - 5)}°C</span>
        </div>
        <div className="flex items-center text-gray-300">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
          <span className="text-xs sm:text-sm">Max Temperature - {Math.round(current.temp_c + 3)}°C</span>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-600/50 mb-4 sm:mb-6"></div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-6">
        <div className="flex items-center">
          <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 sm:mr-3" />
          <div className="text-center">
            <div className="text-sm sm:text-lg font-bold">{current.humidity}%</div>
            <div className="text-xxs sm:text-xs text-gray-400">Humidity</div>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-2 sm:mr-3" />
          <div className="text-center">
            <div className="text-sm sm:text-lg font-bold">{Math.round(current.wind_kph)} km/h</div>
            <div className="text-xxs sm:text-xs text-gray-400">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;