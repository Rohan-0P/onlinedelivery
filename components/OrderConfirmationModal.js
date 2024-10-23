// src/components/OrderConfirmationModal.js
import React from 'react';

const OrderConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Order Confirmation</h2>
        <p>Your order has been successfully placed!</p>
        <button onClick={onConfirm}>Go to Order Details</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
