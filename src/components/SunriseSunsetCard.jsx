// src/components/SunriseSunsetCard.jsx
import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';

const SunriseSunsetCard = ({ forecastData }) => {
  if (!forecastData || !forecastData.forecast || !forecastData.forecast.forecastday) {
    return null;
  }

  const { forecastday } = forecastData.forecast;

  // Utility: Get short day name (Mon, Tue, ...)
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  return (
    <div className="bg-[#242424] rounded-2xl p-6">
      <div className="text-gray-400 text-sm mb-4">Sunrise & Sunset</div>

      {/* Grid similar to ForecastDayCard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecastday.map((day) => (
          <div
            key={day.date_epoch}
            className="flex flex-col items-center text-white min-w-[80px] px-2 bg-stone-900 rounded-xl py-4"
          >
            {/* Day of the week */}
            <div className="text-gray-400 text-sm mb-3 font-medium">
              {getDayName(day.date)}
            </div>

            {/* Sunrise */}
            <div className="flex items-center space-x-1 mb-2">
              <Sunrise className="w-4 h-4 text-orange-400" />
              <span className="text-sm">{day.astro.sunrise}</span>
            </div>

            {/* Sunset */}
            <div className="flex items-center space-x-1">
              <Sunset className="w-4 h-4 text-orange-600" />
              <span className="text-sm">{day.astro.sunset}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SunriseSunsetCard;