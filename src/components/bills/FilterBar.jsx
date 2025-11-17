import { useState } from "react";

export default function FilterBar({ onSearch, onCategoryChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["All", "Electricity", "Gas", "Water", "Internet"];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch && onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onCategoryChange && onCategoryChange(value === "All" ? "" : value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search bills..."
        className="w-full sm:w-1/2 border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={handleCategoryChange}
        className="w-full sm:w-1/4 border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
