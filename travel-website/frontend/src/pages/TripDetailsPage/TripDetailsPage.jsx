import React from 'react';
import { useCart } from '../../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';

const TripDetailsPage = ({ trips }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const trip = trips.find((trip) => trip.id === parseInt(id));

  const handleAddToCart = () => {
    const result = addToCart(trip);
    if (result.success) {
      alert('Trip added to cart!');
      navigate('/cart');
    } else {
      alert(result.error);
    }
  };

  return (
    <div>
      <h1>{trip.name}</h1>
      <p>{trip.description}</p>
      <p>Price: ${trip.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default TripDetailsPage;
