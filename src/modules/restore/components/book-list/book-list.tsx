import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { bindActionCreators} from 'redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

const BookList = ({books, onAddedToCart}: any) => {
  return (
    <ul className="book-list">
      {
        books.map((book: any) => {
          return (
            <li key={book.id}><BookListItem book={book} onAddedToCart={() => { onAddedToCart(book.id) }}/></li>
          )
        })
      }
    </ul>
  );
};

class BookListContainer extends Component<any, any> {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart }: any = this.props;

    if (loading) return <Spinner/>

    if(error) {
      return <ErrorIndicator />
    }
    
    return <BookList books={books} onAddedToCart={onAddedToCart}/> 
  }
}

const mapStateToProps = ({bookList: { books, loading, error }}: any) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch: any, { bookstoreService }: any) => {
  return bindActionCreators({
    fetchBooks: () => fetchBooks(bookstoreService)(),
    onAddedToCart: (id) => bookAddedToCart(id)
  }, dispatch);
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
