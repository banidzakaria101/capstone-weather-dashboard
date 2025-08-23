import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(city);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search city..."
        className="w-full p-2 rounded-lg bg-[#333333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;