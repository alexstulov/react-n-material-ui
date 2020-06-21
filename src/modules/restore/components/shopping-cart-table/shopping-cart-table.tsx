import React from "react";
import "./shopping-cart-table.css";
import { connect } from "react-redux";
import { bookAmountIncreased, bookAmountDecreased, bookDeletedFromCart} from '../../actions';
import { CartItemType } from "../../reducers/shopping-cart";
import { ReduxStateType } from "../../reducers";
import { Dispatch } from "redux";

interface ShoppingCartTableType {
  items: CartItemType[];
  total: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
}

const ShoppingCartTable = ({
  items,
  total,
  onIncrease,
  onDecrease,
  onDelete,
}: ShoppingCartTableType) => {
  const renderRow = ({id,title,count,total}: CartItemType, index: number) => {
    return (
      <tr key={id}>
        <td>{index+1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td>
          <button 
          onClick={() => onDelete(id)} 
          className="btn btn-outline-danger btn-sm float-right">
            <i className="fa fa-trash-o" />
          </button>
          <button 
          onClick={() => onDecrease(id)}
          className="btn btn-outline-warning btn-sm float-right">
            <i className="fa fa-minus-circle" />
          </button>
          <button 
          onClick={() => onIncrease(id)}
          className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-plus-circle" />
          </button>
        </td>
      </tr>
    );
  };
  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map(renderRow)}
        </tbody>
      </table>

      <div className="total">Total: ${total}</div>
    </div>
  );
};

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal}}: ReduxStateType) => {
  return {
    items: cartItems,
    total: orderTotal
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onIncrease: (id: number) => dispatch(bookAmountIncreased(id)),
    onDecrease: (id: number) => dispatch(bookAmountDecreased(id)),
    onDelete: (id: number) => dispatch(bookDeletedFromCart(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
