import React from 'react';
import ForecastDayCard from './ForecastDayCard';
import InfoCard from './InfoCard';

const DashboardRightSide = ({ weatherData, forecastData }) => {
  if (!weatherData || !forecastData) {
    return null;
  }

  const { current, forecast } = weatherData;

  // The code for the Sunrise/Sunset card is added here
  const SunriseSunsetCard = () => {
    return (
      <div className="bg-[#242424] p-4 rounded-lg flex flex-col items-center justify-center text-white">
        <div className="text-sm text-gray-400 mb-2">Sunrise & Sunset</div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center">
            <span className="text-2xl">🌅</span>
            <div className="text-md mt-1">Sunrise</div>
            <div className="font-bold">{forecast.forecastday[0].astro.sunrise}</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">🌇</span>
            <div className="text-md mt-1">Sunset</div>
            <div className="font-bold">{forecast.forecastday[0].astro.sunset}</div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-3xl md:w-2/3 p-4">
      {/* Forecast Section */}
      <div className="bg-[#242424] rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Today</span>
          <span className="text-lg font-bold text-gray-400">Week</span>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {forecastData.forecast.forecastday.map(day => (
            <ForecastDayCard key={day.date_epoch} dayData={day} />
          ))}
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Air Quality Index Card */}
        <InfoCard
          title="Air Quality Index"
          value={current.air_quality['us-epa-index']}
          label={current.air_quality['us-epa-index'] <= 2 ? 'Good' : 'Moderate'}
        />

        {/* UV Index Card */}
        <InfoCard
          title="UV Index"
          value={current.uv}
          label={current.uv <= 2 ? 'Low' : 'Moderate'}
        />
        
        {/* Pressure Card */}
        <InfoCard
          title="Pressure (mb)"
          value={current.pressure_mb}
          label="Normal"
        />
      </div>
      
      {/* Precipitation and Sunrise/Sunset section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Placeholder for Precipitation Chart */}
        <div className="bg-[#242424] p-4 rounded-lg h-48 flex items-center justify-center text-white">
          <span className="text-lg">Precipitation Chart Here</span>
        </div>
        
        {/* Sunrise & Sunset Card */}
        <SunriseSunsetCard />
      </div>
    </div>
  );
};

export default DashboardRightSide;