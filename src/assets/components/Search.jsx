import { useState } from "react";

export default function Search({ onSearchTermChange }) {
  const [ciudad, setCiudad] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (ciudad.trim() && onSearchTermChange) {
      onSearchTermChange(ciudad);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCiudad(newValue);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={ciudad}
          onChange={handleInputChange}
          className="p-4 bg-white backdrop-blur-sm border-gray-200 w-64 h-9 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 h-9 text-white p-2 rounded-lg ml-2 hover:bg-blue-600 transition duration-200"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
