import updateBookList from "./book-list";
import updateShoppingCart from "./shopping-cart";
import { Book } from "../actions";
import {CartItemType} from '../reducers/shopping-cart';

export interface BookListStateType {
  books: Book[];
  loading: boolean;
  error: boolean;
}

export interface ShoppingCartStateType {
  cartItems: CartItemType[];
  orderTotal: number;
}

export interface ReduxStateType {
  bookList: BookListStateType
  shoppingCart: ShoppingCartStateType
}

const initialState: ReduxStateType = {
  bookList: {
    books:[],
    loading: true,
    error: false
  },
  shoppingCart: {
    cartItems: [],
    orderTotal: 0
  }
}

const reducer = (state: ReduxStateType = initialState, action: any) => {
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action),
  };
};

export default reducer;
