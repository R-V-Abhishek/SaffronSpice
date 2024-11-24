import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/HomePage";
import Menu from "./pages/Menu";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Standalone pages without header, navbar, or footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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
