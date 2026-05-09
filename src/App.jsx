import { useState } from "react";
import "./main.css";
import WeatherCard from "./assets/components/WeatherCard";
import ForecastList from "./assets/components/ForecastList";
import WeatherDetails from "./assets/components/WeatherDetails";
import Search from "./assets/components/Search";
import Header from "./assets/components/Header";
import axios from "axios";
import WeatherLogo from "./assets/components/WeatherLogo";
import FavoriteCities from "./assets/components/FavoriteCities";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cache, setCache] = useState({});
  const [currentView, setCurrentView] = useState("home");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("weatherFavorites");
    return saved ? JSON.parse(saved) : [];
  });

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

  // Función para alternar favoritos
  const toggleFavorite = (cityData) => {
    const cityKey = cityData.name.toLowerCase().trim();
    const isFavorite = favorites.some((fav) => fav.name.toLowerCase().trim() === cityKey);

    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav.name.toLowerCase().trim() !== cityKey);
    } else {
      newFavorites = [...favorites, cityData];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem("weatherFavorites", JSON.stringify(newFavorites));
  };


  // Recibir término de búsqueda desde el componente Search
  const handleSearchTerm = (term) => {
    setSearchTerm(term);
    if (term) {
      fetchWeatherData(term);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-200">
      <aside className="flex flex-col items-center lg:items-start w-full lg:w-64 shrink-0 bg-gray-200 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300 p-4 lg:p-6 lg:mt-3 gap-6">
        <div className="flex flex-row items-center lg:items-start gap-4">
          <WeatherLogo className="w-12 h-12" />
          <div>
            <h1 className="text-xl">
              Weather <span className="font-bold">App</span>
            </h1>
            <p className="text-xs text-gray-800">Stay updated with the weather</p>
          </div>
        </div>
        
        <nav className="flex flex-row lg:flex-col gap-2 w-full mt-4 lg:mt-8">
          <button 
            onClick={() => setCurrentView("home")}
            className={`px-4 py-2 text-left rounded-lg transition-colors font-medium ${currentView === "home" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300 text-gray-700"}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView("favorites")}
            className={`px-4 py-2 text-left rounded-lg transition-colors font-medium ${currentView === "favorites" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300 text-gray-700"}`}
          >
            Favorites
          </button>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-10 gap-6 lg:gap-10">
        <Header>
          <Search onSearchTermChange={handleSearchTerm} isLoading={isLoading} />
        </Header>
        {currentView === "favorites" ? (
          <FavoriteCities favorites={favorites} onSelectCity={(city) => {
            handleSearchTerm(city);
            setCurrentView("home");
          }} />
        ) : weatherData ? (
          <>
            <WeatherCard 
              weatherData={weatherData} 
              isFavorite={favorites.some(fav => fav.name.toLowerCase().trim() === weatherData.name.toLowerCase().trim())}
              onToggleFavorite={() => toggleFavorite(weatherData)}
            />

            <div className="">
              {forecastData && <ForecastList forecastData={forecastData} />}
            </div>
            <div>
              <WeatherDetails weatherData={weatherData} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 lg:py-16 bg-white rounded-lg shadow-md mt-5 w-full lg:w-3/4">
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
