const Reservation = require("../models/Reservation");

const timeSlots = [
  "11:00", "12:00", "13:00", "14:00", // Lunch slots
  "18:00", "19:00", "20:00", "21:00", "22:00" // Dinner slots
];

const checkAvailableSlots = async (date) => {
  const selectedDate = new Date(date);
  const now = new Date();
  const minBookingTime = new Date(now.getTime() + (4 * 60 * 60 * 1000)); // 4 hours from now

  // Filter slots based on the current time
  const filteredSlots = timeSlots.filter((slot) => {
    const [hours, minutes] = slot.split(':').map(Number);
    const slotTime = new Date(selectedDate);
    slotTime.setHours(hours, minutes, 0, 0);
    return slotTime >= minBookingTime;
  });

  // Fetch already reserved slots for the given date
  const reservedSlots = await Reservation.find({ visitDate: date }).distinct("timeSlot");

  // Filter out reserved slots
  const availableSlots = filteredSlots.filter(slot => !reservedSlots.includes(slot));

  return availableSlots;
};

module.exports = { checkAvailableSlots };
