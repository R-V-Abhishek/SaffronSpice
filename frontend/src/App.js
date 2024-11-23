import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/SignUp"; // Uncomment when Signup is ready
import Home from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Standalone pages without header, navbar, or footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 

        {/* Pages with header, navbar, and footer */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
