const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Table = require("../models/Table");
const Cart = require("../models/Cart");
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
    const { guests, visitDate, timeSlot, tableType, tableNumbers, userId, cartItems, cartTotal } = req.body;

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
      tableNumber,
      cartItems, // Include cart items in the reservation
      cartTotal // Include cart total in the reservation
    }));

    await Reservation.insertMany(reservations);

    // Clear the cart after successful reservation
    await Cart.findOneAndUpdate({ userId }, { items: [], total: 0 });

    res.status(201).json({ message: "Reservation successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save reservation" });
  }
});
// Get reservations by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Reservation.find({ userId }).populate("cartItems.menuItemId");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
});

module.exports = router;
