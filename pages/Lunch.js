import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Lunch.css'; 
import lunch1 from '../assets/indian.jpg'; 
import lunch2 from '../assets/lunch 2.jpg';
import lunch3 from "../assets/lunch 1.jpg";
import lunch4 from "../assets/lunch.jpg";
import { CartContext } from '../context/CartContext';

const Lunch = () => {
  const navigate = useNavigate();
  const { cartItems, dispatch } = useContext(CartContext);

  const lunchItems = [
    { name: 'Grilled Salad', price: 12.99, img: lunch1 },
    { name: 'Turkey Sandwich', price: 9.99, img: lunch2 },
    { name: 'Vegetable Stir-fry', price: 10.99, img: lunch3 },
    { name: 'Beef Burger', price: 11.99, img: lunch4 },
  ];

  const addToCart = (product) => {
    const itemInCart = cartItems.find(item => item.name === product.name);

    if (!itemInCart) {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    } else {
      dispatch({ type: 'INCREMENT_QUANTITY', payload: { name: product.name } });
    }
  };

  const incrementQuantity = (productName) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: { name: productName } });
  };

  const decrementQuantity = (productName) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: { name: productName } });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="lunch-page">
      <div className="beige-circle"></div>
      <header className="lunch-header">
        <h1>Hearty Lunch</h1>
        <p>Refuel your afternoon with a delicious and balanced lunch!</p>
      </header>

      <div className="cart-icon" onClick={() => navigate('/checkout')}>
        <span className="icon">🛒</span>
        <span className="item-count">
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </div>

      <div className="lunch-grid">
        {lunchItems.map((item) => {
          const itemInCart = cartItems.find(cartItem => cartItem.name === item.name);

          return (
            <div key={item.name} className="lunch-item">
              <img src={item.img} alt={item.name} />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>${item.price}</p>
                
                {itemInCart ? (
                  <div className="checkout-controls">
                    <button onClick={() => decrementQuantity(item.name)}>-</button>
                    <span>{itemInCart.quantity}</span>
                    <button onClick={() => incrementQuantity(item.name)}>+</button>
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                  </div>
                ) : (
                  <button className="add-to-cart-button" onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lunch;
