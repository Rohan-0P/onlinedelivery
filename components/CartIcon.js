// src/components/CartIcon.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartIcon.css'; // Ensure you have appropriate styles
import { CartProvider } from '../context/CartContext'; // Ensure this path is correct


const CartIcon = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleCartClick = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <div className="cart-icon" onClick={handleCartClick}>
      <span className="icon">🛒</span>
      <span className="item-count">
        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </div>
  );
};

export default CartIcon;
