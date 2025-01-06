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
        <li><Link to="/" onClick={handleHomeClick} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/Login" className={location.pathname === '/Login' ? 'active' : ''}>Booking</Link></li>
        <li><Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>Menu</Link></li>
        <li><Link to="/#contact" className={location.pathname === '/#contact' ? 'active' : ''}>Contact Us</Link></li>
        <li><Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>Cart</Link></li>
        <li><Link to="/view-order" className={location.pathname === '/view-order' ? 'active' : ''}>View Your Orders</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
