import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrips } from '../../context/TripContext';
import './TripDetails.css';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useTrips();
  
  // Find the specific trip
  const trip = trips.find(t => t.id === id);

  if (!trip) {
    return (
      <div className="error-container">
        <h2>Trip not found</h2>
        <button onClick={() => navigate('/trips')} className="back-button">
          Back to Trips
        </button>
      </div>
    );
  }

  const handleBookNow = () => {
    // Add to cart logic here
    navigate('/cart');
  };

  return (
    <div className="trip-details-container">
      <div className="trip-details-header">
        <button onClick={() => navigate('/trips')} className="back-button">
          ← Back to Trips
        </button>
      </div>
      
      <div className="trip-details-content">
        <div className="trip-details-image">
          <img src={trip.imageUrl} alt={trip.name} />
          {trip.availableSlots === 0 && (
            <div className="sold-out-badge">Sold Out</div>
          )}
        </div>

        <div className="trip-details-info">
          <h1>{trip.name}</h1>
          
          <div className="trip-meta">
            <div className="trip-dates">
              <h3>Trip Dates</h3>
              <p>From: {new Date(trip.startDate).toLocaleDateString()}</p>
              <p>To: {new Date(trip.endDate).toLocaleDateString()}</p>
            </div>
            
            <div className="trip-availability">
              <h3>Availability</h3>
              <p>{trip.availableSlots} spots available out of {trip.totalSlots}</p>
            </div>
          </div>

          <div className="trip-description">
            <h3>Description</h3>
            <p>{trip.description}</p>
          </div>

          <div className="trip-pricing">
            <div className="price">
              <h3>Price per person</h3>
              <span className="amount">${trip.price.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={handleBookNow}
              className="book-button"
              disabled={trip.availableSlots === 0}
            >
              {trip.availableSlots === 0 ? 'Sold Out' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;