import { apiUrl } from '../services/apiConfig';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";
import { apiUrl } from "../services/apiConfig";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    tableType: "",
    tableNumbers: [],
    cartItems: [],
  });

  useEffect(() => {
    document.body.classList.add("payment-page-loaded");

    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(apiUrl(`/api/auth/user/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }));

        if (response.ok) {
          const userData = await response.json();
          setName(userData.name || "");
          setEmail(userData.email || "");
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        setError("Error fetching user data.");
      }
    };

    fetchUserData();

    const details = location.state || JSON.parse(localStorage.getItem("bookingDetails"));
    if (details) {
      setAmount(details.price || 0);
      setBookingDetails({
        tableType: details.tableType || "",
        tableNumbers: details.tableNumbers || [],
        cartItems: details.cartItems || [],
      });
    } else {
      alert("Booking details not found. Redirecting to the booking page.");
      navigate("/reservation");
    }

    return () => {
      document.body.classList.remove("payment-page-loaded");
    };
  }, [location.state, navigate]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handlePayment = () => {
    if (!name || !email || !upi) {
      setError("Please fill in all the details!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    setError("");
    setIsModalOpen(true);
  };

  const confirmPayment = () => {
    setLoading(true);
    sessionStorage.setItem(
      "paymentDetails",
      JSON.stringify({ name, email, upi, amount, bookingDetails })
    );

    setTimeout(() => {
      setLoading(false);
      navigate("/confirmation");
    }, 2000);
  };

  const cancelPayment = () => {
    setIsModalOpen(false);
  };

  const calculateCartTotal = () => {
    return bookingDetails.cartItems.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.price.replace("₹", "")),
      0
    );
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <h2>Payment Page</h2>
        {error && <p className="error-message">{error}</p>}
        <form id="payment-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} readOnly className="readonly-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} readOnly className="readonly-input" />
          </div>
          <div className="form-group">
            <label htmlFor="upi">UPI ID</label>
            <input
              type="text"
              id="upi"
              placeholder="Enter your UPI ID"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Table Amount</label>
            <p>₹{amount}</p>
          </div>
          <div className="form-group">
            <label>Table Details</label>
            <p>Type: {bookingDetails.tableType || "N/A"}</p>
            <p>Number of Tables: {bookingDetails.tableNumbers.length || 0}</p>
            <p>Table Numbers: {bookingDetails.tableNumbers.join(", ") || "N/A"}</p>
          </div>
          <div className="form-group">
            <label>Cart Items</label>
            <ul>
              {bookingDetails.cartItems.map((item) => (
                <li key={item.menuItemId}>
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>
            <p><b>Cart Total:</b> ₹{calculateCartTotal()}</p>
          </div>
          <button
            type="button"
            onClick={handlePayment}
            className={loading ? "btn loading" : "btn"}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Payment</h3>
              <p>Are you sure you want to proceed with the payment of ₹{amount + calculateCartTotal()}?</p>
              <div className="modal-buttons">
                <button className="confirm-btn" onClick={confirmPayment}>
                  Confirm
                </button>
                <button className="cancel-btn" onClick={cancelPayment}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="footer">Dummy Payment System &copy; 2024</div>
      </div>
    </div>
  );
};

export default PaymentPage;
