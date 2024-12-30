import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewOrderPage.css";

const ViewOrderPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/reservation/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="view-order-page">
      <h2>Your Orders</h2>
      {reservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              <h3>Reservation on {reservation.visitDate} at {reservation.timeSlot}</h3>
              <p>Guests: {reservation.guests}</p>
              <p>Table Type: {reservation.tableType}</p>
              <p>Table Numbers: {reservation.tableNumber}</p>
              {reservation.cartItems && reservation.cartItems.length > 0 ? (
                <>
                  <p>Cart Total: ₹{reservation.cartTotal}</p>
                  <h4>Ordered Items:</h4>
                  <ul className="cart-items-list">
                    {reservation.cartItems.map((item) => (
                      <li key={item.menuItemId}>
                        {item.name} - {item.quantity} x {item.price}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="empty-cart-message">No items were ordered with this reservation</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewOrderPage;