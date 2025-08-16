import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const city = "London"; // test with any city
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        console.log("Weather data:", data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Weather Dashboard</h1>
    </div>
  );
}

export default App;
