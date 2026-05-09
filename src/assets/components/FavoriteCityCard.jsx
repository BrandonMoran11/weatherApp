import React from "react";
import {
  Sun,
  CloudRain,
  Cloudy,
  CloudFog,
  CloudSnow,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

export default function FavoriteCityCard({ city, onSelect }) {
  const getIcon = (weather) => {
    const condition = weather.toLowerCase();
    switch (condition) {
      case "clear":
        return <Sun className="w-12 h-12 text-amber-500" />;
      case "clouds":
        return <Cloudy className="w-12 h-12 text-gray-500" />;
      case "rain":
      case "thunderstorm":
      case "drizzle":
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      case "snow":
        return <CloudSnow className="w-12 h-12 text-blue-500" />;
      case "atmosphere":
        return <CloudFog className="w-12 h-12 text-gray-500" />;
      default:
        return <Sun className="w-12 h-12 text-amber-500" />;
    }
  };

  const weatherMain = city.weather[0].main;
  
  // Calculate a basic time for display (can be improved later to use timezone offset)
  const date = new Date();
  const timeString = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      onClick={onSelect}
      className="flex flex-col justify-between p-5 rounded-2xl bg-white shadow-md hover:shadow-lg cursor-pointer transition-shadow min-h-[160px]"
    >
      <div className="flex flex-row justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{city.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{timeString} • {city.sys.country}</p>
        </div>
        <div>
          {getIcon(weatherMain)}
        </div>
      </div>
      
      <div className="flex flex-row justify-between items-end mt-4">
        <h2 className="text-5xl font-bold text-blue-500">
          {Math.round(city.main.temp)}°
        </h2>
        
        <div className="flex flex-col gap-1 bg-gray-100 rounded-lg p-2">
          <p className="flex flex-row items-center text-xs font-semibold text-gray-600">
            <ArrowUp className="w-3 h-3 mr-1" /> {Math.round(city.main.temp_max)}°
          </p>
          <p className="flex flex-row items-center text-xs font-semibold text-gray-600">
            <ArrowDown className="w-3 h-3 mr-1" /> {Math.round(city.main.temp_min)}°
          </p>
        </div>
      </div>
    </div>
  );
}
