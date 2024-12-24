const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Get all menu items grouped by category
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    const groupedItems = menuItems.reduce((acc, item) => {
      const category = acc.find(c => c.category === item.category);
      if (category) {
        category.items.push(item);
      } else {
        acc.push({
          category: item.category,
          items: [item]
        });
      }
      return acc;
    }, []);
    res.json(groupedItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

module.exports = router;