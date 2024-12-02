import React, { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Icons
import 'bootstrap/js/dist/carousel'; // Carousel JS
import 'bootstrap/js/dist/offcanvas'; // Offcanvas JS

// Import the Booking component and its styles
import Booking from './Booking';
import styles from './BookingPage.module.css'; // CSS Module for custom styles

const BookingPage = () => {
  useEffect(() => {
    // Dynamically import Bootstrap SCSS when the component is rendered
    import('bootstrap/scss/bootstrap.scss')
      .then(() => {
        // Styles are now loaded, you can trigger any other actions if necessary
      })
      .catch((err) => {
        console.error("Error loading Bootstrap SCSS", err);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className={styles.bookingPage}>
      <Booking />
    </div>
  );
};

export default BookingPage;
