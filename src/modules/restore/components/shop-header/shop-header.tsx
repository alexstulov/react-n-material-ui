import React from 'react';
import './shop-header.css';
import { useSelector } from "react-redux";
import { ShoppingCartStateType } from '../../reducers';
import { CartItemType } from '../../reducers/shopping-cart';

const ShopHeader = () => {
  const total = useSelector(({shoppingCart}: {shoppingCart: ShoppingCartStateType}) => {
    return {
      amount: shoppingCart.cartItems.reduce((amount: number, item: CartItemType) => amount+item.count, 0),
      price: shoppingCart.orderTotal
    };
  });
  

  return (
    <header className="shop-header row">
      <h2>ReStore</h2>
      <span className="shopping-cart">
        <i className="cart-icon fa fa-shopping-cart" />
        {total.amount} items (${total.price})
      </span>
    </header>
  );
};

export default ShopHeader;
