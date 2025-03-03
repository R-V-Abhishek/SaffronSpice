const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const reservationRoutes = require("./routes/reservation");
const menuRoutes = require("./routes/menu"); // Import menu routes
const cartRoutes = require("./routes/cart");
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://saffron-spice-website.vercel.app/', // Add your Vercel domain here
    'https://saffron-spice-api.onrender.com' // Add Render domain here
  ],
  credentials: true
}));
app.use(express.json()); // Parse JSON payloads

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/menu", menuRoutes); // Add menu routes
app.use("/api/cart", cartRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
