const Reservation = require("../models/Reservation");

const availableSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];

const checkAvailableSlots = async (date) => {
  const reservedSlots = await Reservation.find({ visitDate: date }).distinct("timeSlot");
  return availableSlots.filter((slot) => !reservedSlots.includes(slot));
};

module.exports = { checkAvailableSlots };
