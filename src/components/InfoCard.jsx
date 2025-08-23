// InfoCard.jsx
import React from 'react';
import { Eye, Wind, Sun } from 'lucide-react';

const InfoCard = ({ title, value, label, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'aqi':
        // Dynamic icon based on AQI value
        const aqiValue = parseInt(value);
        if (aqiValue <= 2) {
          return (
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          );
        } else if (aqiValue <= 4) {
          return (
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          );
        } else {
          return (
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          );
        }
        
      case 'uv':
        // Dynamic icon based on UV value
        const uvValue = parseInt(value);
        let uvColor = 'from-green-400 to-green-600';
        if (uvValue > 7) uvColor = 'from-red-400 to-red-600';
        else if (uvValue > 3) uvColor = 'from-yellow-400 to-orange-500';
        
        return (
          <div className={`w-8 h-8 bg-gradient-to-r ${uvColor} rounded-full mr-2 flex items-center justify-center relative`}>
            <Sun className="w-4 h-4 text-white" />
          </div>
        );
        
      case 'pressure':
        // Dynamic icon based on pressure value
        const pressureValue = parseInt(value);
        let pressureColor = 'from-blue-400 to-blue-600';
        if (pressureValue > 1020) pressureColor = 'from-green-400 to-green-600';
        else if (pressureValue < 1000) pressureColor = 'from-orange-400 to-red-500';
        
        return (
          <div className={`w-8 h-8 bg-gradient-to-r ${pressureColor} rounded-full mr-2 flex items-center justify-center`}>
            <Eye className="w-4 h-4 text-white" />
          </div>
        );
        
      default:
        return null;
    }
  };

  const getLabelColor = () => {
    switch (type) {
      case 'aqi':
        const aqiValue = parseInt(value);
        if (aqiValue <= 2) return 'text-green-400';
        if (aqiValue <= 4) return 'text-yellow-400';
        return 'text-red-400';
        
      case 'uv':
        const uvValue = parseInt(value);
        if (uvValue <= 2) return 'text-green-400';
        if (uvValue <= 7) return 'text-yellow-400';
        return 'text-red-400';
        
      case 'pressure':
        const pressureValue = parseInt(value);
        if (pressureValue > 1020) return 'text-green-400';
        if (pressureValue < 1000) return 'text-orange-400';
        return 'text-blue-400';
        
      default:
        return 'text-gray-400';
    }
  };

  const getDynamicLabel = () => {
    switch (type) {
      case 'aqi':
        const aqiValue = parseInt(value);
        if (aqiValue <= 2) return 'Good';
        if (aqiValue <= 4) return 'Moderate';
        if (aqiValue <= 6) return 'Unhealthy for Sensitive';
        return 'Unhealthy';
        
      case 'uv':
        const uvValue = parseInt(value);
        if (uvValue <= 2) return 'Low';
        if (uvValue <= 5) return 'Moderate';
        if (uvValue <= 7) return 'High';
        if (uvValue <= 10) return 'Very High';
        return 'Extreme';
        
      case 'pressure':
        const pressureValue = parseInt(value);
        if (pressureValue > 1020) return 'High';
        if (pressureValue < 1000) return 'Low';
        return 'Normal';
        
      default:
        return label;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-white">
      <div className="text-gray-400 text-sm mb-2">{title}</div>
      <div className="text-4xl font-light mb-2">{value}</div>
      <div className="flex items-center">
        {getIcon()}
        <span className={`text-sm ${getLabelColor()}`}>{getDynamicLabel()}</span>
      </div>
    </div>
  );
};

export default InfoCard;