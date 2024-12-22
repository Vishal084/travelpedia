import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";
import "./LoginPage.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("data");
    setData(savedData ? JSON.parse(savedData) : []);
  }, []);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const user = data.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        login({ username: user.username, email: user.email });
        alert("Logged in successfully");
        navigate("/dashboard");
      } else {
        alert("Incorrect password. Please try again.");
      }
    } else {
      if (window.confirm("User does not exist. Would you like to sign up?")) {
        navigate("/signup");
      }
    }
  };

  // Redirect to signup page
  const handleSignupRedirect = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="text">
        <h1>Login</h1>
        <form id="login-form" onSubmit={handleFormSubmit}>
          <input
            className="inp1"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="inp2"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span id="signupLink">
            <a onClick={handleSignupRedirect} style={{ color: "blue" }}>
              Sign up
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

