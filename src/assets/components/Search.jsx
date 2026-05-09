import { useState } from "react";

export default function Search({ onSearchTermChange, isLoading }) {
  const [ciudad, setCiudad] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (ciudad.trim() && onSearchTermChange && !isLoading) {
      onSearchTermChange(ciudad);
      setCiudad("");
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
          className={`w-full sm:w-3/5 lg:w-2/6 p-3 lg:p-4 bg-white backdrop-blur-sm border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        <button
          type="submit"
          disabled={isLoading || !ciudad.trim()}
          className={`h-10 lg:h-14 text-white p-2 px-4 rounded-xl ml-2 transition duration-200 whitespace-nowrap ${
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
