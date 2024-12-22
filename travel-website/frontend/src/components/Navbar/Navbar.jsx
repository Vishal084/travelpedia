import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Menu, X, ShoppingCart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="mobile-header">
            <Link to="/" className="navbar-logo">
              <span className="navbar-logo-text">TravelApp</span>
            </Link>
            
            <div className="mobile-actions">
              <Link to="/cart" className="cart-icon-mobile">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
              <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div className={`navbar-links-container ${isMenuOpen ? 'open' : ''}`}>
            <div className="navbar-links">
              <Link 
                to="/" 
                className="nav-link"
                onClick={() => handleNavigation('/')}
              >
                Home
              </Link>
              <Link 
                to="/trips" 
                className="nav-link"
                onClick={() => handleNavigation('/trips')}
              >
                Trips
              </Link>
              <Link 
                to="/about" 
                className="nav-link"
                onClick={() => handleNavigation('/about')}
              >
                About
              </Link>
            </div>

            <div className="nav-right">
              <div className="auth-section">
                <Link 
                  to="/login" 
                  className="login-button"
                  onClick={() => handleNavigation('/login')}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="signup-button"
                  onClick={() => handleNavigation('/signup')}
                >
                  Sign Up
                </Link>
              </div>

              <Link to="/cart" className="cart-icon-desktop">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;