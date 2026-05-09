import { useState } from "react";

export default function Search({ onSearchTermChange, isLoading }) {
  const [ciudad, setCiudad] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (ciudad.trim() && onSearchTermChange && !isLoading) {
      onSearchTermChange(ciudad);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCiudad(newValue);
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={ciudad}
          onChange={handleInputChange}
          disabled={isLoading}
          className={`w-2/6 p-4 bg-white backdrop-blur-sm border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        <button
          type="submit"
          disabled={isLoading || !ciudad.trim()}
          className={`h-14 text-white p-2 rounded-xl ml-2 transition duration-200 ${
            isLoading || !ciudad.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>
    </div>
  );
}
