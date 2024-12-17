import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../assets/Images/SaffronSpice.jpeg";

function Header() {
  const [userData, setUserData] = useState(null); // State to store user data

  // Function to toggle the profile card visibility
  const toggleProfileCard = () => {
    const profileCard = document.getElementById("profile-card");
    profileCard.classList.toggle("active");
  };

  // Fetch user data using the userId from localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Set fetched user data in state
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
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
              <p>Email: {userData.email || "N/A"}</p>
              <p>Role: {userData.role || "Guest"}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
