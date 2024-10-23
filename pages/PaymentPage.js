import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Card, Typography, Box, CardContent, Checkbox, FormControlLabel, Modal } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import './PaymentPage.css';
import productImage from "../assets/Screenshot 2024-09-23 122043.png";
import { FaLock } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import * as cardValidator from 'card-validator';
import { Tabs, Tab } from '@mui/material';
import NavigationBar from '../components/NavigationBar';


const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    cvv: '',
    expirationDate: '',
    paymentMethod: 'card', 
    upiId: '',
    saveCard: false, 
  });
 
  const { cartItems } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingDiscount, setShippingDiscount] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [openModal, setOpenModal] = useState(false); 
  const [cardType, setCardType] = useState(''); 
  const { getCardImageProps, getCardNumberProps } = usePaymentInputs();
  const navigate = useNavigate();

  const [value, setValue] = useState(1); 

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/cart'); 
    } else if (newValue === 2) {
      navigate('/payment'); 
    }
  };

  useEffect(() => {
    const calculateSubTotal = () => {
      return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const calculatedSubTotal = calculateSubTotal();
    const calculatedShippingPrice = (calculatedSubTotal * 3) / 100;
    const calculatedShippingDiscount = (calculatedSubTotal * 2) / 100;
    const calculatedGst = (calculatedSubTotal * 18) / 100;
    const calculatedTotal = calculatedSubTotal + calculatedShippingPrice - calculatedShippingDiscount + calculatedGst;

    setSubTotal(calculatedSubTotal);
    setShippingPrice(calculatedShippingPrice);
    setShippingDiscount(calculatedShippingDiscount);
    setGst(calculatedGst);
    setTotalAmount(calculatedTotal);
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value;
    const cardInfo = cardValidator.number(cardNumber);
    
    setPaymentData({ ...paymentData, cardNumber });

    if (cardInfo.card) {
      setCardType(cardInfo.card.niceType);  
    } else {
      setCardType('');
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentData({ ...paymentData, paymentMethod: method });
  };

  const handleSaveCardChange = (e) => {
    setPaymentData({ ...paymentData, saveCard: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Data:', paymentData);
    setOpenModal(true); 
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleCloseModal = () => {
    const orderDetails = {
      orderNumber: '123456789',
      orderDate: 'September 23, 2024',
      orderTime: '12:30 PM',
      mealIcon: productImage, 
      rating: 4,
    };
  
   
    navigate('/orders', { state: { orderDetails } });
  };
  
  
  

  return (
    <Box p={2} className="payment-container">
    <NavigationBar />
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{ overflow: 'hidden',
    minHeight: '48px',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    fontSize: '38.2rem', 
    marginRight: '-500px',
    marginTop: '-380px',
    marginBottom: '80px',
    
    }}
          >
            <Tab label="Cart" />
            <Tab label="Shipping details" />
            <Tab label="Payment method" />
          </Tabs>
      <Card className="payment-box">
        <CardContent>
          <Grid container spacing={2}>
           
            <Grid item xs={12} md={6} className="left-side">
              <Typography variant="h5" gutterBottom>
                Payment Method
              </Typography>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Box
                  className={`payment-option ${paymentData.paymentMethod === 'card' ? 'active' : 'faded'}`}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  <CreditCardIcon style={{ fontSize: 30, marginRight: 10 }} />
                  <label>Debit/Credit Card</label>
                </Box>

                <Box
                  className={`payment-option ${paymentData.paymentMethod === 'upi' ? 'active' : 'faded'}`}
                  onClick={() => handlePaymentMethodChange('upi')}
                >
                  <AccountBalanceWalletIcon style={{ fontSize: 30, marginRight: 10 }} />
                  <label>UPI</label>
                </Box>
              </Grid>

             
              {paymentData.paymentMethod === 'card' && (
                <Box className="visa-card">
                  <Box className="card-details">
                    <div className="payment-form">
                      <div className="form-group">
                        <label htmlFor="card-number"><b>Card Number</b></label>
                        <span className="input-description">Enter the 16-digit card number on the card</span>
                        <div className="input-container">
                          <input
                            type="text"
                            id="card-number"
                            name="cardNumber"
                            placeholder="XXXX XXXX XXXX 2921"
                            className="input-field"
                            value={paymentData.cardNumber}
                            onChange={handleCardNumberChange}
                          />
                          {cardType && <img {...getCardImageProps({ images })} alt={cardType} className="card-type-image" />}
                          <FaLock className="lock-icon" />
                        </div>
                        <p>Detected Card: {cardType || 'Unknown'}</p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="full-name"><b>Full Name</b></label>
                        <span className="input-description">Enter the name on the card</span>
                        <input
                          type="text"
                          id="full-name"
                          name="cardName"
                          placeholder="Enter Name"
                          className="input-container"
                          value={paymentData.cardName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="cvv"><b>CVV</b></label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="502"
                            className="input-container"
                            value={paymentData.cvv}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="expiry-date"><b>Expiry Date</b></label>
                          <input
                            type="text"
                            id="expiry-date"
                            name="expirationDate"
                            placeholder="03 / 27"
                            className="input-container"
                            value={paymentData.expirationDate}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={paymentData.saveCard}
                          onChange={handleSaveCardChange}
                          color="primary"
                        />
                      }
                      label="Save my card for future"
                    />
                  </Box>
                </Box>
              )}

             
              {paymentData.paymentMethod === 'upi' && (
                <TextField
                  label="UPI ID"
                  name="upiId"
                  fullWidth
                  value={paymentData.upiId}
                  onChange={handleChange}
                  margin="normal"
                  placeholder="Enter your UPI ID"
                  required
                />
              )}

              <Box mt={3} className="payment-buttons">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      fullWidth
                    >
                      Pay Now
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="text"
                      onClick={handleCancel}
                      fullWidth
                      sx={{
                        color: 'grey',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'darkgrey',
                        },
                      }}
                    >
                      Cancel and Return
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          
            <Grid item xs={12} md={6} className="right-side">
            
              <Box className="image-overlap">
                <img src={productImage} alt="Product" className="overlapping-image" />
              </Box>

             
              <Box className="product-section">
                <div className="product-section">Product</div>
                <div className="product-name">Insignia 4-Outlet</div>
              </Box>

             
              <Box className="order-section">
                <div className="order-number-section">Order No.</div>
                <div className="order-number">#123456789</div>
                <div className="order-date-section">Order Date</div>
                <div className="order-date">September 23, 2024</div>
                <Box className="dashed-line"></Box>
                <div className="circle-ball ball1"></div>
                <div className="circle-ball ball2"></div>
              </Box>

             
              <Box className="pricing-details">
                <div className="row">
                  <div className="label">Product Subtotal</div>
                  <div className="price">${subTotal.toFixed(2)}</div>
                </div>

                <div className="row">
                  <div className="label">Shipping</div>
                  <div className="price">${shippingPrice.toFixed(2)}</div>
                </div>

                <div className="row">
                  <div className="label">Shipping Discount</div>
                  <div className="price">-${shippingDiscount.toFixed(2)}</div>
                </div>

                <div className="row">
                  <div className="label">GST</div>
                  <div className="price">${gst.toFixed(2)}</div>
                </div>
                <Box className="line"></Box>

                <div className="total-row">
                  <div className="total-label">Total</div>
                  <div className="total-price">${totalAmount.toFixed(2)}</div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>


      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Order Confirmed!
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Thank you for your order! Your payment has been successfully processed.
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ mt: 2 }}>
             Confirm ✅
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentPage;
