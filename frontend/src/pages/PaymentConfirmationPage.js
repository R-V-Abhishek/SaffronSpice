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
              Payment completed using UPI ID: <strong>{paymentDetails.upi}</strong>
            </p>
            <br></br>
            
            <div className="booking-details">
              <h3>Table Booking Details:</h3>
              <p><b>Table Type:</b> {paymentDetails.bookingDetails.tableType}</p>
              <p><b>Number of Tables:</b> {paymentDetails.bookingDetails.tableNumbers.length}</p>
              <p><b>Table Number(s):</b> {paymentDetails.bookingDetails.tableNumbers.join(', ')}</p>
            </div>
            <br></br>

            <div className="order-details">
              <h3>Food Order Details:</h3>
              <ul>
                {paymentDetails.bookingDetails.cartItems.map((item) => (
                  <li key={item.menuItemId}>
                    {item.name} - {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                  </li>
                ))}
              </ul>
            </div>
            <br></br>

            <div className="cost-breakdown">
              <h3>Cost Breakdown:</h3>
              <p><b>Table Charges:</b> ₹{paymentDetails.amount}</p>
              <p><b>Food Order Total:</b> ₹{calculateCartTotal()}</p>
              <hr/>
              <p className="total-amount"><b>Final Amount Paid:</b> ₹{paymentDetails.amount + calculateCartTotal()}</p>
            </div>
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