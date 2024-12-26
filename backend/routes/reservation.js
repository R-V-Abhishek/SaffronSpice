const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const { checkAvailableSlots } = require("../utils/slotUtils");

// Fetch available time slots for a date
router.get("/timeslots", async (req, res) => {
  try {
    const { date } = req.query;
    const timeSlots = await checkAvailableSlots(date);
    res.json({ timeSlots });
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ message: "Failed to fetch time slots" });
  }
});

// Create a new reservation
router.post("/book", async (req, res) => {
  const { guests, visitDate, timeSlot, tableType, userId } = req.body;

  try {
    const newReservation = new Reservation({
      guests,
      visitDate,
      timeSlot,
      tableType,
      userId,
    });

    await newReservation.save();
    res.status(201).json({ message: "Reservation successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save reservation" });
  }
});

module.exports = router;
