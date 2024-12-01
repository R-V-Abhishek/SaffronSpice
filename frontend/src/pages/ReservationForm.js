import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ReservationForm.css";

const ReservationForm = () => {
  const [searchParams] = useSearchParams(); // Get the query parameters
  const navigate = useNavigate(); // For navigation
  const [guests, setGuests] = useState(null);
  const [visitDate, setVisitDate] = useState("");
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

  const handleGuestSelection = (guestCount) => {
    setGuests(guestCount);
    setGuestError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guests) {
      setGuestError(true);
      return;
    }

    const confirmBooking = window.confirm(
      `Confirm your booking:\n\nGuests: ${guests}\nDate: ${visitDate}\nTable Type: ${selectedTableType}`
    );

    if (confirmBooking) {
      const foodPrep = window.confirm(
        "Would you like your food prepared in advance?"
      );

      // Navigate to the appropriate page
      navigate(foodPrep ? "/menu" : "/payment");
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

        <div className="form-group">
          <label htmlFor="visitDate">When are you visiting?</label>
          <input
            type="date"
            id="visitDate"
            name="visitDate"
            value={visitDate}
            min={visitDate}
            max={maxDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
          />
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
