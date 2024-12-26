const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
      name: String,
      price: String,
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
