import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Logo from "../assets/Images/SaffronSpice.jpeg";

const Login = () => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  // Dynamically load Bootstrap styles
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css";
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

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., authentication checks)
    navigate("/booking");
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
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>
          <p className={styles.signupLink}>
            Don't have an account?{" "}
            <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;