import { useState } from "react";
import "./main.css";
import WeatherCard from "./assets/components/WeatherCard";
import ForecastList from "./assets/components/ForecastList";
import WeatherDetails from "./assets/components/WeatherDetails";
import Search from "./assets/components/search";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = "88598602fc998197e5515a4d3443ec7a";

  // Función para obtener tanto el clima actual como el pronóstico
  const fetchWeatherData = async (city) => {
    try {
      // 1. Obtener clima actual
      const weatherResponse = await axios.request({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      });

      setWeatherData(weatherResponse.data);

      // 2. Obtener pronóstico de 5 días
      const forecastResponse = await axios.request({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/forecast`,
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      });

      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error("Error obteniendo datos del clima:", error);
    }
  };

  // Recibir término de búsqueda desde el componente Search
  const handleSearchTerm = (term) => {
    setSearchTerm(term);
    if (term) {
      fetchWeatherData(term);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto my-5 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl">
            Wheater<span className="font-bold">App</span>
          </h1>
          <Search onSearchTermChange={handleSearchTerm} />
        </header>
        {weatherData ? (
          <>
            <WeatherCard weatherData={weatherData} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                {forecastData && <ForecastList forecastData={forecastData} />}
              </div>
              <div>
                <WeatherDetails weatherData={weatherData} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
            <svg
              className="w-20 h-20 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-xl text-gray-600 font-medium">
              Please search a country or city
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
