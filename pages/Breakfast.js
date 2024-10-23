import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Breakfast.css'; 
import breakfast1 from '../assets/pexels-sheenawood-574111.jpg'; 
import breakfast2 from '../assets/pexels-emrahtolu-2662875.jpg';
import breakfast3 from "../assets/pexels-life-of-pix-101533.jpg";
import breakfast4 from "../assets/pexels-pixabay-414555.jpg"; 
import { CartContext } from '../context/CartContext'; // Import the CartContext

const Breakfast = () => {
  const navigate = useNavigate();
  const { cartItems, dispatch } = useContext(CartContext); // Use context values

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
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="breakfast-page">
      <div className="beige-circle"></div>

      <header className="breakfast-header">
        <h1>Delicious Breakfast</h1>
        <p>Start your day with a hearty and nutritious breakfast!</p>
      </header>

      <div className="cart-icon" onClick={() => navigate('/checkout')}>
        <span className="icon">🛒</span>
        <span className="item-count">
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </div>

      <div className="breakfast-grid">
        {[ 
          { name: 'Classic Pancakes', price: 8.99, img: breakfast1 },
          { name: 'Healthy Smoothie', price: 5.99, img: breakfast2 },
          { name: 'Fruity Crumb', price: 7.99, img: breakfast3 },
          { name: 'Coffee MATO', price: 3.99, img: breakfast4 }
        ].map((item) => {
          const itemInCart = cartItems.find(cartItem => cartItem.name === item.name);

          return (
            <div key={item.name} className="breakfast-item">
              <img src={item.img} alt={item.name} />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>${item.price}</p>
                
                {itemInCart ? (
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(item.name)}>-</button>
                    <span>{itemInCart.quantity}</span>
                    <button onClick={() => incrementQuantity(item.name)}>+</button>
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breakfast;
