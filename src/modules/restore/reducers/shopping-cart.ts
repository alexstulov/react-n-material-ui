import { Book } from "../actions";
import { ReduxStateType } from ".";

export interface CartItemType {
  id: number;
  title: string;
  count: number;
  total: number;
};

const updateCartItems = (cartItems: CartItemType[], item: CartItemType, index: number) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
  }

  if (index === -1) {
    return [...cartItems, item];
  }

  return [...cartItems.slice(0, index), item, ...cartItems.slice(index + 1)];
};

const updateCartItem = (book: Book, item: CartItemType = {id: book.id, count: 0, title: book.title, total: 0}, quantity: number) => {
  const { id, count, title, total } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price,
  };
};

const updateOrder = (state: ReduxStateType, bookId: number, quantity: number) => {
  const { bookList: { books }, shoppingCart: { cartItems } } = state;
  const book = books.find(({ id }) => id === bookId);

  let newItems = state.shoppingCart.cartItems;
  let newOrderTotal = newItems.reduce((sum: number, item: CartItemType) => sum + item.total, 0);

  if (book) {
    const bookInCartIndex = cartItems.findIndex(({ id }) => id === bookId);
    const bookInCart = state.shoppingCart.cartItems[bookInCartIndex];
  
    const newItem = updateCartItem(book, bookInCart, quantity);
  
    newItems = updateCartItems(state.shoppingCart.cartItems, newItem, bookInCartIndex);
    newOrderTotal = newItems.reduce((sum: number, item: CartItemType) => sum + item.total, 0);
  }

  return {
    orderTotal: newOrderTotal,
    cartItems: newItems,
  };
};


const updateShoppingCart = (state: ReduxStateType, action: any) => {

  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0,
    }
  }

  switch (action.type) {
    case "BOOK_ADDED_TO_CART":
      return updateOrder(state, action.payload, 1);
    case "BOOK_AMOUNT_DECREASED":
      return updateOrder(state, action.payload, -1);
    case "BOOK_DELETED_FROM_CART":
      // @ts-ignore
      const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload);
      if (!item) {
        return state.shoppingCart;
      }
      return updateOrder(state, action.payload, -item.count);
    default:
      return state.shoppingCart;
  }
};

export default updateShoppingCart;