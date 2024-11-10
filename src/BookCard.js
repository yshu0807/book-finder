import React from 'react';

function BookCard({ book }) {
  // Check if the book has a cover image and display it; otherwise, display a placeholder
  const coverImageUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150?text=No+Image';

  return (
    <div className="book-card">
      {/* Conditionally render the image */}
      <img
        src={coverImageUrl}
        alt={book.title ? `${book.title} book cover` : 'Book cover not available'}
        className="book-cover"
      />
      
      <div className="book-details">
        <h3>{book.title}</h3>
        
        {/* Display author(s) or fallback if not available */}
        <p>{book.author_name ? book.author_name.join(', ') : 'Unknown author'}</p>

        {/* Display the first publish year or fallback */}
        <p>Year: {book.publish_year ? book.publish_year[0] : 'Unknown'}</p>

        {/* Provide a link to the book on Open Library */}
        <a 
          href={`https://openlibrary.org${book.key}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="view-link"
        >
          View on Open Library
        </a>
      </div>
    </div>
  );
}

export default BookCard;
