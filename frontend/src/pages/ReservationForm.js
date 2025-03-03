import { apiUrl } from '../services/apiConfig';
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ReservationForm.css";
import { apiUrl } from "../services/apiConfig";

const formatTimeSlot = (time) => {
  const [hours] = time.split(':');
  const hour = parseInt(hours);
  return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
};

const ReservationForm = () => {
  const [searchParams] = useSearchParams(); // Get the query parameters
  const navigate = useNavigate(); // For navigation
  const [guests, setGuests] = useState(null);
  const [visitDate, setVisitDate] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedTableType, setSelectedTableType] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [tablesNeeded, setTablesNeeded] = useState(1);
  const [selectedTables, setSelectedTables] = useState([]);
  const [maxDate, setMaxDate] = useState("");
  const [guestError, setGuestError] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [foodPreparation, setFoodPreparation] = useState(null);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [labelMessage, setLabelMessage] = useState("Please select the time slot");

  useEffect(() => {
    const today = new Date();
    const max = new Date();
    max.setDate(today.getDate() + 16);

    setVisitDate(today.toISOString().split("T")[0]);
    setMaxDate(max.toISOString().split("T")[0]);

    // Get the "tableType" from the query parameter and set it
    const tableTypeFromQuery = searchParams.get("tableType");
    setSelectedTableType(tableTypeFromQuery || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(apiUrl("/api/cart"), {
          headers: { userId },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setErrorMessage("Failed to fetch cart items");
        setShowErrorPopup(true);
      }
    };

    fetchCartItems();
  }, []);

  const fetchAvailableTimeSlots = async (date) => {
    try {
      const response = await fetch(apiUrl(`/api/reservation/timeslots?date=${date}`));
      const data = await response.json();
      if (response.ok) {
        setAvailableTimeSlots(data.timeSlots || []);
      } else {
        setErrorMessage("Failed to fetch time slots");
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error("Failed to fetch time slots:", error);
      setErrorMessage("Network error while fetching time slots");
      setShowErrorPopup(true);
    }
  };

  const fetchAvailableTables = useCallback(async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT/tables/available');
      const data = await response.json();
      setAvailableTables(data);
    } catch (error) {
      console.error('Error fetching available tables:', error);
    }
  }, []); // Empty dependency array if no state dependencies are used

  useEffect(() => {
    fetchAvailableTables();
  }, [fetchAvailableTables]); // Include fetchAvailableTables in the dependency array

  const handleGuestSelection = (guestCount) => {
    setGuests(guestCount);
    // Immediate calculation
    const tablesNeeded = Math.ceil(guestCount / 4);
    setTablesNeeded(tablesNeeded);
    
    // Then fetch available tables if we have all required info
    if (selectedTimeSlot && selectedTableType) {
      fetchAvailableTables();
    }
  };

  useEffect(() => {
    if (visitDate) {
      fetchAvailableTimeSlots(visitDate);
      setSelectedTimeSlot(''); // Reset selected time when date changes
    }
  }, [visitDate]);

  useEffect(() => {
    if (selectedTimeSlot && selectedTableType && guests) {
      fetchAvailableTables();
    }
  }, [selectedTimeSlot, selectedTableType, guests, visitDate, fetchAvailableTables]); // Include fetchAvailableTables in the dependency array

  useEffect(() => {
    if (!selectedTimeSlot) {
      setLabelMessage("Please select the time slot");
    } else if (guests) {
      setLabelMessage(`Select Tables (You need ${tablesNeeded} tables for ${guests} guests)`);
    }
  }, [selectedTimeSlot, guests, tablesNeeded]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setVisitDate(selectedDate);
    fetchAvailableTimeSlots(selectedDate); // Fetch time slots for the selected date
  };

  const calculatePrice = (tableType) => {
    if (tableType === "VIP") return 2000;
    if (tableType === "Special") return 1500;
    return 1000;
  };

  const handleTableSelection = (tableNumber) => {
    setSelectedTables(prev => {
      if (prev.includes(tableNumber)) {
        // Remove table if already selected
        return prev.filter(t => t !== tableNumber);
      }
      if (prev.length < tablesNeeded) {
        // Add table if we haven't reached the needed amount
        return [...prev, tableNumber].sort((a, b) => a - b);
      }
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guests) {
      setGuestError(true);
      return;
    }

    if (foodPreparation === null) {
      setErrorMessage("Please select if you want food prepared in advance");
      setShowErrorPopup(true);
      return;
    }

    if (foodPreparation === 'yes' && (!cartItems || cartItems.length === 0)) {
      setErrorMessage("Please add items to your cart before proceeding");
      setShowErrorPopup(true);
      return;
    }

    if (selectedTables.length !== tablesNeeded) {
      setErrorMessage(`Please select ${tablesNeeded} tables for ${guests} guests`);
      setShowErrorPopup(true);
      return;
    }

    const newBookingDetails = {
      guests,
      visitDate,
      timeSlot: selectedTimeSlot,
      tableType: selectedTableType,
      tableNumbers: selectedTables,
      price: calculatePrice(selectedTableType) * tablesNeeded,
      cartItems: foodPreparation === 'yes' ? cartItems : [], // Only include cart items if food prep is yes
      foodPreparation
    };
    setBookingDetails(newBookingDetails);
    setShowConfirmPopup(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch(apiUrl("/api/reservation/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingDetails,
          userId: localStorage.getItem("userId"),
          tableNumbers: selectedTables,
          cartTotal: cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.price.replace("₹", "")), 0) // Calculate cart total
        }),
      }));

      const result = await response.json();

      if (response.ok) {
        // Save booking details in localStorage
        localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

        // Clear the cart
        setCartItems([]);

        // Navigate to PaymentPage with booking details in the state
        navigate("/payment", { state: bookingDetails });
      } else {
        setErrorMessage(result.message || "Reservation failed.");
        setShowErrorPopup(true);
        if (result.message.includes("no longer available")) {
          fetchAvailableTables();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setShowErrorPopup(true);
    }
    setShowConfirmPopup(false);
  };

  return (
    <div className="container">
      <h2>Book Your Table</h2>
      <form onSubmit={handleSubmit}>
        {/* Guest selection section */}
        <div className="form-group">
          <label htmlFor="guests">
            Number of Guests <span style={{ color: "red" }}>*</span>
          </label>
          <div className="guest-buttons">
            {[...Array(12).keys()].map((_, i) => (
              <button
                key={i + 1}
                type="button"
                className={`guest-button ${guests === i + 1 ? "selected" : ""}`}
                onClick={() => handleGuestSelection(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {guestError && (
            <span className="error-message">
              Please select the number of guests.
            </span>
          )}
        </div>

        {/* Date selection section */}
        <div className="form-group">
          <label htmlFor="visitDate">When are you visiting?</label>
          <input
            type="date"
            id="visitDate"
            name="visitDate"
            value={visitDate}
            min={visitDate}
            max={maxDate}
            onChange={handleDateChange}
            required
          />
        </div>

        {/* Time slots section */}
        <div className="form-group">
          <label>Available Time Slots</label>
          <div className="time-slots">
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {formatTimeSlot(slot)}
                </button>
              ))
            ) : (
              <p>No time slots available for this date. Please note that reservations require at least 4 hours advance notice.</p>
            )}
          </div>
        </div>

        {/* Table type selection */}
        <div className="form-group">
          <label htmlFor="tableType">Select Table Type</label>
          <select
            id="tableType"
            name="tableType"
            value={selectedTableType}
            onChange={(e) => setSelectedTableType(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a table type
            </option>
            <option value="VIP">VIP (₹2000)</option>
            <option value="Special">Special (₹1500)</option>
            <option value="Regular">Regular (₹1000)</option>
          </select>
        </div>

        <div className="form-group">
        <label>{labelMessage}</label>
          <div className="table-selection-container">
            {selectedTimeSlot && availableTables.map((table) => (
              <button
                key={table.tableNumber}
                type="button"
                className={`table-button ${selectedTables.includes(table.tableNumber) ? 'selected' : ''}`}
                onClick={() => handleTableSelection(table.tableNumber)}
                disabled={selectedTables.length >= tablesNeeded && !selectedTables.includes(table.tableNumber)}
              >
                Table {table.tableNumber}
              </button>
            ))}
          </div>
          {selectedTables.length < tablesNeeded && (
            <p className="error-message">Please select {tablesNeeded} tables</p>
          )}
        </div>

        {/* Food Preparation Selection */}
        <div className="form-group">
          <label>Would you like your food prepared in advance?</label>
          <div className="food-prep-buttons">
            <button
              type="button"
              className={`food-prep-button ${foodPreparation === 'yes' ? 'selected' : ''}`}
              onClick={async () => {
                setFoodPreparation('yes');
                setShowCartPreview(true);
                // Fetch latest cart items when user selects "Yes"
                const userId = localStorage.getItem("userId");
                if (userId) {
                  const response = await fetch(apiUrl("/api/cart", {
                    headers: { userId },
                  }));
                  const data = await response.json();
                  setCartItems(data.items || []);
                }
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className={`food-prep-button ${foodPreparation === 'no' ? 'selected' : ''}`}
              onClick={() => {
                setFoodPreparation('no');
                setShowCartPreview(false);
                setCartItems([]);
              }}
            >
              No
            </button>
          </div>
        </div>

        {/* Cart Preview */}
        {foodPreparation === 'yes' && showCartPreview && (
          <div className="cart-preview">
            <h3>Your Order</h3>
            {cartItems.length > 0 ? (
              <>
                <ul className="cart-preview-list">
                  {cartItems.map((item) => (
                    <li key={item.menuItemId} className="cart-preview-item">
                      <span>{item.name}</span>
                      <span>{item.quantity} x {item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="cart-preview-total">
                  Total: ₹{cartItems.reduce((acc, item) => 
                    acc + item.quantity * parseFloat(item.price.replace("₹", "")), 0
                  )}
                </div>
              </>
            ) : (
              <p>Your cart is empty. <a href="/menu">Add items from menu</a></p>
            )}
          </div>
        )}

        <button type="submit" className="proceed-button">
          Proceed
        </button>
      </form>

      {showConfirmPopup && (
        <div className="popupOverlay">
          <div className="popup successPopup">
            <h3>Confirm Booking</h3>
            <div className="bookingDetails">
              <p>Number of Guests: {bookingDetails.guests}</p>
              <p>Date: {bookingDetails.visitDate}</p>
              <p>Time: {bookingDetails.timeSlot}</p>
              <p>Table Type: {bookingDetails.tableType}</p>
              <p>Table Numbers: {bookingDetails.tableNumbers.join(', ')}</p>
              <p>Cart Items:</p>
              <ul>
                {bookingDetails.cartItems.map((item) => (
                  <li key={item.menuItemId}>
                    {item.name} - {item.quantity} x {item.price}
                  </li>
                ))}
              </ul>
            </div>
            <div className="popupButtons">
              <button className="confirmButton" onClick={handleConfirmBooking}>
                Confirm
              </button>
              <button
                className="cancelButton"
                onClick={() => setShowConfirmPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className="popupOverlay">
          <div className="popup errorPopup">
            <h3>Error</h3>
            <p>{errorMessage}</p>
            <button
              className="closeButton"
              onClick={() => setShowErrorPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
