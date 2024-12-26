import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ReservationForm.css";

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
  const [maxDate, setMaxDate] = useState("");
  const [guestError, setGuestError] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

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

  const fetchAvailableTimeSlots = async (date) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservation/timeslots?date=${date}`);
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

  useEffect(() => {
    if (visitDate) {
      fetchAvailableTimeSlots(visitDate);
      setSelectedTimeSlot(''); // Reset selected time when date changes
    }
  }, [visitDate]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setVisitDate(selectedDate);
    fetchAvailableTimeSlots(selectedDate); // Fetch time slots for the selected date
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guests) {
      setGuestError(true);
      return;
    }

    // Set booking details to be passed to the PaymentPage
    const newBookingDetails = {
      guests,
      visitDate,
      timeSlot: selectedTimeSlot,
      tableType: selectedTableType,
    };
    setBookingDetails(newBookingDetails);

    setShowConfirmPopup(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reservation/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingDetails,
          userId: localStorage.getItem("userId"),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Navigate to PaymentPage with booking details passed in the state
        navigate("/payment", { state: bookingDetails });
      } else {
        setErrorMessage(result.message || "Reservation failed.");
        setShowErrorPopup(true);
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
                onClick={() => setGuests(i + 1)}
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

        {/* Time Slots */}
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
              className="popupButton"
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
