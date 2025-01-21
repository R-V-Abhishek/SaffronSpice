import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import styles from "./Login.module.css";
import Logo from "../assets/SaffronSpice.jpeg";
import { isAuthenticated } from "../utils/authUtils"; // Import the utility function
import { setAuthData } from "../utils/authUtils";
const Login = () => {
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState(""); // State to track errors
  const navigate = useNavigate();
  const location = useLocation(); // Get location object

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/Booking"); // Redirect to the Booking page or any other protected route
    }
  }, [navigate]);

  // Set up custom back navigation
  useEffect(() => {
    const handlePopState = (event) => {
      // If we're on the login page and user clicks back
      if (location.pathname === '/login') {
        event.preventDefault();
        navigate('/', { replace: true }); // Navigate to home page
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location]);

  // Dynamically load Bootstrap styles
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css";
    link.id = "bootstrap-css";
    document.head.appendChild(link);

    return () => {
      const existingLink = document.getElementById("bootstrap-css");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, []);

  // Apply the theme to the body and document elements
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Store userId and token in localStorage
        const { userId, token } = result;
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);

        navigate("/Booking", { 
          replace: false, 
          state: { fromLogin: true } 
        }); // Redirect to booking page
      } else {
        setError(result.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[theme + "Theme"]}`}>
      {/* Theme Toggle */}
      <div className={styles.formCheck}>
        <label className={styles.formCheckLabel} htmlFor="themeToggle">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </label>
        <input
          className={styles.formCheckInput}
          type="checkbox"
          id="themeToggle"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
      </div>

      <div className={styles.loginBody}>
        <div className={styles.loginContainer}>
          <div className={styles.logo}>
            <img src={Logo} alt="Saffron Spice Logo" />
          </div>
          <h2 className={styles.heading}>Login to Saffron Spice</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className={styles.formControl}
              />
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>
          <p className={styles.signupLink}>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
