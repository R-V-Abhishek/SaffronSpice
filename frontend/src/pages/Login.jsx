import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/Images/SaffronSpice.jpeg";

const Login = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div data-bs-theme={theme} className="login-body">
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

      <div className="login-container">
        <div className="logo">
          <img src= {Logo} alt="Saffron Spice Logo" />
        </div>
        <h2>Login to Saffron Spice</h2>
        <form action="#" method="post">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" required />
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
