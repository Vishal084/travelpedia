// src/pages/PaymentPage/PaymentPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Dummy payment logic
    alert('Payment Successful! Thank you for your purchase.');
    navigate('/home'); // Redirect to the home page or another page
  };

  return (
    <div className="payment-page-container">
      <h2>Payment Page</h2>
      <p>Total Amount: $<strong>{/* Add total amount dynamically if needed */}</strong></p>
      <div className="payment-form">
        <label>
          Card Number:
          <input type="text" placeholder="1234 5678 9012 3456" />
        </label>
        <label>
          Expiry Date:
          <input type="text" placeholder="MM/YY" />
        </label>
        <label>
          CVV:
          <input type="text" placeholder="123" />
        </label>
        <button onClick={handlePayment} className="pay-button">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
