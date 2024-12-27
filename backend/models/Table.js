const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  type: { type: String, required: true, enum: ['VIP', 'Special', 'Regular'] },
  capacity: { type: Number, default: 4 },
  isAvailable: { type: Boolean, default: true }
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;