import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../../context/TripContext';
import './TripsPage.css';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const handleMoreDetails = () => {
    navigate(`/trip/${trip.id}`);
  };

  return (
    <div className="trip-card">
      <div className="trip-image">
        <img src={trip.imageUrl} alt={trip.name} />
        <div className="trip-badge">
          {trip.availableSlots > 0 ? `${trip.availableSlots} slots left` : 'Sold Out'}
        </div>
      </div>
      <div className="trip-content">
        <h3 className="trip-title">{trip.name}</h3>
        <p className="trip-dates">
          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </p>
        <p className="trip-description">{trip.description.substring(0, 100)}...</p>
        <div className="trip-footer">
          <span className="trip-price">${trip.price.toLocaleString()}</span>
          <button 
            className="details-button"
            onClick={handleMoreDetails}
            disabled={trip.availableSlots === 0}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

const TripsPage = () => {
  const { trips, loading } = useTrips();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing trips...</p>
      </div>
    );
  }

  return (
    <div className="trips-page">
      <div className="trips-header">
        <h1>Featured Trips</h1>
        <p>Discover your next unforgettable adventure</p>
      </div>
      <div className="trips-grid">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default TripsPage;