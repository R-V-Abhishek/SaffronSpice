import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Retrieve payment details from sessionStorage
    const details = JSON.parse(sessionStorage.getItem("paymentDetails"));
    if (details) {
      setPaymentDetails(details);
    } else {
      navigate("/"); // Redirect to home page if no details found
    }
  }, [navigate]);

  return (
    <div className="confirmation-container" style={styles.confirmationContainer}>
      <h2 style={styles.heading}>Payment Confirmation</h2>
      <div id="payment-details" style={styles.paymentDetails}>
        {paymentDetails ? (
          <>
            <p>
              Thank you, <strong>{paymentDetails.name}</strong>!
            </p>
            <p>
              Payment of ₹{paymentDetails.amount} using UPI ID{" "}
              <strong>{paymentDetails.upi}</strong> has been recorded.
            </p>
          </>
        ) : (
          <p>No payment details found!</p>
        )}
      </div>
      <button onClick={() => navigate("/")} className="btn" style={styles.btn}>
        Return to Home Page
      </button>
    </div>
  );
};

const styles = {
  confirmationContainer: {
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
  paymentDetails: {
    color: "#333",
  },
  btn: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ConfirmationPage;
