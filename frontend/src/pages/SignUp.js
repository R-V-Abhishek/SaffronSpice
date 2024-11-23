import React, { useState } from "react";
import "./SignUp.css"; // Ensure the styles from the HTML are migrated here
import Logo from "../assets/Images/SaffronSpice.jpeg";

const SignUp = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Example of sending the data to a backend
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Sign up successful!");
      })
      .catch((error) => {
        alert("Error during sign up.");
      });
  };

  return (
    <div data-bs-theme={theme} className="signup-body">
      <div className="form-check form-switch mx-4">
        <div className="theme-labels">
          <input
            className="form-check-input p-2"
            type="checkbox"
            role="switch"
            id="themeToggle"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </div>
      </div>

      <div className="signup-container">
        <div className="logo">
          <img src={Logo} alt="Saffron Spice Logo" />
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <label htmlFor="fname">First Name:</label>
                  <input type="text" name="fname" id="fname" placeholder="First name" required />
                </div>
              </div>
              <div className="col-sm">
                <div className="form-group">
                  <label htmlFor="lname">Last Name:</label>
                  <input type="text" name="lname" id="lname" placeholder="Last name" required />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <label htmlFor="mail">Email:</label>
                  <input type="email" name="email" id="mail" placeholder="Enter your email" required />
                </div>
              </div>
              <div className="col-sm">
                <div className="form-group">
                  <label htmlFor="dob">DOB:</label>
                  <input type="date" name="dob" id="dob" required />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phn">Phone Number:</label>
            <input type="tel" name="phone" id="phn" placeholder="Phone Number" required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Enter your password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" name="confirmPassword" id="confirm_password" placeholder="Confirm your password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
