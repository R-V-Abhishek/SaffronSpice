// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialize dotenv to use environment variables from the .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Saffron Spice!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

