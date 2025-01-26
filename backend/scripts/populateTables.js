// backend/scripts/populateTables.js
const mongoose = require("mongoose");
const Table = require("../models/Table");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    try {
      // Clear existing tables
      await Table.deleteMany({});
      
      // Create VIP tables (1-5)
      const vipTables = Array.from({length: 5}, (_, i) => ({
        tableNumber: i + 1,
        type: 'VIP',
        isAvailable: true
      }));
      
      // Create Special tables (6-25)
      const specialTables = Array.from({length: 20}, (_, i) => ({
        tableNumber: i + 6,
        type: 'Special',
        isAvailable: true
      }));
      
      // Create Regular tables (26-60)
      const regularTables = Array.from({length: 35}, (_, i) => ({
        tableNumber: i + 26,
        type: 'Regular',
        isAvailable: true
      }));
      
      // Insert all tables
      await Table.insertMany([...vipTables, ...specialTables, ...regularTables]);
      console.log("Tables populated successfully");
    } catch (error) {
      console.error("Error populating tables:", error);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error("MongoDB connection error:", err));