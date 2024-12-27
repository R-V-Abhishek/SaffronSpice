import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import './HomePage.css';
// Import images
import biryaniImg from '../assets/Images/ChickenBiryani.png';
import curryImg from '../assets/Images/ChickenCurry.png';
import tandooriImg from '../assets/Images/ButterChicken.png';
import videoThumbnail from '../assets/Images/VideoThumbnail.png';
import alooGobiImg from '../assets/Images/AlooGobi.png';
import bainganBhartaImg from '../assets/Images/BainganBharta.png';
import paneerButterMasalaImg from '../assets/Images/PaneerButterMasala.png';

function HomePage() {
  const [activeReview, setActiveReview] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reviews data
  const reviews = [
    { text: "The best biryani I've ever had! The flavors are simply out of this world.", author: "Ananya" },
    { text: "Saffron Spice is my go-to place for authentic Indian food. Highly recommend!", author: "Rajesh" },
    { text: "A true taste of India. The curries and naan were absolutely divine.", author: "Priya" }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

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

    // Show back-to-top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      clearInterval(reviewInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reviews.length]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading Saffron Spice...
        </motion.h2>
      </div>
    );
  }

  return (
    <motion.div initial="initial" animate="animate">
      <section className="hero parallax-bg">
        <div className="hero-overlay"></div>
        <motion.div className="hero-content" variants={fadeInUp}>
          <h1 style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            <TypeAnimation
              sequence={[
                'Welcome to Saffron Spice',
                3000, // Increased duration
                'Experience Indian Cuisine',
                3000  // Increased duration
              ]}
              wrapper="span"
              repeat={Infinity}
            />
          </h1>
          <a href="#about" className="cta-button pulse" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
          }}>
            Discover More
          </a>
        </motion.div>
      </section>

      <section id="quick-info" className="quick-info animated-section">
        <div className="info-grid">
          <div className="info-item">
            <span>Open Daily: 11 AM - 10 PM</span>
          </div>
          <div className="info-item">
            <span>Free Parking Available</span>
          </div>
          <div className="info-item">
            <span>Reservations Available</span>
          </div>
        </div>
      </section>

      <section id="about" className="about animated-section">
        <motion.h2 variants={fadeInUp}>About Us</motion.h2>
        <motion.div className="about-content" variants={staggerChildren}>
          <div className="about-text">
            <h3>Our Story</h3>
            <p>
              Since 2008, Saffron Spice has been serving authentic Indian cuisine with passion and dedication. Our master chefs bring decades of culinary expertise from various regions of India, ensuring each dish tells a story of tradition and flavor.
            </p>
            <p>
              We take pride in using premium ingredients, hand-ground spices, and time-honored cooking techniques to create an unforgettable dining experience for our guests.
            </p>
            <p>
              Our restaurant has become a landmark destination for food enthusiasts seeking authentic Indian flavors. We continue to innovate while staying true to traditional recipes passed down through generations.
            </p>
          </div>
          <div className="about-stats">
            <motion.div className="stat" whileHover={{ scale: 1.05 }}>
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Excellence</span>
            </motion.div>
            <motion.div className="stat" whileHover={{ scale: 1.05 }}>
              <span className="stat-number">50+</span>
              <span className="stat-label">Signature Dishes</span>
            </motion.div>
            <motion.div className="stat" whileHover={{ scale: 1.05 }}>
              <span className="stat-number">1000+</span>
              <span className="stat-label">Happy Customers</span>
            </motion.div>
            <motion.div className="stat" whileHover={{ scale: 1.05 }}>
              <span className="stat-number">4.8</span>
              <span className="stat-label">Customer Rating</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <motion.section
        variants={staggerChildren}
        id="speciality"
        className="speciality"
      >
        <motion.h2 variants={fadeInUp}>Our Speciality</motion.h2>
        <motion.div className="speciality-grid" variants={staggerChildren}>
          {[
            { img: biryaniImg, title: 'Royal Biryani', desc: 'Fragrant basmati rice cooked with aromatic spices' },
            { img: curryImg, title: 'Butter Chicken', desc: 'Creamy tomato gravy with tender chicken pieces' },
            { img: tandooriImg, title: 'Tandoori Platter', desc: 'Assortment of grilled delicacies' },
            { img: alooGobiImg, title: 'Aloo Gobi', desc: 'Potatoes and cauliflower cooked with spices' },
            { img: bainganBhartaImg, title: 'Baingan Bharta', desc: 'Smoky mashed eggplant cooked with spices' },
            { img: paneerButterMasalaImg, title: 'Paneer Butter Masala', desc: 'Paneer cubes in a rich tomato gravy' }
          ].map((dish, index) => (
            <motion.div
              key={index}
              className="dish-card"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={dish.img} alt={dish.title} loading="lazy" />
              <div className="dish-info">
                <h3>{dish.title}</h3>
                <p>{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="view-more-container">
          <Link to="/menu" className="view-more-button">View More</Link>
        </div>
      </motion.section>

      <motion.section id="reviews" className="reviews animated-section" variants={fadeInUp}>
        <motion.h2 variants={fadeInUp}>Customer Reviews</motion.h2>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className={`review-card ${index === activeReview ? 'active' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: index === activeReview ? 1 : 0.5, scale: index === activeReview ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <p>{review.text}</p>
              <span className="author">- {review.author}</span>
            </motion.div>
          ))}
        </div>
        <div className="review-dots">
          {reviews.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeReview ? 'active' : ''}`}
              onClick={() => setActiveReview(index)}
            ></span>
          ))}
        </div>
      </motion.section>

      <section id="video-intro" className="video-intro animated-section">
        <motion.h2 variants={fadeInUp}>Watch Our Story</motion.h2>
        <motion.div className="video-container" variants={fadeInUp}>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
            <img src={videoThumbnail} alt="Watch Our Story" className="video-thumbnail" />
          </a>
        </motion.div>
      </section>

      <section id="contact" className="contact animated-section">
        <motion.h2 variants={fadeInUp}>Contact Us</motion.h2>
        <motion.div className="contact-content" variants={staggerChildren}>
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
        </motion.div>
      </section>

      {showBackToTop && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </motion.div>
  );
}

export default HomePage;
