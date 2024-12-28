import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentConfirmationPage.css";

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

  const calculateCartTotal = () => {
    return paymentDetails.bookingDetails.cartItems.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.price.replace("₹", "")),
      0
    );
  };

  return (
    <div className="confirmation-container">
      <h2>Payment Confirmation</h2>
      <div id="payment-details">
        {paymentDetails ? (
          <>
            <p>
              Thank you, <strong>{paymentDetails.name}</strong>!
            </p>
            <p>
              Payment of ₹{paymentDetails.amount + calculateCartTotal()} using UPI ID{" "}
              <strong>{paymentDetails.upi}</strong> has been recorded.
            </p>
            <p>Table Type: {paymentDetails.bookingDetails.tableType}</p>
            <p>Number of Tables: {paymentDetails.bookingDetails.tableNumbers.length}</p>
            <p>Table Numbers: {paymentDetails.bookingDetails.tableNumbers.join(', ')}</p>
            <p>Cart Items:</p>
            <ul>
              {paymentDetails.bookingDetails.cartItems.map((item) => (
                <li key={item.menuItemId}>
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>
            <p>Cart Total: ₹{calculateCartTotal()}</p>
          </>
        ) : (
          <p>No payment details found!</p>
        )}
      </div>
      <button onClick={() => navigate("/")} className="btn">
        Return to Home Page
      </button>
    </div>
  );
};

export default ConfirmationPage;