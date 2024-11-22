import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>We are Saffron Spice, serving mouth-watering Indian dishes with love and care. Our aim is to bring the most authentic flavors of India to your table!</p>
      </section>

      <section id="speciality" className="speciality">
        <h2>Our Speciality</h2>
        <p>Our speciality lies in crafting exquisite, aromatic biryanis, spicy curries, and flavorful snacks. The Saffron Spice experience is a celebration of India's diverse food culture!</p>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>123 Spice Street, Flavor Town, India</p>
        <p>Phone: +91 123 456 7890</p>
        <p>Email: info@saffronspice.com</p>
      </section>
    </div>
  );
}

export default HomePage;
