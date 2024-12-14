const express = require("express");
const bcrypt = require("bcrypt");
const LoginUser = require("../models/LoginUser");
const { validateSignupFields, validateLoginFields } = require("../Loginmiddleware/LoginauthMiddleware");

const router = express.Router();

// Signup Route
router.post("/signup", validateSignupFields, async (req, res) => {
  const { fname, lname, email, dob, phone, username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await LoginUser.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new LoginUser({
      fname,
      lname,
      email,
      dob,
      phone,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login Route
router.post("/login", validateLoginFields, async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await LoginUser.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
