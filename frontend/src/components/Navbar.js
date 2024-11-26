import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Login">Booking</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/#speciality">Speciality</Link></li> {/* Updated */}
        <li><Link to="/#about">About Us</Link></li>
        <li><Link to="/#contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
