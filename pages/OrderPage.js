import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './OrderPage.css'; // Import the CSS file

const OrderPage = () => {
  const { orders } = useContext(CartContext); // Retrieve orders from context

  return (
    <div className="order-page-container">
      <div className="order-header">
        {/* Replacing the icon with text "MY ORDERS" on the left side */}
        <h1 className="my-orders-title">MY ORDERS</h1>
        {/* Cart icon or any other details can go on the right */}
        <div className="cart-icon-container">
          {/* Place the cart icon or other necessary components here */}
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="orders-container">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header">
                <h3>Order#: {order.orderNumber}</h3>
                <p>{order.date}</p>
              </div>
              <div className="order-body">
                <div className="order-info">
                  <p className="delivery-status">Status: {order.deliveryStatus}</p>
                  <p className="delivery-date">Expected Delivery: {order.deliveryDate}</p>
                </div>
                <div className="order-rating">
                  <span>Rating: </span>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <div className="order-image">
                  <img src={order.items[0].imageUrl} alt="Product" />
                </div>
              </div>
              <div className="order-total">
                <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-orders">You have not placed any orders yet.</p>
      )}
    </div>
  );
};

export default OrderPage;
