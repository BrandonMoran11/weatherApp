import React from "react";
import FavoriteCityCard from "./FavoriteCityCard";
import { Plus } from "lucide-react";

export default function FavoriteCities({ favorites, onSelectCity }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Favorite Cities</h2>
        <p className="text-sm text-gray-600">Keep track of weather across your preferred locations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((city, index) => (
          <FavoriteCityCard key={index} city={city} onSelect={() => onSelectCity(city.name)} />
        ))}

        {/* Add Location Card */}
        <div 
          onClick={() => onSelectCity("")} // Optional: Focus search bar or handle differently
          className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer min-h-[160px] transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <Plus className="w-6 h-6 text-gray-600" />
          </div>
          <span className="font-semibold text-gray-600">Add Location</span>
        </div>
      </div>
    </div>
  );
}
