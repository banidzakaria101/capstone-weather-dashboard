// ForecastDayCard.jsx
import React from 'react';

const ForecastDayCard = ({ dayData }) => {
  if (!dayData) {
    return null;
  }

  const { date, day } = dayData;

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className="flex flex-col items-center text-white min-w-[80px] px-2">
      {/* Day of the week */}
      <div className="text-gray-400 text-sm mb-3 font-medium">
        {getDayName(date)}
      </div>
      
      {/* Weather Icon from API */}
      <div className="flex justify-center mb-3">
        <img 
          src={`https:${day.condition.icon}`} 
          alt={day.condition.text}
          className="w-12 h-12 object-contain filter drop-shadow-sm"
        />
      </div>
      
      {/* Max Temperature */}
      <div className="text-white font-semibold text-lg mb-1">
        {Math.round(day.maxtemp_c)}°
      </div>
      
      {/* Min Temperature */}
      <div className="text-gray-400 text-sm">
        {Math.round(day.mintemp_c)}°
      </div>
    </div>
  );
};

export default ForecastDayCard;