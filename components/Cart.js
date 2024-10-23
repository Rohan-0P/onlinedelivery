// Cart.js
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart }) => {
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.name}>
              {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
            </li>
          ))}
        </ul>
      )}
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
