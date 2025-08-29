// src/components/DashboardRightSide.jsx
import React from 'react';
import ForecastDayCard from './ForecastDayCard';
import InfoCard from './InfoCard';
import SunriseSunsetCard from './SunriseSunsetCard'; // Import the component

const DashboardRightSide = ({ weatherData, forecastData }) => {
  if (!weatherData || !forecastData || !forecastData.forecast) {
    return null;
  }

  const { current } = weatherData;
  const { forecast } = forecastData;
  const { forecastday } = forecast;

  const getAQILabel = (value) => {
    if (value <= 2) return 'Good';
    if (value <= 4) return 'Moderate';
    return 'Unhealthy';
  };

  const getUVLabel = (value) => {
    if (value <= 2) return 'Low';
    if (value <= 7) return 'Moderate';
    return 'High';
  };

  return (
    <div className="flex-1 max-w-4xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex space-x-6">
          <button className="text-gray-400 hover:text-white transition-colors">Today</button>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-[#242424] rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-7 gap-4">
          {forecastday.map((day) => (
            <ForecastDayCard key={day.date_epoch} dayData={day} />
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          title="Air Quality Index"
          value={current.air_quality['us-epa-index'] || 53}
          label={getAQILabel(current.air_quality['us-epa-index'] || 2)}
          type="aqi"
        />

        <InfoCard
          title="UV Index"
          value={current.uv}
          label={getUVLabel(current.uv)}
          type="uv"
        />

        <InfoCard
          title="Pressure (hpa)"
          value={current.pressure_mb}
          label="Normal"
          type="pressure"
        />
      </div>

     
        <SunriseSunsetCard forecastData={forecastData} />
      
    </div>
  );
};

export default DashboardRightSide;