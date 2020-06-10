import updateBookList from "./book-list";
import updateShoppingCart from "./shopping-cart";

const reducer = (state: any, action: any) => {
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action),
  };
};

export default reducer;
