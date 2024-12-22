import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, total, checkout } = useCart();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await checkout();
      if (result.success) {
        navigate(`/payment-success/${result.orderId}`);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} className="checkout-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className="checkout-total">
          <strong>Total:</strong>
          <strong>${total}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <h3>Payment Details</h3>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              placeholder="123"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="name"
            value={paymentDetails.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Payment'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;