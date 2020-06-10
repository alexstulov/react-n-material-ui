

const booksLoaded = (newBooks: any) => {
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
  
  const booksError = (error:any) => {
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
  
  const fetchBooks = (bookstoreService: any) => () => (dispatch: any) => {
    dispatch(booksRequested());
    bookstoreService.getBooks().then((data: any) => {
      dispatch(booksLoaded(data));
    }).catch((error: any) => {
      dispatch(booksError(error));
    });
  }
  
  
  export { fetchBooks, bookAddedToCart, bookAmountIncreased, bookAmountDecreased, bookDeletedFromCart };
  