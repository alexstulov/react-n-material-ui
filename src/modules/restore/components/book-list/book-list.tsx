import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch} from 'redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {Book} from '../../actions';

import './book-list.css';
import BookStoreService from '../../services/book-store-service';

const BookList = ({books, onAddedToCart}: {books: Book[], onAddedToCart: (id: number) => void}) => {
  return (
    <ul className="book-list">
      {
        books.map((book: Book) => {
          return (
            <li key={book.id}><BookListItem book={book} onAddedToCart={() => { onAddedToCart(book.id) }}/></li>
          )
        })
      }
    </ul>
  );
};

class BookListContainer extends Component<{
  fetchBooks: () => void;
  books: Book[];
  loading: boolean;
  error:boolean;
  onAddedToCart: () => void;
}> {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) return <Spinner/>

    if(error) {
      return <ErrorIndicator />
    }
    
    return <BookList books={books} onAddedToCart={onAddedToCart}/> 
  }
}

interface BookListStateToPropsType {
  bookList: {
    books: Book[];
    loading: boolean;
    error: boolean;
  }
};

const mapStateToProps = ({bookList: { books, loading, error }}: BookListStateToPropsType) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch: Dispatch, { bookstoreService }: {bookstoreService: BookStoreService}) => {
  return bindActionCreators({
    fetchBooks: () => fetchBooks(bookstoreService)(),
    onAddedToCart: (id) => bookAddedToCart(id)
  }, dispatch);
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
