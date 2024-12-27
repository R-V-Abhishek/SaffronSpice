import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Saffron Spice. All rights reserved.</p>
      <p>
        Follow us on{' '}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>,{' '}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>, and{' '}
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">X</a>.
      </p>
    </footer>
  );
}

export default Footer;
