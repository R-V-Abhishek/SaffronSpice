const mongoose = require("mongoose"); // Use require for mongoose
const { Schema, model } = mongoose; // Destructure Schema and model from mongoose

// Define the reservation schema
const reservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "LoginUser", required: true },
  guests: { type: Number, required: true },
  visitDate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  tableType: { type: String, required: true },
});

// Create and export the Reservation model
const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation; // Use module.exports to export the model
