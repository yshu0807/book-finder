import React from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <form className="search-form" onSubmit={handleSearch}>
      <motion.input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        whileFocus={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        Search
      </motion.button>
    </form>
  );
};

export default SearchBar;
