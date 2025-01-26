const mongoose = require("mongoose");
const MenuItem = require("../models/MenuItem");
const menuData = require("./menuData.json"); // Your JSON data
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    try {
      // Clear existing menu items
      await MenuItem.deleteMany({});
      
      // Create flattened array of all items with their categories
      const items = menuData.flatMap(category => 
        category.items.map(item => ({
          ...item,
          category: category.category
        }))
      );
      
      // Insert all items
      await MenuItem.insertMany(items);
      console.log("Menu items populated successfully");
    } catch (error) {
      console.error("Error populating menu items:", error);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error("MongoDB connection error:", err));