import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import styles from './Booking.module.css';

// Dynamically importing images
const images = {
  VIP: [
    require('../../assets/Images/Vip.png'),
    require('../../assets/Images/Vip1.png'),
    require('../../assets/Images/Vip2.png'),
  ],
  Special: [
    require('../../assets/Images/Special.png'),
    require('../../assets/Images/Special1.png'),
    require('../../assets/Images/Special2.png'),
  ],
  Regular: [
    require('../../assets/Images/Regular.png'),
    require('../../assets/Images/Regular1.png'),
    require('../../assets/Images/Regular2.png'),
  ],
  Entrance: require('../../assets/Images/Entrance.png'),
};

const Booking = () => {
  const navigate = useNavigate();

  const handleBookingClick = (tableType) => {
    navigate(`/reservation?tableType=${tableType}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${images.Entrance})` }}
      >
        <h1>Welcome to Saffron Spice</h1>
      </div>

      {/* Heading Section */}
      <div className={styles.heading}>
        <div className={styles.name}>
          <p className={styles.h3}>GET YOUR RESERVATION</p>
        </div>
        <div className={styles.content}>
          <button
            className={`btn btn-primary ${styles.menuButton}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <i className="bi bi-grid"></i>
          </button>
        </div>
      </div>

      {/* Sidebar (Offcanvas) */}
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className={`offcanvas-header ${styles.offcanvasHeader}`}>
          <div className={styles.logo}>
            <img src={images.Entrance} alt="Saffron Spice Logo" />
          </div>
          <div className={styles.restaurantName}>
            <span className={styles.restaurantFname}>Saffron</span>
            <span className={styles.restaurantLname}>Spice</span>
          </div>
        </div>
        <div className={`offcanvas-body ${styles.offcanvasBody}`}>
          <button className={`${styles.menuLink}`} onClick={() => navigate('/')}>
            <i className="bi bi-house-door"></i> Home
          </button>
          <button className={`${styles.menuLink}`} onClick={() => navigate('/menu')}>
            <i className="bi bi-list"></i> Menu
          </button>
          <button className={`${styles.menuLink}`} onClick={() => navigate('/login')}>
            <i className="bi bi-person"></i> Login
          </button>
        </div>
      </div>

      {/* Card Container */}
      <div className={styles.cont}>
        {/* VIP Card */}
        <Card
          title="VIP"
          description="Experience premium luxury with our exclusive VIP reservations."
          images={images.VIP}
          onClick={() => handleBookingClick('VIP')}
        />

        {/* Special Card */}
        <Card
          title="Special"
          description="Enjoy a cozy atmosphere with our Special reservations, perfect for small gatherings and celebrations."
          images={images.Special}
          onClick={() => handleBookingClick('Special')}
        />

        {/* Regular Card */}
        <Card
          title="Regular"
          description="Choose a Regular reservation for a comfortable and affordable dining experience."
          images={images.Regular}
          onClick={() => handleBookingClick('Regular')}
        />
      </div>
    </div>
  );
};

const Card = ({ title, description, images, onClick }) => (
  <div className={`card ${styles.card}`}>
    <div id={`carousel-${title}`} className="carousel slide carousel-fade">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#carousel-${title}`}
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((src, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={src} className="d-block w-100" alt={`${title} ${index}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#carousel-${title}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#carousel-${title}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <button className="btn btn-success" onClick={onClick}>
        Book Now
      </button>
    </div>
  </div>
);

export default Booking;
