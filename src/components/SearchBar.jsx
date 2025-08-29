import React, { useState, useEffect, useRef } from "react";
import { Search, Clock, X } from "lucide-react";
import { fetchSuggestions } from "../api/weatherApi"; // import the function

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState([]);
  const wrapperRef = useRef(null);

  // Load history
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(stored);
  }, []);

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      const data = await fetchSuggestions(searchTerm);
      setSuggestions(data);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSelect = (city) => {
    onSearch(city);
    setSearchTerm(city);
    setSuggestions([]);
    setShowSuggestions(false);

    const updated = [city, ...history.filter((h) => h !== city)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="relative mb-6" ref={wrapperRef}>
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
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim()) {
              e.preventDefault();
              handleSelect(searchTerm);
            }
            if (e.key === "Escape") {
              setShowSuggestions(false);
            }
          }}
          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
        />
      </div>

      {showSuggestions && (suggestions.length > 0 || history.length > 0) && (
        <ul className="absolute z-10 mt-1 w-full bg-stone-900 border border-gray-700/50 rounded-xl max-h-60 overflow-y-auto">
          {searchTerm.length < 2 &&
            history.map((h, i) => (
              <li
                key={i}
                onClick={() => handleSelect(h)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white text-sm flex items-center"
              >
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {h}
              </li>
            ))}

          {searchTerm.length >= 2 &&
            suggestions.map((s) => (
              <li
                key={s.id || s.name + s.region}
                onClick={() => handleSelect(s.name)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white text-sm"
              >
                {s.name}, {s.region}, {s.country}
              </li>
            ))}

          {history.length > 0 && searchTerm.length < 2 && (
            <li
              onClick={clearHistory}
              className="px-4 py-2 cursor-pointer text-red-400 hover:bg-gray-800 text-sm flex items-center justify-center border-t border-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              Clear history
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
