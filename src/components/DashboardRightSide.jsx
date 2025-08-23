// DashboardRightSide.jsx
import React from 'react';
import ForecastDayCard from './ForecastDayCard';
import InfoCard from './InfoCard';
import { Sunrise, Sunset } from 'lucide-react';

const DashboardRightSide = ({ weatherData, forecastData }) => {
  if (!weatherData || !forecastData) {
    return null;
  }

  const SunriseSunsetCard = () => {
    if (!forecastData || !forecastData.forecast || !forecastData.forecast.forecastday[0]) {
      return null;
    }

    const { forecastday } = forecastData.forecast;

    return (
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-white">
        <div className="text-gray-400 text-sm mb-4">Sunrise & Sunset</div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sunrise className="w-5 h-5 text-orange-400 mr-3" />
              <span className="text-white">{forecastday[0].astro.sunrise}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sunset className="w-5 h-5 text-orange-600 mr-3" />
              <span className="text-white">{forecastday[0].astro.sunset}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const { current } = weatherData;
  const { forecast } = forecastData;

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
          <button className="text-white font-medium border-b-2 border-white pb-1">Week</button>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 mb-8">
        <div className="grid grid-cols-7 gap-4">
          {forecast.forecastday.map((day) => (
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

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Precipitation Chart */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-4">Precipitation</div>
          <div className="h-24 flex items-end justify-between">
            <svg className="w-full h-full" viewBox="0 0 300 100">
              <path
                d="M 0 80 Q 75 60 150 70 T 300 65"
                stroke="#6B7280"
                strokeWidth="2"
                fill="none"
                className="opacity-60"
              />
              <path
                d="M 0 80 Q 75 60 150 70 T 300 65"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <SunriseSunsetCard />
      </div>
    </div>
  );
};

export default DashboardRightSide;