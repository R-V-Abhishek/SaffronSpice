import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
        <li><Link to="/Login">Booking</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/#speciality">Speciality</Link></li>
        <li><Link to="/#about">About Us</Link></li>
        <li><Link to="/#contact">Contact Us</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
