// src/utils/useSearch.js
import { useState } from "react";

/**
 * Custom hook for searching by name in a list
 * @param {Array} data - full list of objects (each must have a "name" field)
 * @returns { searchQuery, setSearchQuery, filteredData }
 */
const useSearch = (data) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { searchQuery, setSearchQuery, filteredData };
};

export default useSearch;
