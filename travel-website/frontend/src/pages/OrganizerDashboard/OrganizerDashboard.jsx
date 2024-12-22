import React from 'react';
import './OrganizerDashboard.css';

const OrganizerDashboard = () => {
  return (
    <div className="organizer-dashboard">
      <header className="dashboard-header">
        <h1>Organizer Dashboard</h1>
        <p>Manage your events efficiently.</p>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Create Event</h3>
          <p>Plan and set up a new event for attendees.</p>
        </div>
        <div className="dashboard-card">
          <h3>View Events</h3>
          <p>See a list of all your organized events.</p>
        </div>
        <div className="dashboard-card">
          <h3>Manage Attendees</h3>
          <p>Track and interact with event participants.</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
