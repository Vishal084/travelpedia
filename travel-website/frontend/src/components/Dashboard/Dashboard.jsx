import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTrips } from '../../context/TripContext';
import TripManagement from '../TripManagement/TripManagement';
import BookingsList from '../BookingsList/BookingsList';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { trips } = useTrips();
  const [activeTab, setActiveTab] = React.useState('bookings');

  const isOrganizer = user?.role === 'organizer';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <div className="dashboard-tabs">
          {isOrganizer && (
            <button
              className={`tab ${activeTab === 'trips' ? 'active' : ''}`}
              onClick={() => setActiveTab('trips')}
            >
              Manage Trips
            </button>
          )}
          <button
            className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === 'trips' && isOrganizer && <TripManagement />}
        {activeTab === 'bookings' && <BookingsList />}
      </div>
    </div>
  );
};

export default Dashboard;