// backend/models/Reservation.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "LoginUser", required: true },
  guests: { type: Number, required: true },
  visitDate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  tableType: { type: String, required: true },
  tableNumbers: [{ type: Number, required: true }],
  cartItems: [
    {
      menuItemId: { type: Schema.Types.ObjectId, ref: "MenuItem", required: true },
      name: String,
      price: String,
      quantity: { type: Number, default: 1 },
    },
  ],
  cartTotal: { type: Number, required: true }
});

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;