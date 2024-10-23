import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Dinner.css'; 
import dinner1 from '../assets/dinner 2.jpg'; 
import dinner2 from '../assets/dinner 3.jpg'; 
import dinner3 from "../assets/dinner 4.jpg"; 
import dinner4 from "../assets/dinner.jpg"; 
import { CartContext } from '../context/CartContext'; 

const Dinner = () => {
  const navigate = useNavigate();
  const { cartItems, dispatch } = useContext(CartContext);

  const addToCart = (product) => {
    const itemInCart = cartItems.find(item => item.name === product.name);
    if (!itemInCart) {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    } else {
      incrementQuantity(product.name);
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
    <div className="dinner-page">
      <div className="beige-circle"></div>
      <header className="dinner-header">
        <h1>Delicious Dinner</h1>
        <p>End your day with a flavorful and fulfilling dinner!</p>
      </header>

      <div className="cart-icon" onClick={() => navigate('/checkout')}>
        <span className="icon">🛒</span>
        <span className="item-count">
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </div>

      <div className="dinner-grid">
        {[{
          name: 'Steak with Vegetables', price: 15.99, img: dinner1
        }, {
          name: 'Grilled Salmon', price: 13.99, img: dinner2
        }, {
          name: 'Pasta Alfredo', price: 11.99, img: dinner3
        }, {
          name: 'Vegetarian Pizza', price: 9.99, img: dinner4
        }].map((item) => {
          const itemInCart = cartItems.find(cartItem => cartItem.name === item.name);

          return (
            <div key={item.name} className="dinner-item">
              <img src={item.img} alt={item.name} />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
                
                {itemInCart ? (
                  <div className="quantity-controls">
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

export default Dinner;   
