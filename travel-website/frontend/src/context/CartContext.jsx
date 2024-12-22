// CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import React from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [total, setTotal] = useState(0);

  // Update localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      const newTotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
      setTotal(newTotal);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (trip) => {
    try {
      if (!trip.id) {
        throw new Error('Trip must have an id');
      }

      if (cartItems.some((item) => item.id === trip.id)) {
        return { success: false, error: 'Trip already in cart' };
      }

      setCartItems((prevItems) => [...prevItems, { ...trip, price: Number(trip.price) }]);
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: 'Failed to add to cart' };
    }
  };

  const removeFromCart = (tripId) => {
    try {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== tripId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;