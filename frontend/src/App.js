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
import BookingPage from "./pages/BookingPage";
import ReservationForm from "./pages/ReservationForm";
import PaymentPage from "./pages/PaymentPage";  
import PaymentConfirmationPage from "./pages/PaymentConfirmationPage";  // Import the PaymentConfirmationPage component
import Cart from "./pages/Cart";
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

// Layout for Authentication Pages (Login & Signup)
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      {children}
    </div>
  );
};

// Layout for Booking Pages
const BookingLayout = ({ children }) => {
  return (
    <div className="booking-layout">
      {children}
    </div>
  );
};

// Layout for Pages with Header, Navbar, and Footer
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <ScrollToSection /> {/* Add scroll handling */}
        <Routes>
          {/* Auth Pages */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />

          {/* Booking Pages */}
          <Route
            path="/booking"
            element={
              <BookingLayout>
                <BookingPage />
              </BookingLayout>
            }
          />
          <Route
            path="/reservation"
            element={
              <BookingLayout>
                <ReservationForm />
              </BookingLayout>
            }
          />
          <Route
            path="/payment"
            element={
              <BookingLayout>
                <PaymentPage />
              </BookingLayout>
            }
          />
          <Route
            path="/confirmation"
            element={
              <BookingLayout>
                <PaymentConfirmationPage />
              </BookingLayout>
            }
          />

          {/* Pages with Header, Navbar, and Footer */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/menu"
            element={
              <MainLayout>
                <Menu />
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout>
              <Cart />
            </MainLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
