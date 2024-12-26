const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");
const authenticateUser = require("../Loginmiddleware/authenticateUser");

// 🛒 Add an item to the cart
router.post("/add", authenticateUser, async (req, res) => {
  const { menuItemId, quantity } = req.body;
  try {
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.menuItemId.equals(menuItemId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: quantity || 1,
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace("₹", "")), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

// 🛒 Get cart details
router.get("/", authenticateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    res.status(200).json(cart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

// 🛒 Remove an item from the cart
router.delete("/remove", authenticateUser, async (req, res) => {
  const { menuItemId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => !item.menuItemId.equals(menuItemId));
    cart.total = cart.items.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace("₹", "")), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
});

// 🛒 Update item quantity in the cart
router.put("/update", authenticateUser, async (req, res) => {
  const { menuItemId, quantity } = req.body;
  try {
    if (quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than 0" });

    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId.toString());
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

    cart.items[itemIndex].quantity = quantity;

    cart.total = cart.items.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace("₹", "")), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Error updating cart", error });
  }
});


module.exports = router;
