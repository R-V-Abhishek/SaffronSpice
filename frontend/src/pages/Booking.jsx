// Booking.jsx
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Booking.module.css';

// Dynamically importing images
const images = {
  VIP: [
    require('../assets/Vip.png'),
    require('../assets/Vip1.png'),
    require('../assets/Vip2.png'),
  ],
  Special: [
    require('../assets/Special.png'),
    require('../assets/Special1.png'),
    require('../assets/Special2.png'),
  ],
  Regular: [
    require('../assets/Regular.png'),
    require('../assets/Regular1.png'),
    require('../assets/Regular2.png'),
  ],
  Entrance: require('../assets/Entrance.png'),
  Logo: require('../assets/SaffronSpice.jpeg'),
};

const Booking = () => {
  const navigate = useNavigate();

  const handleBookingClick = useCallback((tableType) => {
    navigate(`/reservation?tableType=${tableType}`, { replace: false });
  }, [navigate]);

  useEffect(() => {
    // Initialize all carousels
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
      new window.bootstrap.Carousel(carousel, {
        interval: 3000,
        wrap: true
      });
    });

    // Initialize offcanvas
    const offcanvasElements = document.querySelectorAll('.offcanvas');
    offcanvasElements.forEach(element => {
      new window.bootstrap.Offcanvas(element);
    });

    return () => {
      // Cleanup Bootstrap components
      carousels.forEach(carousel => {
        const instance = window.bootstrap.Carousel.getInstance(carousel);
        if (instance) {
          instance.dispose();
        }
      });

      offcanvasElements.forEach(element => {
        const instance = window.bootstrap.Offcanvas.getInstance(element);
        if (instance) {
          instance.dispose();
        }
      });
    };
  }, []);

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
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <div className={`offcanvas-title ${styles.offcanvasTitle}`}>
            <div className={styles.restaurantFname}>Saffron</div>
            <div className={styles.logo}>
              <img src={images.Logo} alt="Saffron Spice Logo" />
            </div>
            <div className={styles.restaurantLname}>Spice</div>
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
    <div className={styles.cardBody}>
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <button className={styles.bookButton} onClick={onClick}>
        Book Now
      </button>
    </div>
  </div>
);

export default Booking;