import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>  {/* Changed to Link */}
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/menu">Menu</Link></li>  {/* Changed to Link */}
        <li><a href="#speciality">Speciality</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

