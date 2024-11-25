import React from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const navigate = useNavigate();

  const handleBooking = (type) => {
    navigate(`/reservation/${type}`); // Navigate to ReservationForm with tableType
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Saffron Spice</h1>
      </div>

      {/* Heading Section */}
      <div className="heading">
        <div className="name">
          <p className="h3">GET YOUR RESERVATION</p>
        </div>
        <div className="content">
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

      {/* Offcanvas Section */}
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
            <div className="restaurant-fname">Saffron</div>
            <div className="logo">
              <img
                src="/src/assets/images/SaffronSpice.jpeg"
                alt="Saffron Spice Logo"
              />
            </div>
            <div className="restaurant-lname">Spice</div>
          </div>
        </div>
        <div className="offcanvas-body">
          <a href="./index.html" className="menu-link">
            <i className="bi bi-house-door"></i> Home
          </a>
          <a href="./menu.html" className="menu-link">
            <i className="bi bi-list"></i> Menu
          </a>
          <a href="./loginnew.html" className="menu-link">
            <i className="bi bi-person"></i> Login
          </a>
        </div>
      </div>

      {/* Reservation Cards */}
      <div className="cont">
        {/* Card Components */}
        {["VIP", "Special", "Regular"].map((type, index) => (
          <div key={index} className="card" style={{ width: "18rem" }}>
            <div id={`carousel${index}`} className="carousel slide carousel-fade">
              <div className="carousel-indicators">
                {[0, 1, 2].map((item) => (
                  <button
                    key={item}
                    type="button"
                    data-bs-target={`#carousel${index}`}
                    data-bs-slide-to={item}
                    className={item === 0 ? "active" : ""}
                    aria-current={item === 0 ? "true" : undefined}
                    aria-label={`Slide ${item + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/src/assets/images/AlooGobi.png"
                    className="d-block w-100"
                    alt="Aloo Gobi"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/src/assets/images/BainganBharta.png"
                    className="d-block w-100"
                    alt="Baingan Bharta"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel${index}`}
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel${index}`}
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="card-body">
              <h5 className="card-title">{type}</h5>
              <p className="card-text">
                {type === "VIP"
                  ? "Experience premium luxury with our exclusive VIP reservations."
                  : type === "Special"
                  ? "Enjoy a cozy atmosphere with our Special reservations."
                  : "Book a Regular table for an enjoyable dining experience."}
              </p>
              <button
                onClick={() => handleBooking(type)}
                className="btn btn-success"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
