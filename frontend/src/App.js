import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/HomePage";
import Menu from "./pages/Menu";
//import Booking from "./pages/Booking";
//import ReservationForm from "./pages/ReservationForm";

// Component to handle scrolling to sections based on URL hash
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the '#' from the hash
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <ScrollToSection /> {/* Add scroll handling */}
        <Routes>
          {/* Standalone pages without header, navbar, or footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/*<Route path="/Booking" element={<Booking />} />
          <Route path="/reservation/:tableType" element={<ReservationForm />} />
          {/* Pages with header, navbar, and footer */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/menu"
            element={
              <>
                <Header />
                <Navbar />
                <Menu />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
