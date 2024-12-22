import React from 'react';
import { useCart } from '../../context/CartContext';

const TripCard = ({ trip }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const result = addToCart(trip);
    if (result.success) {
      alert('Trip added to cart successfully!');
    } else {
      alert(result.error || 'Failed to add trip to cart');
    }
  };

  return (
    <div className="trip-card">
      <img src={trip.imageUrl} alt={trip.name} className="trip-image" />
      <div className="trip-details">
        <h3>{trip.name}</h3>
        <p>{trip.description}</p>
        <p>Price: ${trip.price}</p>
        <p>Duration: {trip.duration} days</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default TripCard;