import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem("data")) || [];
    users.push({ username, email, password });
    localStorage.setItem("data", JSON.stringify(users));

    setMessage("User registered successfully!");
    setShowPopup(true);

    // Clear form
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  // Handle popup confirmation
  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <form id="registerForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Registration Successful</h3>
            <p>{message}</p>
            <button onClick={handlePopupConfirm}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
