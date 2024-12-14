const mongoose = require("mongoose");

// Define the user schema
const LoginUserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a Mongoose model
const LoginUser = mongoose.model("LoginUser", LoginUserSchema);

module.exports = LoginUser;
