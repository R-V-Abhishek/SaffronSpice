import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import './HomePage.css';
import CountUp from "../components/CountUp";
import GradientText from "../components/GradientText"; 
import { FaClock, FaParking, FaConciergeBell, FaWifi } from 'react-icons/fa';

// Import images
import biryaniImg from '../assets/Images/ChickenBiryani.png';
import curryImg from '../assets/Images/ChickenCurry.png';
import tandooriImg from '../assets/Images/ButterChicken.png';
import videoThumbnail from '../assets/Images/VideoThumbnail.png';
import alooGobiImg from '../assets/Images/AlooGobi.png';
import bainganBhartaImg from '../assets/Images/BainganBharta.png';
import paneerButterMasalaImg from '../assets/Images/PaneerButterMasala.png';
import palakPaneerImg from '../assets/Images/PalakPaneer.png';
import chanaMasalaImg from '../assets/Images/ChanaMasala.png';
import samosaImg from '../assets/Images/Samosa.png';
import dalMakhaniImg from '../assets/Images/DalMakhani.png';
import gulabJamunImg from '../assets/Images/GulabJamun.png';

function HomePage() {
  const [activeReview, setActiveReview] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const featuredDishes = [
    { img: biryaniImg, title: 'Royal Biryani', desc: 'Fragrant basmati rice cooked with aromatic spices' },
    { img: curryImg, title: 'Butter Chicken', desc: 'Creamy tomato gravy with tender chicken pieces' },
    { img: tandooriImg, title: 'Tandoori Platter', desc: 'Assortment of grilled delicacies' }
  ];

  const chefsSpecial = [
    { img: samosaImg, title: 'Crispy Samosa', desc: 'Golden fried pastry filled with spiced potatoes and peas' },
    { img: dalMakhaniImg, title: 'Dal Makhani', desc: 'Creamy black lentils cooked with butter and spices' },
    { img: gulabJamunImg, title: 'Gulab Jamun', desc: 'Soft milk-solid-based sweets soaked in rose-flavored syrup' }
  ];

  // Reviews data
  const reviews = [
    { text: "The best biryani I've ever had! The flavors are simply out of this world.", author: "Ananya" },
    { text: "Saffron Spice is my go-to place for authentic Indian food. Highly recommend!", author: "Rajesh" },
    { text: "A true taste of India. The curries and naan were absolutely divine.", author: "Priya" }
  ];

  // Enhanced animation variants
  const fadeInUp = {
    initial: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.3
      }
    }
  };

  const cardHover = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    // Enhanced Intersection Observer setup
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes and handle delay
          const element = entry.target;
          element.classList.add('animate');
          
          if (element.dataset.animationDelay) {
            element.style.animationDelay = `${element.dataset.animationDelay}ms`;
          }
          
          // Unobserve after animation is added
          animationObserver.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe elements with proper error handling
    const elementsToAnimate = [
      ...document.querySelectorAll('.dish-card'),
      ...document.querySelectorAll('.review-card'),
      document.querySelector('.contact-content')
    ].filter(Boolean); // Filter out null elements

    elementsToAnimate.forEach((element, index) => {
      if (element) {
        element.dataset.animationDelay = index * 100;
        animationObserver.observe(element);
      }
    });

    // Auto-rotate reviews with cleanup
    const reviewInterval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    // Back to top button handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      animationObserver.disconnect();
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
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <section className="hero parallax-bg">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 1,
              ease: "easeOut"
            }
          }}
        >
          <h1 style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            <TypeAnimation
              sequence={[
                'Welcome to Saffron Spice',
                2000, // Increased duration
                'Experience Indian Cuisine',
                2000  // Increased duration
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

      <motion.section id="quick-info" className="quick-info animated-section" variants={fadeInUp}>
        <div className="info-grid">
          <div className="info-item">
            <FaClock className="info-icon" />
            <span>Open Daily: 11 AM - 10 PM</span>
          </div>
          <div className="info-item">
            <FaParking className="info-icon" />
            <span>Free Parking Available</span>
          </div>
          <div className="info-item">
            <FaConciergeBell className="info-icon" />
            <span>Reservations Available</span>
          </div>
          <div className="info-item">
            <FaWifi className="info-icon" />
            <span>Free WiFi Available</span>
          </div>
        </div>
      </motion.section>

      <motion.section id="about" className="about animated-section" variants={fadeInUp}>
  <motion.h2 variants={fadeInUp}>About Us</motion.h2>
  <motion.div className="about-content" variants={staggerChildren}>
    <motion.div className="about-text full-width" variants={fadeInUp}>
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
    </motion.div>

    <motion.div className="about-stats full-width" variants={fadeInUp}>
      <div className="stat-group">
        <motion.div className="stat" whileHover={{ scale: 1.05 }}>
          <GradientText>
            <CountUp to={15} from={0} duration={3} separator="," />
            <span>+</span>
          </GradientText>
          <span className="stat-label">Years of Excellence</span>
        </motion.div>
        <motion.div className="stat" whileHover={{ scale: 1.05 }}>
          <GradientText>
            <CountUp to={50} from={0} duration={1} separator="," />
            <span>+</span>
          </GradientText>
          <span className="stat-label">Signature Dishes</span>
        </motion.div>
      </div>

      <div className="stat-group">
        <motion.div className="stat" whileHover={{ scale: 1.05 }}>
          <GradientText>
            <CountUp to={1000} from={850} duration={1} separator="" />
            <span>+</span>
          </GradientText>
          <span className="stat-label">Happy Customers</span>
        </motion.div>
        <motion.div className="stat" whileHover={{ scale: 1.05 }}>
          <GradientText>
            <CountUp to={4.8} from={0} duration={3} separator="," />
          </GradientText>
          <span className="stat-label">Customer Rating</span>
        </motion.div>
      </div>
    </motion.div>

  </motion.div>
</motion.section>

      <motion.section id="featured-dishes" className="featured-dishes animated-section" variants={fadeInUp}>
        <motion.h2 variants={fadeInUp}>Featured Dishes</motion.h2>
        <div className="featured-dishes-grid">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={index}
              className="featured-dish-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <img src={dish.img} alt={dish.title} loading="lazy" />
              <div className="featured-dish-info">
                <h3>{dish.title}</h3>
                <p>{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section id="chefs-special" className="chefs-special animated-section" variants={fadeInUp}>
        <motion.h2 variants={fadeInUp}>Chef's Special</motion.h2>
        <div className="chefs-special-grid">
          {chefsSpecial.map((dish, index) => (
            <motion.div
              key={index}
              className="chefs-special-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <img src={dish.img} alt={dish.title} loading="lazy" />
              <div className="chefs-special-info">
                <h3>{dish.title}</h3>
                <p>{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="speciality"
        className="speciality"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 variants={fadeInUp}>Our Speciality</motion.h2>
        <div className="speciality-grid">
          {[
            { img: biryaniImg, title: 'Royal Biryani', desc: 'Fragrant basmati rice cooked with aromatic spices' },
            { img: curryImg, title: 'Butter Chicken', desc: 'Creamy tomato gravy with tender chicken pieces' },
            { img: tandooriImg, title: 'Tandoori Platter', desc: 'Assortment of grilled delicacies' },
            { img: alooGobiImg, title: 'Aloo Gobi', desc: 'Potatoes and cauliflower cooked with spices' },
            { img: bainganBhartaImg, title: 'Baingan Bharta', desc: 'Smoky mashed eggplant cooked with spices' },
            { img: paneerButterMasalaImg, title: 'Paneer Butter Masala', desc: 'Paneer cubes in a rich tomato gravy' },
            // Add new vegetarian dishes
            { img: palakPaneerImg, title: 'Palak Paneer', desc: 'Paneer cubes in a creamy spinach gravy' },
            { img: chanaMasalaImg, title: 'Chana Masala', desc: 'Chickpeas cooked in a spicy tomato gravy' }
          ].map((dish, index) => (
            <motion.div
              key={index}
              className="dish-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <img src={dish.img} alt={dish.title} loading="lazy" />
              <div className="dish-info">
                <h3>{dish.title}</h3>
                <p>{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
              initial={{ opacity: 0, x: 200 }}
              animate={{ 
                opacity: index === activeReview ? 1 : 0,
                x: index === activeReview ? 0 : 200,
                position: index === activeReview ? 'relative' : 'absolute',
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
              style={{
                display: Math.abs(activeReview - index) <= 1 ? 'block' : 'none'
              }}
            >
              <p>{review.text}</p>
              <span className="author">- {review.author}</span>
            </motion.div>
          ))}
        </div>
        <div className="review-dots">
          {reviews.map((_, index) => (
            <motion.span
              key={index}
              className={`dot ${index === activeReview ? 'active' : ''}`}
              onClick={() => setActiveReview(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.section>

      <motion.section id="video-intro" className="video-intro animated-section" variants={fadeInUp}>
        <motion.h2 variants={fadeInUp}>Watch Our Story</motion.h2>
        <motion.div className="video-container" variants={fadeInUp}>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
            <img src={videoThumbnail} alt="Watch Our Story" className="video-thumbnail" />
          </a>
        </motion.div>
      </motion.section>

      <motion.section 
        id="contact" 
        className="contact animated-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 variants={fadeInUp}>Contact Us</motion.h2>
        <motion.div className="contact-content" variants={staggerChildren}>
          <motion.div className="contact-info full-width" variants={fadeInUp}>
            <p className="contact-item"><span className="contact-label">Address:</span> 123 Spice Street, Flavor Town, India</p>
            <p className="contact-item"><span className="contact-label">Phone:</span> +91 123 456 7890</p>
            <p className="contact-item"><span className="contact-label">Email:</span> info@saffronspice.com</p>
          </motion.div>
          <motion.div className="map-container" variants={fadeInUp}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509273!2d144.96305771582256!3d-37.81410787975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577801d5a9a33f2!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sin!4v1617319162321!5m2!1sen!2sin"
              width="100%"
              height="500"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.section>

      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}

      
    </motion.div>
  );
}

export default HomePage;
