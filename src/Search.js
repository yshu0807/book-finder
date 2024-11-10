import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Call onSearch from App.js and pass the search query
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
