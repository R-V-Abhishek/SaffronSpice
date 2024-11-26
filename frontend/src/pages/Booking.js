import React, { useEffect } from "react";
import styles from "./Booking.module.css"; // Scoped CSS module

const Booking = () => {
  useEffect(() => {
    // Dynamically load Bootstrap CSS and icons
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.rel = "stylesheet";
    bootstrapCSS.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css";
    bootstrapCSS.integrity =
      "sha384-rbsA/9gl5HQmkU6PlNnXUQlmteTfvCSvW6EG3EdwNJlxT6n4e7Bj1oydK8V41Wjk";
    bootstrapCSS.crossOrigin = "anonymous";

    const bootstrapIcons = document.createElement("link");
    bootstrapIcons.rel = "stylesheet";
    bootstrapIcons.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";

    document.head.appendChild(bootstrapCSS);
    document.head.appendChild(bootstrapIcons);

    return () => {
      document.head.removeChild(bootstrapCSS);
      document.head.removeChild(bootstrapIcons);
    };
  }, []);

  return (
    <div className={styles.body}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1>Welcome to Saffron Spice</h1>
      </div>

      {/* Heading Section */}
      <div className={styles.heading}>
        <div className={styles.name}>
          <p className={styles.h3}>GET YOUR RESERVATION</p>
        </div>
        <div className={styles.content}>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <i className="bi bi-grid"></i>
          </button>
        </div>
      </div>

      {/* Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <div className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            <div className={styles["restaurant-fname"]}>Saffron</div>
            <div className={styles.logo}>
              <img
                src="../assets/Images/SaffronSpice.jpeg"
                alt="Saffron Spice Logo"
              />
            </div>
            <div className={styles["restaurant-lname"]}>Spice</div>
          </div>
        </div>
        <div className="offcanvas-body">
          <a href="/" className={styles["menu-link"]}>
            <i className="bi bi-house-door"></i> Home
          </a>
          <a href="/menu" className={styles["menu-link"]}>
            <i className="bi bi-list"></i> Menu
          </a>
          <a href="/login" className={styles["menu-link"]}>
            <i className="bi bi-person"></i> Login
          </a>
        </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cont}>
        {["VIP", "Special", "Regular"].map((type, index) => (
          <div
            key={index}
            className={`card ${styles.card}`}
            style={{ width: "18rem" }}
          >
            <div
              id={`carouselExampleCaptions${index + 1}`}
              className="carousel slide carousel-fade"
            >
              <div className="carousel-inner">
                {[`${type}.png`, `${type}1.png`, `${type}2.png`].map(
                  (image, idx) => (
                    <div
                      key={idx}
                      className={`carousel-item ${
                        idx === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={`../assets/Images/${image}`}
                        className="d-block w-100"
                        alt={type}
                      />
                    </div>
                  )
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselExampleCaptions${index + 1}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carouselExampleCaptions${index + 1}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="card-body">
              <h5 className="card-title">{type}</h5>
              <p className="card-text">
                {`Enjoy ${type.toLowerCase()} reservations for ${
                  type === "VIP"
                    ? "premium luxury"
                    : type === "Special"
                    ? "cozy gatherings"
                    : "casual dining"
                }.`}
              </p>
              <a
                href={`/booking?tableType=${type}`}
                className="btn btn-success"
                role="button"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
