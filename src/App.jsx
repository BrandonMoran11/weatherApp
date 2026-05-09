import { useState } from "react";
import "./main.css";
import WeatherCard from "./assets/components/WeatherCard";
import ForecastList from "./assets/components/ForecastList";
import WeatherDetails from "./assets/components/WeatherDetails";
import Search from "./assets/components/search";
import Header from "./assets/components/Header";
import axios from "axios";
import WeatherLogo from "./assets/components/WeatherLogo";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cache, setCache] = useState({});
  const apiKey = "5fbf55401922ca9d92d5cb53eae44182";

  // Función para obtener tanto el clima actual como el pronóstico
  const fetchWeatherData = async (city) => {
    const cityKey = city.toLowerCase().trim();

    // 1. Verificar si ya tenemos los datos en caché
    if (cache[cityKey]) {
      setWeatherData(cache[cityKey].weather);
      setForecastData(cache[cityKey].forecast);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      // 2. Obtener clima y pronóstico en paralelo
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: { q: city, appid: apiKey.trim(), units: "metric" },
        }),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: { q: city, appid: apiKey.trim(), units: "metric" },
        }),
      ]);

      const newWeatherData = weatherResponse.data;
      const newForecastData = forecastResponse.data;

      setWeatherData(newWeatherData);
      setForecastData(newForecastData);

      // 3. Guardar en caché para evitar futuras llamadas iguales
      setCache((prev) => ({
        ...prev,
        [cityKey]: { weather: newWeatherData, forecast: newForecastData },
      }));
    } catch (error) {
      console.error("Error obteniendo datos del clima:", error);
    } finally {
      setIsLoading(false);
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
    <div className="flex flex-row min-h-screen bg-gray-200">
      <aside className="flex flex-row w-64 shrink-0 bg-gray-200 border-r-2 border-gray-300 p-6 mt-3 gap-4">
        <WeatherLogo className="w-12 h-12" />
        <div>
          <h1 className="text-xl">
            Weather <span className="font-bold">App</span>
          </h1>

          <p className="text-xs text-gray-800">Stay updated with the weather</p>
        </div>
      </aside>
      <main className="flex-1 flex flex-col p-10 gap-10">
        <Header>
          <Search onSearchTermChange={handleSearchTerm} isLoading={isLoading} />
        </Header>
        {weatherData ? (
          <>
            <WeatherCard weatherData={weatherData} />

            <div className="">
              {forecastData && <ForecastList forecastData={forecastData} />}
            </div>
            <div>
              <WeatherDetails weatherData={weatherData} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md mt-5 w-3/4">
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
      </main>
    </div>
  );
}

export default App;
