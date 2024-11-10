import React from 'react';

const BookDetailsModal = ({ book, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{book.title}</h2>
        <p>Author: {book.author_name ? book.author_name[0] : 'Unknown'}</p>
        <p>Publisher: {book.publisher ? book.publisher[0] : 'Unknown'}</p>
        <p>Year: {book.first_publish_year || 'Unknown'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookDetailsModal;
