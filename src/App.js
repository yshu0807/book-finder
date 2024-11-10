import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router components
import BookCard from './BookCard';
import './App.css';

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
  }, [searchQuery, page]); // Dependency array includes searchQuery and page

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setPage(1); // Reset to the first page for a new search
    fetchBooks();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="app">
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

      {loading && <div className="loading-spinner"></div>}
      {error && <div className="error">{error}</div>}

      <div className="books-container">
        {books.length === 0 && !loading && !error && <p>No books found.</p>}

        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

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

function BookDetailsPage() {
  // This page can display details of a selected book
  return (
    <div className="book-details">
      <h2>Book Details</h2>
      <p>Details of the selected book will go here.</p>
      {/* Add more details based on selected book */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/book-details">Book Details</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-details" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;