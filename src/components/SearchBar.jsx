import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch suggestions when typing
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`
        );
        const data = await res.json();
        setSuggestions(data || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSelect = (city) => {
    onSearch(city);
    setSearchTerm(city);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search city"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim()) {
              e.preventDefault();
              onSearch(searchTerm);
              setSuggestions([]);
              setShowSuggestions(false);
            }
          }}
          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
        />
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-stone-900 border border-gray-700/50 rounded-xl max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.id || s.name + s.region}
              onClick={() => handleSelect(s.name)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white text-sm"
            >
              {s.name}, {s.region}, {s.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
