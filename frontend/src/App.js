import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Menu from './pages/Menu';  // Make sure you have the Menu component

function App() {
  return (
    <Router> {/* Wrap your app with Router */}
      <div>
        <Header />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} /> {/* Add route for Menu page */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
