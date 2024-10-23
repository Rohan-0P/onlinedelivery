// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import images1 from './food/eight.jpg';
import images2 from './food/first.jpg';
import images3 from './food/five.jpg';
import images4 from './food/four.jpg';
import images5 from './food/nine.jpg';
import images6 from './food/eight.jpg'
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Layout from './components/Layout';
import Checkout from './pages/Checkout';
import HomeComponent from './components/HomeComponent';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';  
import OrderPage from './pages/OrderPage';   
import { CartProvider } from './context/CartContext';
import CartIcon from './components/CartIcon';   
const App = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const imagesList = [images1, images2, images3, images4, images5, images6];

  const rotateClockwise = () => {
    setRotationAngle((prev) => prev + 36);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
  };

  const rotateCounterclockwise = () => {
    setRotationAngle((prev) => prev - 36);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesList.length) % imagesList.length);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Router>
      <CartProvider>
        <Layout>
          <div className="food-card">
          <header className="header">
  <Link to="/" className="logo">🍴</Link>
  
  <div className="hamburger" onClick={toggleMenu}>☰</div>

  {/* Navigation Links */}
  <nav className={`nav-menu ${isMenuOpen ? 'hidden' : ''}`}>
    <Link to="/breakfast">Breakfast</Link>
    <Link to="/lunch">Lunch</Link>
    <Link to="/dinner">Dinner</Link>
  </nav>

  {/* "MY ORDERS" and Cart Icon */}
  <div className="orders-cart-container">
    <Link to="/orders" className="orders-link">
      MY ORDERS
    </Link>
    <CartIcon />
  </div>
</header>



            <Routes>
              <Route path="/breakfast" element={<Breakfast />} />
              <Route path="/lunch" element={<Lunch />} />
              <Route path="/dinner" element={<Dinner />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} /> 
              <Route path="/orders" element={<OrderPage />} />   
              <Route path="/" element={<HomeComponent imagesList={imagesList} currentIndex={currentIndex} rotationAngle={rotationAngle} rotateClockwise={rotateClockwise} rotateCounterclockwise={rotateCounterclockwise} />} />
            </Routes>

            <footer className="footer">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            </footer>
          </div>
        </Layout>
      </CartProvider>
    </Router>
  );
};

export default App;
