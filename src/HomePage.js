import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';  // Import the BookCard component
import './HomePage.css';  // Add custom styling if needed

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch books whenever searchQuery or page changes
  useEffect(() => {
    if (searchQuery) {
      fetchBooks();
    }
  }, [searchQuery, page]);

  // Function to fetch books from the Open Library API
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${searchQuery}&page=${page}`);
      setBooks(response.data.docs);
      setTotalPages(Math.ceil(response.data.numFound / 100)); // Assuming 100 results per page
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for search bar
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Trigger the search when the button is clicked
  const handleSearchClick = () => {
    setPage(1); // Reset to the first page for a new search
    fetchBooks();
  };

  // Handle pagination for next page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Handle pagination for previous page
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="home-page">
      <header>
        <h1>Book Finder</h1>
        <div className="search-form">
          <input
            type="text"
            placeholder="Search for a book"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button onClick={handleSearchClick} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </header>

      {/* Show loading spinner while fetching data */}
      {loading && <div className="loading-spinner">Loading...</div>}

      {/* Show error message if fetching fails */}
      {error && <div className="error">{error}</div>}

      <div className="books-container">
        {/* Show message when no books are found */}
        {books.length === 0 && !loading && !error && <p>No books found.</p>}

        {/* Render book cards */}
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      {/* Pagination buttons */}
      {books.length > 0 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
