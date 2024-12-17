const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const LoginUser = require("../models/LoginUser"); // Import the User model
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Helper function to validate user input
const validateSignupInput = (data) => {
  const { fname, lname, email, dob, phone, username, password, confirmPassword } = data;

  if (!fname || !lname || !email || !dob || !phone || !username || !password || !confirmPassword) {
    return "All fields are required.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }

  return null; // No validation errors
};

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { fname, lname, email, dob, phone, username, password, confirmPassword } = req.body;

  try {
    // Validate input
    const validationError = validateSignupInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Check if user already exists (by email or username)
    const existingUser = await LoginUser.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new LoginUser({
      fname,
      lname,
      email,
      dob,
      phone,
      username,
      password: hashedPassword,
    });

    // Save to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Find user by username
    const user = await LoginUser.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful.",
      token,
      userId: user._id, // Return userId for frontend use
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Updated GET USER DATA BY ID ROUTE
router.get("/user/:id", async (req, res) => {
  try {
    const user = await LoginUser.findById(req.params.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      name: `${user.fname} ${user.lname}`, // Full name
      username: user.username,            // Username
      email: user.email,                  // Email ID
      role: "Customer",                   // Static role for now
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


module.exports = router;
