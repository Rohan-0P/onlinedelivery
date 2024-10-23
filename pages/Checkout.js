import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Container, Button, Typography, CssBaseline } from '@mui/material';
import CheckoutNavigation from '../components/CheckoutNavigation';
import './Checkout.css'; 

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProceedToShipping = () => {
    if (cartItems.length > 0) {
      navigate('/shipping');
    } else {
      alert('Your cart is empty!');
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 4,
        boxShadow: '0px 8px 16px rgba(0,0,0,0.1)',
      }}
    >
      <CssBaseline />
      <CheckoutNavigation /> 
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Checkout
      </Typography>

     
      <div className="checkout-summary-container">
        <Typography variant="h6" className="total">
          Total: ${totalAmount}
        </Typography>
        <Button
          onClick={handleProceedToShipping}
          variant="contained"
          className="checkout-button"
        >
          Proceed to Shipping
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div className="checkout-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="product-card">
                <img src={item.img} alt={item.name} className="product-image" />
                <div className="product-info">
                  <Typography variant="h6" className="product-title">
                    {item.name}
                  </Typography>
                  <Typography variant="body1" className="product-description">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" className="product-price">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" className="product-quantity">
                    Quantity: {item.quantity}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Checkout;
