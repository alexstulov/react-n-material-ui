const updateCartItems = (cartItems: any, item: any, index: number) => {
    if (item.count === 0) {
      return [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
    }
  
    if (index === -1) {
      return [...cartItems, item];
    }
  
    return [...cartItems.slice(0, index), item, ...cartItems.slice(index + 1)];
  };
  
  const updateCartItem = (book: any, item: any = {}, quantity: number) => {
    const { id = book.id, count = 0, title = book.title, total = 0 } = item;
  
    return {
      id,
      title,
      count: count + quantity,
      total: total + quantity * book.price,
    };
  };
  
  const updateOrder = (state: any, bookId: number, quantity: number) => {
    const { bookList: {books}, shoppingCart: {cartItems} } = state;
    // @ts-ignore
    const book = books.find(({ id }) => id === bookId);
    // @ts-ignore
    const bookInCartIndex = cartItems.findIndex(({ id }) => id === bookId);
    const bookInCart = state.shoppingCart.cartItems[bookInCartIndex];
  
    const newItem = updateCartItem(book, bookInCart, quantity);
  
    const newItems = updateCartItems(state.shoppingCart.cartItems, newItem, bookInCartIndex);
    const newOrderTotal = newItems.reduce((sum: number, item: any) => sum+item.total, 0);

    return {
      orderTotal: newOrderTotal,
      cartItems: newItems,
    };
  };
  
  
  const updateShoppingCart = (state: any, action: any) => {
  
    if (state === undefined) {
      return {
        cartItems: [],
        orderTotal: 0,
      }
    }
  
    switch(action.type) {
      case "BOOK_ADDED_TO_CART":
        return updateOrder(state, action.payload, 1);
      case "BOOK_AMOUNT_DECREASED":
        return updateOrder(state, action.payload, -1);
      case "BOOK_DELETED_FROM_CART":
          // @ts-ignore
        const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload);
        return updateOrder(state, action.payload, -item.count);
      default:
        return state.shoppingCart;
    }
  };

  export default updateShoppingCart;