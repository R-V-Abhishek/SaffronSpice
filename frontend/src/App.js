import React from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;

