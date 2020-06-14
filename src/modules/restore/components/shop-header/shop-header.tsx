import React from 'react';
import './shop-header.css';
import { useSelector } from "react-redux";

const ShopHeader = () => {
  const total: any = useSelector((state: any) => {
    return {
      amount: state.shoppingCart.cartItems.reduce((amount: number, item: any) => amount+item.count, 0),
      price: state.shoppingCart.orderTotal
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
