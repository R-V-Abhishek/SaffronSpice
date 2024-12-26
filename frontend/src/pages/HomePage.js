import React, { useEffect, useState } from 'react';
import './HomePage.css';
// Import images
import biryaniImg from '../assets/Images/ChickenBiryani.png';
import curryImg from '../assets/Images/ChickenCurry.png';
import tandooriImg from '../assets/Images/ButterChicken.png';

function HomePage() {
  const [activeReview, setActiveReview] = useState(0);

  // Reviews data
  const reviews = [
    { text: "The best biryani I've ever had! The flavors are simply out of this world.", author: "Ananya" },
    { text: "Saffron Spice is my go-to place for authentic Indian food. Highly recommend!", author: "Rajesh" },
    { text: "A true taste of India. The curries and naan were absolutely divine.", author: "Priya" }
  ];

  useEffect(() => {
    // Intersection Observer for animated sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('.animated-section');
    sections.forEach((section) => observer.observe(section));

    // Auto-rotate reviews
    const reviewInterval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(reviewInterval);
    };
  }, [reviews.length]);

  return (
    <div>
      <section className="hero parallax-bg">
        <div className="hero-overlay"></div>
        <div className="hero-content animated-section">
          <h1>Welcome to Saffron Spice</h1>
          <p>Experience the authentic flavors of India</p>
          <a href="#about" className="cta-button pulse">
            Discover More
          </a>
        </div>
      </section>

      <section id="quick-info" className="quick-info animated-section">
        <div className="info-grid">
          <div className="info-item">
            <i className="clock-icon"></i>
            <span>Open Daily: 11 AM - 10 PM</span>
          </div>
          <div className="info-item">
            <i className="location-icon"></i>
            <span>Free Parking Available</span>
          </div>
          <div className="info-item">
            <i className="delivery-icon"></i>
            <span>Reservations Available</span>
          </div>
        </div>
      </section>

      <section id="about" className="about animated-section">
        <h2>About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              At Saffron Spice, we bring the flavors of India to life with hand-picked ingredients, traditional recipes, and a touch of love. Indulge in the most authentic dishes crafted to perfection!
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Signature Dishes</span>
            </div>
          </div>
        </div>
      </section>

      <section id="speciality" className="speciality animated-section">
        <h2>Our Speciality</h2>
        <div className="speciality-grid">
          <div className="dish-card">
            <img src={biryaniImg} alt="Royal Biryani" loading="lazy" />
            <div className="dish-info">
              <h3>Royal Biryani</h3>
              <p>Fragrant basmati rice cooked with aromatic spices</p>
            </div>
          </div>
          <div className="dish-card">
            <img src={curryImg} alt="Butter Chicken" loading="lazy" />
            <div className="dish-info">
              <h3>Butter Chicken</h3>
              <p>Creamy tomato gravy with tender chicken pieces</p>
            </div>
          </div>
          <div className="dish-card">
            <img src={tandooriImg} alt="Tandoori Platter" loading="lazy" />
            <div className="dish-info">
              <h3>Tandoori Platter</h3>
              <p>Assortment of grilled delicacies</p>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="reviews animated-section">
        <h2>What Our Customers Say</h2>
        <div className="reviews-slider">
          {reviews.map((review, index) => (
            <blockquote 
              key={index}
              className={`review-card ${index === activeReview ? 'active' : ''}`}
            >
              {review.text}
              <span className="author">- {review.author}</span>
            </blockquote>
          ))}
          <div className="review-dots">
            {reviews.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === activeReview ? 'active' : ''}`}
                onClick={() => setActiveReview(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact animated-section">
        <h2>Contact Us</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p>123 Spice Street, Flavor Town, India</p>
            <p>Phone: +91 123 456 7890</p>
            <p>Email: info@saffronspice.com</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509273!2d144.96305771582256!3d-37.81410787975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577801d5a9a33f2!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sin!4v1617319162321!5m2!1sen!2sin"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
