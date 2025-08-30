# 🌤️ Weather App

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-blue?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/zakariabanid/weather-app?style=social)](https://github.com/zakariabanid/weather-app/stargazers)

A **modern and responsive web application** that allows users to check the **current weather** and **7-day forecast** for any city, including details like **air quality**, **UV index**, **pressure**, and **sunrise/sunset times**.

---

## 🔹 Features  

- **Search for any city**: Get current weather instantly.  
- **City suggestions**: Autocomplete helps you find the right city as you type.  
- **Search history**: Easily access recently searched cities.  
- **Clear search history**: Remove past searches with one click.  
- **7-day forecast**: See upcoming weather conditions at a glance.  
- **Sunrise & Sunset times**: Know when the sun rises and sets for each day.  
- **Air Quality Index (AQI)**: Quickly check the quality of the air.  
- **UV Index**: See how strong the sun is and protect yourself accordingly.  
- **Pressure information**: Monitor atmospheric pressure trends.  
- **Automatic geolocation**: Detects your current location and shows local weather.  
- **Responsive design**: Works perfectly on desktop, tablet, and mobile.  

---

## 🖥️ Demo  

Check out the live demo: [Weather App Live](https://your-live-demo-link.com)  

![Weather App Screenshot](link-to-screenshot-or-gif)  

---

## 🚀 Technologies Used  

- **React** – Frontend framework for building user interfaces.  
- **TailwindCSS** – Utility-first CSS framework for responsive design.  
- **Vite** – Fast and modern build tool.  
- **WeatherAPI** – Provides real-time weather data, forecasts, and location suggestions.  
- **Lucide Icons** – Beautiful and lightweight icon set.  

---

## ⚡ Installation  

1. Clone the repository:  
```bash
git clone https://github.com/zakariabanid/weather-app.git
Navigate to the project directory:

bash
Copy code
cd weather-app
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Create a .env file in the root directory and add your WeatherAPI key:

bash
Copy code
npm run dev
# or
yarn dev
Open http://localhost:5173 in your browser.

📝 Project Structure
graphql
Copy code
src/
├─ api/                  # API calls to WeatherAPI
├─ components/           # React components
│  ├─ SearchBar.jsx      # City search with suggestions
│  ├─ WeatherCard.jsx    # Current weather display
│  ├─ DashboardRightSide.jsx # Forecast, AQI, UV, Pressure
│  ├─ SunriseSunsetCard.jsx  # Sunrise & sunset info
│  └─ InfoCard.jsx       # AQI, UV, Pressure cards
├─ App.jsx               # Main app component
├─ index.css             # TailwindCSS styling
🎯 How It Works
The app loads the default city (Casablanca) or detects your location.

Use the search bar to look for any city. Suggestions appear as you type.

Select a city to view current weather and forecast.

The app also displays:

Air Quality Index (AQI)

UV Index

Pressure information

Sunrise and sunset times

Your recent searches are saved locally for quick access.

🌟 Future Improvements
Add dark/light mode toggle.

Include hourly forecast with temperature charts.

Integrate weather alerts and notifications.

Add multi-language support.

📄 License
This project is MIT Licensed.

📌 Author
Zakaria Banid – GitHub