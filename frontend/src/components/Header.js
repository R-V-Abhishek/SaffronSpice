import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/SaffronSpice.jpeg";
import { isAuthenticated, clearAuthData } from "../utils/authUtils"; // Import the utility functions

function Header() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Toggle visibility of the profile card
  const toggleProfileCard = () => {
    const profileCard = document.getElementById("profile-card");
    profileCard.classList.toggle("active");
  };

  // Fetch user data using userId from localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle user logout
  const handleLogout = () => {
    clearAuthData(); // Clear user data from localStorage
    window.location.href = "/"; // Force a full reload and redirect to the homepage
  };  

  // Handle navigation to Login page
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const profileContainer = document.querySelector('.profile-container');
      const toggleProfileButton = document.querySelector('.toggle-profile-button'); // Assuming there's a button to toggle the profile container

      toggleProfileButton.addEventListener('click', () => {
        profileContainer.classList.toggle('open');
      });
    });
  }, []);

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
          {userData ? (
            <>
              <h3>{userData.name || "Unknown User"}</h3>
              <p>Username: {userData.username || "N/A"}</p>

              {/* Logout Button */}
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <p>Please login to view your profile</p>
              {/* Login Button (only visible when no user is logged in) */}
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
