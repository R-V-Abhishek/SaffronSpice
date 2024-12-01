import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import styles from './Booking.module.css';

const Booking = () => {
  const navigate = useNavigate();

  const handleBookingClick = (tableType) => {
    navigate(`/reservation?tableType=${tableType}`);
  };

  return (
    <div>
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

      {/* Sidebar (Offcanvas) */}
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
            <div className={styles.logo}>
              <img src="../assets/Images/Entrance.png" alt="Saffron Spice Logo" />
            </div>
            <div className={styles.restaurantFname}>Saffron</div>
            <div className={styles.restaurantLname}>Spice</div>
          </div>
        </div>
        <div className="offcanvas-body">
          <button className="menu-link" onClick={() => navigate('/')}>
            <i className="bi bi-house-door"></i> Home
          </button>
          <button className="menu-link" onClick={() => navigate('/menu')}>
            <i className="bi bi-list"></i> Menu
          </button>
          <button className="menu-link" onClick={() => navigate('/login')}>
            <i className="bi bi-person"></i> Login
          </button>
        </div>
      </div>

      {/* Card Container */}
      <div className={styles.cont}>
        {/* VIP Card */}
        <div className="card" style={{width: '18rem'}}>
          <div id="carouselExampleCaptions1" className="carousel slide carousel-fade">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="../assets/Images/Vip.png" className="d-block w-100" alt="VIP" />
              </div>
              <div className="carousel-item">
                <img src="../assets/Images/Vip1.png" className="d-block w-100" alt="VIP 1" />
              </div>
              <div className="carousel-item">
                <img src="../assets/Images/Vip2.png" className="d-block w-100" alt="VIP 2" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions1" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions1" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="card-body">
            <h5 className="card-title">VIP</h5>
            <p className="card-text">Experience premium luxury with our exclusive VIP reservations.</p>
            <button className="btn btn-success" onClick={() => handleBookingClick('VIP')}>Book Now</button>
          </div>
        </div>

        {/* Special Card */}
        <div className="card" style={{width: '18rem'}}>
          <div id="carouselExampleCaptions2" className="carousel slide carousel-fade">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions2" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions2" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions2" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="../assets/Images/Special.png" className="d-block w-100" alt="Special" />
              </div>
              <div className="carousel-item">
                <img src="../assets/Images/Special1.png" className="d-block w-100" alt="Special 1" />
              </div>
              <div className="carousel-item">
                <img src="../assets/Images/Special2.png" className="d-block w-100" alt="Special 2" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions2" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions2" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="card-body">
            <h5 className="card-title">Special</h5>
            <p className="card-text">Enjoy a cozy atmosphere with our Special reservations, perfect for small gatherings and celebrations.</p>
            <button className="btn btn-success" onClick={() => handleBookingClick('Special')}>Book Now</button>
          </div>
        </div>

        {/* Regular Card */}
        <div className="card" style={{width: '18rem'}}>
          <div id="carouselExampleCaptions3" className="carousel slide carousel-fade">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions3" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions3" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions3" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="../assets/Images/Regular.png" className="d-block w-100" alt="Regular" />
              </div>
              <div className="carousel-item">
                <img src="../assets/Images/Regular1.png" className="d-block w-100" alt="Regular 1" />
              </div>
              <div className="carousel-item">
                <img src="../assets/Images/Regular2.png" className="d-block w-100" alt="Regular 2" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions3" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions3" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="card-body">
            <h5 className="card-title">Regular</h5>
            <p className="card-text">Choose a Regular reservation for a comfortable and affordable dining experience.</p>
            <button className="btn btn-success" onClick={() => handleBookingClick('Regular')}>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
