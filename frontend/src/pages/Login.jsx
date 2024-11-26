import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../assets/Images/SaffronSpice.jpeg";

const Login = () => {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate(); // Hook for navigation

  // Update the theme on the root element (e.g., <html>)
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Perform login logic here (e.g., authentication checks)

    // On successful login, navigate to Booking page
    navigate("/booking");
  };

  return (
    <div className="login-body">
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
          <label htmlFor="themeToggle" className="ms-2">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </label>
        </div>
      </div>

      <div className="login-container">
        <div className="logo">
          <img src={Logo} alt="Saffron Spice Logo" />
        </div>
        <h2>Login to Saffron Spice</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-decoration-none">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
