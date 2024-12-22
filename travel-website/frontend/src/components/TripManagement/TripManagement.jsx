import React, { useState } from 'react';
import { useTrips } from '../../context/TripContext';
import './TripManagement.css';

const TripManagement = () => {
  const { trips, addTrip, updateTrip, deleteTrip } = useTrips();
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    startDate: '',
    endDate: '',
    availableSlots: '',
    imageUrl: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tripData = {
      ...formData,
      price: parseFloat(formData.price),
      availableSlots: parseInt(formData.availableSlots)
    };

    if (editingTrip) {
      await updateTrip(editingTrip.id, tripData);
      setEditingTrip(null);
    } else {
      await addTrip(tripData);
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      startDate: '',
      endDate: '',
      availableSlots: '',
      imageUrl: '',
      location: ''
    });
    setIsAddingTrip(false);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setFormData({
      name: trip.name,
      description: trip.description,
      price: trip.price.toString(),
      startDate: trip.startDate,
      endDate: trip.endDate,
      availableSlots: trip.availableSlots.toString(),
      imageUrl: trip.imageUrl,
      location: trip.location
    });
    setIsAddingTrip(true);
  };

  const handleDelete = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      await deleteTrip(tripId);
    }
  };

  return (
    <div className="trip-management">
      <div className="header">
        <h2>Trip Management</h2>
        <button 
          onClick={() => setIsAddingTrip(true)}
          className="add-trip-button"
        >
          Add New Trip
        </button>
      </div>

      {isAddingTrip && (
        <form onSubmit={handleSubmit} className="trip-form">
          <h3>{editingTrip ? 'Edit Trip' : 'Add New Trip'}</h3>
          <div className="form-group">
            <label>Trip Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Available Slots</label>
              <input
                type="number"
                name="availableSlots"
                value={formData.availableSlots}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">{editingTrip ? 'Update Trip' : 'Add Trip'}</button>
            <button 
              type="button" 
              onClick={() => {
                setIsAddingTrip(false);
                setEditingTrip(null);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="trips-list">
        {trips.map(trip => (
          <div key={trip.id} className="trip-item">
            <img src={trip.imageUrl} alt={trip.name} className="trip-image" />
            <div className="trip-details">
              <h3>{trip.name}</h3>
              <p>{trip.description}</p>
              <p>Price: ${trip.price}</p>
              <p>Available Slots: {trip.availableSlots}</p>
              <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
              <div className="trip-actions">
                <button onClick={() => handleEdit(trip)}>Edit</button>
                <button onClick={() => handleDelete(trip.id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripManagement;