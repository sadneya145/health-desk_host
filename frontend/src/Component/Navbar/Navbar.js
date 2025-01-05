import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Toggle Button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
          <li><Link to="/records" onClick={() => setIsMenuOpen(false)}>Healthcare Records</Link></li>
          <li><Link to="/hospital-locator" onClick={() => setIsMenuOpen(false)}>Nearby Hospital Locator</Link></li>
          <li><Link to="/appointment-scheduling" onClick={() => setIsMenuOpen(false)}>Schedule Appointment</Link></li>
          <li><Link to="/video_call" onClick={() => setIsMenuOpen(false)}>Video Call Scheduling</Link></li>
          <li><Link to="/textdoc/main" onClick={() => setIsMenuOpen(false)}>Text Your Doctor</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
