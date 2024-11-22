import React from 'react';
import './Header.css';
import logo from '../assets/images/SaffronSpice.jpeg';

function Header() {
  const toggleProfileCard = () => {
    const profileCard = document.getElementById('profile-card');
    profileCard.classList.toggle('active');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Saffron Spice Logo" className="logo" />
      </div>

      <div className="name">
        <div className="restaurant-fname">Saffron</div>
        <div className="restaurant-lname">Spice</div>
      </div>

      <div className="profile-container">
        <div className="profile-pic" onClick={toggleProfileCard}></div>
        <div className="profile-card" id="profile-card">
          <h3>John Doe</h3>
          <p>Chef & Owner</p>
          <p>Serving delicious meals since 2000!</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
