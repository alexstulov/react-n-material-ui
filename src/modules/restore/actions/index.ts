import BookStoreService from '../services/book-store-service';
import { Dispatch } from 'redux';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}

const booksLoaded = (newBooks: Book[]) => {
    return {
      type: "FETCH_BOOKS_REQUEST",
      payload: newBooks,
    };
  };
  
  const booksRequested = () => {
    return {
      type: "FETCH_BOOKS_SUCCESS",
    };
  };
  
  const booksError = (error: Error) => {
    return {
      type: "FETCH_BOOKS_FAILURE",
      payload: error
    };
  };
  
  const bookAddedToCart = (id: number) => {
    return {
      type: 'BOOK_ADDED_TO_CART',
      payload: id
    }
  }
  const bookAmountIncreased = (id: number) => {
    return {
      type: 'BOOK_ADDED_TO_CART',
      payload: id
    }
  }
  const bookAmountDecreased = (id: number) => {
    return {
      type: 'BOOK_AMOUNT_DECREASED',
      payload: id
    }
  }
  const bookDeletedFromCart = (id: number) => {
    return {
      type: 'BOOK_DELETED_FROM_CART',
      payload: id
    }
  }
  
  // const fetchBooksOld = (bookstoreService, dispatch) => () => {
  //   dispatch(booksRequested());
  //   bookstoreService.getBooks().then((data) => {
  //     dispatch(booksLoaded(data));
  //   }).catch((error) => {
  //     dispatch(booksError(error));
  //   });
  // }
  
  // here thunk allows us replace fetchBooksOld with the form below
  // beside this it simplifies mapDispatchToProps in book-list.js
  
  const fetchBooks = (bookstoreService: BookStoreService) => () => (dispatch: Dispatch) => {
    dispatch(booksRequested());
    bookstoreService.getBooks().then((data: Book[] | any) => {
      dispatch(booksLoaded(data));
    }).catch((error: Error) => {
      dispatch(booksError(error));
    });
  }
  
  
  export { fetchBooks, bookAddedToCart, bookAmountIncreased, bookAmountDecreased, bookDeletedFromCart };
  