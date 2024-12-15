import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ReservationForm.css";

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
      setAvailableTimeSlots(data.timeSlots || []);
    } catch (error) {
      console.error("Failed to fetch time slots:", error);
    }
  };

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

    const confirmBooking = window.confirm(
      `Confirm your booking:\n\nGuests: ${guests}\nDate: ${visitDate}\nTime: ${selectedTimeSlot}\nTable Type: ${selectedTableType}`
    );

    if (confirmBooking) {
      try {
        const response = await fetch("http://localhost:5000/api/reservation/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guests,
            visitDate,
            timeSlot: selectedTimeSlot,
            tableType: selectedTableType,
            userId: localStorage.getItem("userId"), // Assume userId is stored after login
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Reservation successful!");
          navigate("/confirmation");
        } else {
          alert(result.message || "Reservation failed.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
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
              availableTimeSlots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`time-slot ${selectedTimeSlot === slot ? "selected" : ""}`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>No time slots available for this date.</p>
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
    </div>
  );
};

export default ReservationForm;
