const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Table = require("../models/Table");
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

// Get available tables for a specific type
router.get("/available-tables", async (req, res) => {
  try {
    const { type, date, timeSlot, guests } = req.query;
    
    // Calculate number of tables needed based on guest count
    const numOfTablesNeeded = Math.ceil(parseInt(guests) / 4);
    
    // Sort tables by tableNumber
    const tables = await Table.find({ type }).sort({ tableNumber: 1 });
    
    // Find existing reservations for the date and time
    const reservations = await Reservation.find({ 
      visitDate: date,
      timeSlot: timeSlot
    });
    
    // Filter out reserved tables
    const reservedTableNumbers = reservations.map(r => r.tableNumber);
    const availableTables = tables.filter(t => !reservedTableNumbers.includes(t.tableNumber));

    // Return tables along with the calculated tablesNeeded
    res.json({ 
      tables: availableTables,
      tablesNeeded: numOfTablesNeeded
    });
  } catch (error) {
    console.error("Error fetching available tables:", error);
    res.status(500).json({ message: "Error fetching available tables" });
  }
});

// Create a new reservation
router.post("/book", async (req, res) => {
  try {
    const { guests, visitDate, timeSlot, tableType, tableNumbers, userId } = req.body;

    // Validate input
    if (!guests || !visitDate || !timeSlot || !tableType || !tableNumbers || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if tables are available
    const existingReservations = await Reservation.find({
      visitDate,
      timeSlot,
      tableNumber: { $in: tableNumbers }
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ 
        message: "One or more tables are no longer available. Please select different tables."
      });
    }

    // Create reservations for each selected table
    const reservations = tableNumbers.map(tableNumber => ({
      userId,
      guests,
      visitDate,
      timeSlot,
      tableType,
      tableNumber
    }));

    await Reservation.insertMany(reservations);
    res.status(201).json({ message: "Reservation successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save reservation" });
  }
});

module.exports = router;
