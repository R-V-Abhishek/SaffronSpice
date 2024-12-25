import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Get booking details passed via state or stored in localStorage
    const details = JSON.parse(localStorage.getItem("bookingDetails"));
    if (details) {
      setAmount(details.amount || 0); // Set amount from booking details if available
    }
  }, []);

  const processPayment = () => {
    if (name && email && upi && amount) {
      alert("Payment is being processed! Redirecting...");
      sessionStorage.setItem("paymentDetails", JSON.stringify({ name, email, upi, amount }));
      navigate("/confirmation"); // Redirect to confirmation page
    } else {
      alert("Please fill in all the details!");
    }
  };
  

  return (
    <div className="payment-container" style={styles.paymentContainer}>
      <h2 style={styles.heading}>Payment Page</h2>
      <form id="payment-form">
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="upi" style={styles.label}>UPI ID</label>
          <input
            type="text"
            id="upi"
            placeholder="Enter your UPI ID"
            required
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="amount" style={styles.label}>Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          type="button"
          onClick={processPayment}
          style={styles.btn}
        >
          Pay Now
        </button>
      </form>
      <div id="result" style={styles.result}></div>
      <div style={styles.footer}>Dummy Payment System &copy; 2024</div>
    </div>
  );
};

const styles = {
  paymentContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    background: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  btn: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#28a745",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    color: "#333",
  },
  footer: {
    marginTop: "20px",
    color: "#666",
    fontSize: "14px",
  },
};

export default PaymentPage;
