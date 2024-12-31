import React, { useEffect, useState } from 'react';
import Booking from './Booking';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  const [isBootstrapLoaded, setIsBootstrapLoaded] = useState(false);

  useEffect(() => {
    // Load required resources
    const loadBootstrap = async () => {
      try {
        // Load Bootstrap CSS
        const bootstrapCSS = document.createElement('link');
        bootstrapCSS.rel = 'stylesheet';
        bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        bootstrapCSS.id = 'bootstrap-css';
        document.head.appendChild(bootstrapCSS);

        // Load Bootstrap Icons
        const iconsCSS = document.createElement('link');
        iconsCSS.rel = 'stylesheet';
        iconsCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
        iconsCSS.id = 'bootstrap-icons-css';
        document.head.appendChild(iconsCSS);

        // Load Bootstrap JS
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        setIsBootstrapLoaded(true);
      } catch (error) {
        console.error('Error loading Bootstrap:', error);
      }
    };

    loadBootstrap();

    // Cleanup function
    return () => {
      // Remove Bootstrap CSS
      const bootstrapCSS = document.getElementById('bootstrap-css');
      if (bootstrapCSS) {
        bootstrapCSS.remove();
      }

      // Remove Bootstrap Icons
      const iconsCSS = document.getElementById('bootstrap-icons-css');
      if (iconsCSS) {
        iconsCSS.remove();
      }

      // Remove any Bootstrap-related classes from body
      document.body.classList.remove(...Array.from(document.body.classList).filter(cls => cls.startsWith('bs-')));
    };
  }, []);

  if (!isBootstrapLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.bookingPage}>
      <Booking />
    </div>
  );
};

export default BookingPage;
