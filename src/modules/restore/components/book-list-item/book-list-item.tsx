import React from 'react';
import './book-list-item.css';
import { Book } from '../../actions';

const BookListItem = ({ book, onAddedToCart }: {book: Book, onAddedToCart: () => void}) => {
  const { title, author, price, coverImage } = book;
  return (
    <div className="book-list-item">
      <div className="book-cover">
        <img src={coverImage} alt="cover" />
      </div>
      <div className="book-details">
        <span className="book-title">{title}</span>
        <div className="book-author">{author}</div>
        <div className="book-price">${price}</div>
        <button 
          onClick={onAddedToCart} 
          className="btn btn-info add-to-cart">
          Add to cart
        </button>
      </div>

    </div>
  );
};

export default BookListItem;
