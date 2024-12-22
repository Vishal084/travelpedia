import React from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '../../context/TripContext';
import TripCard from '../../components/TripCard/TripCard';
import './Home.css';

const Home = () => {
  const { trips, loading } = useTrips();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-overlay">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
            alt="Travel"
            className="hero-image"
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Adventure</h1>
          <p className="hero-description">
            Explore breathtaking destinations, create unforgettable memories, and experience
            the world's most amazing places with our curated travel experiences.
          </p>
          <div className="hero-button">
            <Link to="/trips" className="btn-primary">
              Browse All Trips
            </Link>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="features-container">
          <div className="feature">
            <div className="feature-icon">📍</div>
            <h3 className="feature-title">Handpicked Destinations</h3>
            <p className="feature-description">
              Carefully selected locations that offer unique and authentic experiences.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Flexible Booking</h3>
            <p className="feature-description">
              Easy booking process with flexible cancellation policies.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">👨‍🏫</div>
            <h3 className="feature-title">Expert Guides</h3>
            <p className="feature-description">
              Professional guides to ensure the best travel experience.
            </p>
          </div>
        </div>
      </div>

      <div className="featured-trips">
        <div className="featured-trips-container">
          <div className="featured-trips-header">
            <h2 className="featured-trips-title">Featured Trips</h2>
            <p className="featured-trips-description">
              Discover our most popular destinations and experiences.
            </p>
          </div>
          <div className="trips-grid">
            {trips.slice(0, 6).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
          {trips.length > 3 && (
            <div className="view-all-trips">
              <Link to="/trips" className="btn-secondary">
                View All Trips
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;