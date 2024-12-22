import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css'
const Cart = () => {
  const { cartItems, total, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  console.log('Cart Items:', cartItems); // Debug log

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {!cartItems || cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/trips')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                )}
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  {item.startDate && (
                    <p>Date: {new Date(item.startDate).toLocaleDateString()}</p>
                  )}
                  <p>Price: ${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;