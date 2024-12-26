import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css"; // Ensure the correct import for the CSS

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [upi, setUpi] = useState(""); 
  const [amount, setAmount] = useState(0); 
  const [loading, setLoading] = useState(false); // For controlling the loading spinner
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal visibility
  const [error, setError] = useState(""); // To display error messages

  useEffect(() => {
    // Adding a class to the body on load to ensure CSS is applied
    document.body.classList.add("payment-page-loaded");

    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setName(userData.name);
          setEmail(userData.email);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('Error fetching user data');
      }
    };

    fetchUserData();

    const details = location.state || JSON.parse(localStorage.getItem("bookingDetails"));
    
    if (details) {
      setAmount(details.price || 0);
    } else {
      alert("Booking details not found. Redirecting to the booking page.");
      navigate("/reservation");
    }

    return () => {
      // Remove the class when component unmounts
      document.body.classList.remove("payment-page-loaded");
    };
  }, [location.state, navigate]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,6}$/;
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

    setError(""); // Clear previous error message
    setIsModalOpen(true); // Show the confirmation modal
  };

  const confirmPayment = () => {
    setLoading(true); // Start loading spinner

    sessionStorage.setItem("paymentDetails", JSON.stringify({ name, email, upi, amount }));

    setTimeout(() => {
      setLoading(false);
      navigate("/confirmation"); // Navigate to the confirmation page after payment
    }, 2000); // Simulate payment processing time
  };

  const cancelPayment = () => {
    setIsModalOpen(false); // Close the modal if payment is canceled
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container" key={location.pathname}> {/* Ensure key prop */}
        <h2>Payment Page</h2>
        <form id="payment-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="readonly-input"
            />
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
            <label htmlFor="amount">Amount</label>
            <p>₹{amount}</p> {/* Display amount as read-only */}
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

        {/* Modal for payment confirmation */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Payment</h3>
              <p>Are you sure you want to proceed with the payment of ₹{amount}?</p>
              <div className="modal-buttons">
                <button className="confirm-btn" onClick={confirmPayment}>Confirm</button>
                <button className="cancel-btn" onClick={cancelPayment}>Cancel</button>
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
