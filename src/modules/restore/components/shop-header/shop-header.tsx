import React from 'react';
import './shop-header.css';

const ShopHeader = ({ numItems, total }: any) => {
  return (
    <header className="shop-header row">
      <h2>ReStore</h2>
      <span className="shopping-cart">
        <i className="cart-icon fa fa-shopping-cart" />
        {numItems} items (${total})
      </span>
    </header>
  );
};

export default ShopHeader;
