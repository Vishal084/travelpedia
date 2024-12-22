import React from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>View and manage your events effortlessly.</p>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>My Events</h3>
          <p>See the events you’ve registered for.</p>
        </div>
        <div className="dashboard-card">
          <h3>Upcoming Events</h3>
          <p>Stay updated with upcoming events.</p>
        </div>
        <div className="dashboard-card">
          <h3>Profile</h3>
          <p>Update your account details and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
