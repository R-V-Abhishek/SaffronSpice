import { apiUrl } from '../services/apiConfig';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./SignUp.module.css";
import Logo from "../assets/SaffronSpice.jpeg";
import { apiUrl } from "../services/apiConfig";

const SignUp = () => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Dynamically apply the theme to the body and document elements
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(apiUrl("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }));

      const result = await response.json();

      if (response.ok) {
        setShowSuccessPopup(true);
      } else {
        setErrorMessage(result.message || "Signup failed.");
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setShowErrorPopup(true);
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[theme + "Theme"]}`}>
      {/* Toggle Theme */}
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

      {/* SignUp Form */}
      <div className={styles.signupBody}>
        <div className={styles.signupContainer}>
          <div className={styles.logo}>
            <img src={Logo} alt="Saffron Spice Logo" />
          </div>
          <h2 className={styles.heading}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.colSm}>
                <div className={styles.formGroup}>
                  <label htmlFor="fname">First Name:</label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="First name"
                    required
                    className={styles.formControl}
                  />
                </div>
              </div>
              <div className={styles.colSm}>
                <div className={styles.formGroup}>
                  <label htmlFor="lname">Last Name:</label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder="Last name"
                    required
                    className={styles.formControl}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.colSm}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    className={styles.formControl}
                  />
                </div>
              </div>
              <div className={styles.colSm}>
                <div className={styles.formGroup}>
                  <label htmlFor="dob">DOB:</label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    required
                    className={styles.formControl}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                required
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                required
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirm_password"
                placeholder="Confirm your password"
                required
                className={styles.formControl}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Success!</h3>
            <p>Your account has been created successfully.</p>
            <button
              className={styles.popupButton}
              onClick={() => {
                setShowSuccessPopup(false);
                navigate("/Login");
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Error</h3>
            <p>{errorMessage}</p>
            <button
              className={styles.popupButton}
              onClick={() => setShowErrorPopup(false)}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
