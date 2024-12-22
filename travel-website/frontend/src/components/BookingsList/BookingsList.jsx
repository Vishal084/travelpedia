import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './BookingsList.css';

const BookingsList = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`your-api/bookings`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const calculateRefundAmount = (startDate, price) => {
    const today = new Date();
    const tripDate = new Date(startDate);
    const daysUntilTrip = Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntilTrip >= 15) return price;
    if (daysUntilTrip >= 7) return price * 0.5;
    return 0;
  };

  const handleCancellation = async (bookingId, startDate, price) => {
    const refundAmount = calculateRefundAmount(startDate, price);
    
    try {
      const response = await fetch(`your-api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ refundAmount })
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div className="bookings-list">
      <h2>My Bookings</h2>
      {bookings.map(booking => (
        <div key={booking.id} className="booking-card">
          <img src={booking.trip.imageUrl} alt={booking.trip.name} className="booking-image" />
          <div className="booking-details">
            <h3>{booking.trip.name}</h3>
            <p>Date: {new Date(booking.trip.startDate).toLocaleDateString()}</p>
            <p>Price: ${booking.trip.price}</p>
            <p>Status: {booking.status}</p>
            {booking.status === 'active' && (
              <button 
                onClick={() => handleCancellation(booking.id, booking.trip.startDate, booking.trip.price)}
                className="cancel-button"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;